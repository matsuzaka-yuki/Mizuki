import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";

const layoutSource = await readFile(
	new URL("../src/layouts/Layout.astro", import.meta.url),
	"utf8",
);
const bannerStyles = await readFile(
	new URL("../src/styles/banner.css", import.meta.url),
	"utf8",
);
const mainStyles = await readFile(
	new URL("../src/styles/main.css", import.meta.url),
	"utf8",
);
const markdownSource = await readFile(
	new URL("../src/components/misc/Markdown.astro", import.meta.url),
	"utf8",
);
const markdownExtendStyles = await readFile(
	new URL("../src/styles/markdown-extend.styl", import.meta.url),
	"utf8",
);
const encryptorSource = await readFile(
	new URL("../src/components/features/auth/Encryptor.astro", import.meta.url),
	"utf8",
);
const lastModifiedSource = await readFile(
	new URL(
		"../src/components/features/posts/LastModified.astro",
		import.meta.url,
	),
	"utf8",
);
const globalStyleCheckSource = await readFile(
	new URL("../scripts/check-global-style-loading.mjs", import.meta.url),
	"utf8",
);
const packageConfig = JSON.parse(
	await readFile(new URL("../package.json", import.meta.url), "utf8"),
);

describe("Global style loading regressions", () => {
	it("loads shared styles from the root layout and verifies the build output", () => {
		for (const stylesheet of [
			"variables.styl",
			"banner.css",
			"transition.css",
			"widget-responsive.css",
		]) {
			assert.ok(
				layoutSource.includes(`import "../styles/${stylesheet}";`),
				`${stylesheet} must be an explicit root layout dependency`,
			);
		}

		assert.doesNotMatch(
			mainStyles,
			/@import\s+["']\.\/(?:banner|transition)\.css/,
		);
		assert.match(
			packageConfig.scripts.build,
			/node scripts\/check-global-style-loading\.mjs/,
		);
	});

	it("loads Markdown styles from the Markdown wrapper", () => {
		for (const stylesheet of ["markdown.css", "markdown-extend.styl"]) {
			assert.ok(
				markdownSource.includes(`import "@/styles/${stylesheet}";`),
				`${stylesheet} must follow every rendered Markdown surface`,
			);
			assert.ok(
				!encryptorSource.includes(`import "@/styles/${stylesheet}";`),
				`${stylesheet} must not depend on the optional encryption wrapper`,
			);
		}

		assert.ok(
			encryptorSource.includes('import "@/styles/encrypted-content.css";'),
			"encrypted content styles must remain owned by the encryption wrapper",
		);
		assert.ok(
			!encryptorSource.includes('import "@/styles/expressive-code.css";'),
			"global Expressive Code styles must not be duplicated by encryption",
		);
		assert.match(globalStyleCheckSource, /about\/index\.html/);
		assert.match(globalStyleCheckSource, /\.card-github/);
		assert.match(globalStyleCheckSource, /\.custom-md \.image-grid/);
	});
});

describe("Markdown layout regressions", () => {
	it("keeps admonition titles separated from every first content block", () => {
		assert.match(
			markdownExtendStyles,
			/> \.bdm-title\s+[\s\S]*?margin-bottom:\s*\.5rem/,
			"admonition titles must provide their own positive content gap",
		);
		assert.match(
			markdownExtendStyles,
			/> \.bdm-title \+ \*\s+[\s\S]*?margin-top:\s*0/,
			"the first admonition child must not add content-type-specific spacing",
		);
		assert.doesNotMatch(
			markdownExtendStyles,
			/\.bdm-title\s+[\s\S]*?margin-bottom:\s*-/,
			"negative title margins pull marginless content such as tables into the title",
		);
	});
});

describe("Last modified time regressions", () => {
	it("preserves the updated instant across visitor time zones", () => {
		assert.match(
			lastModifiedSource,
			/const lastModified = updatedDate\.toISOString\(\);/,
			"the browser must receive an ISO timestamp with an explicit UTC designator",
		);
		assert.doesNotMatch(
			lastModifiedSource,
			/\.format\(["']YYYY-MM-DDTHH:mm:ss["']\)/,
			"a timezone-less timestamp would be parsed as the visitor's local time",
		);

		const instant = new Date("2026-06-15T03:14:03+08:00");
		const serialized = instant.toISOString();
		const originalTimeZone = process.env.TZ;
		try {
			for (const visitorTimeZone of [
				"UTC",
				"Asia/Shanghai",
				"Europe/Berlin",
				"America/Los_Angeles",
			]) {
				process.env.TZ = visitorTimeZone;
				assert.equal(new Date(serialized).getTime(), instant.getTime());
			}
		} finally {
			if (originalTimeZone === undefined) {
				delete process.env.TZ;
			} else {
				process.env.TZ = originalTimeZone;
			}
		}
	});
});

describe("Fullscreen banner layout regressions", () => {
	it("does not apply the standard banner sticky compensation in fullscreen", () => {
		assert.match(
			bannerStyles,
			/body\.enable-banner\.fullscreen-banner #main-grid\s*\{[^}]*transform:\s*translateY\(0\)/s,
			"fullscreen must continue to remove the banner extension transform",
		);

		for (const stickyId of [
			"sidebar-sticky",
			"left-sidebar-sticky",
			"right-sidebar-sticky",
		]) {
			assert.ok(
				layoutSource.includes(
					`.enable-banner:not(.fullscreen-banner) #${stickyId}`,
				),
				`${stickyId} must exclude fullscreen from the banner offset compensation`,
			);
			assert.ok(
				!layoutSource.includes(`.enable-banner #${stickyId}`),
				`${stickyId} must not use the unscoped banner offset compensation`,
			);
		}
	});
});
