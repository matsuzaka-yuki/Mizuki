import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { XMLParser, XMLValidator } from "fast-xml-parser";
import { parse } from "node-html-parser";

const FIXTURE_TITLE = "MDX Syntax Guide";
const FIXTURE_PAGE = "dist/posts/content-pipeline-fixture/index.html";

function entries(value) {
	return Array.isArray(value) ? value : [value];
}

function findLink(root, href) {
	return root
		.querySelectorAll("a")
		.find((link) => link.getAttribute("href") === href);
}

function assertNoExecutableMarkup(root, label) {
	assert.equal(root.querySelector("script"), null, `${label} contains a script`);
	for (const node of root.querySelectorAll("*")) {
		for (const attribute of Object.keys(node.attributes)) {
			assert.doesNotMatch(
				attribute,
				/^on/i,
				`${label} contains event attribute ${attribute}`,
			);
		}
	}
}

function assertAbsoluteFeedUrls(root, label) {
	for (const node of root.querySelectorAll("[href], [src]")) {
		for (const attribute of ["href", "src"]) {
			const value = node.getAttribute(attribute);
			if (!value || /^(?:#|data:|mailto:|tel:)/i.test(value)) continue;
			assert.ok(URL.canParse(value), `${label} has relative ${attribute}: ${value}`);
		}
	}
	for (const node of root.querySelectorAll("[srcset]")) {
		for (const candidate of node.getAttribute("srcset").split(",")) {
			const value = candidate.trim().split(/\s+/)[0];
			assert.ok(URL.canParse(value), `${label} has relative srcset URL: ${value}`);
		}
	}
}

function assertRenderedFixture(root, label, { feed = false } = {}) {
	const html = root.toString();
	assert.match(html, /data-content-pipeline-fixture/);
	assert.match(html, /This panel is rendered by an imported Astro component/);
	assert.match(html, /This live expression counts 3 topics/);
	assert.ok(root.querySelector(".admonition"), `${label} is missing its callout`);
	assert.ok(root.querySelector(".card-wiki-link"), `${label} is missing its Wiki card`);
	assert.ok(root.querySelector("math"), `${label} is missing MathML`);
	assert.ok(root.querySelector(".rehype-code-group"), `${label} is missing its code group`);
	assert.ok(root.querySelector(".wlc-cover-image"), `${label} is missing its Wiki cover`);
	assert.ok(
		root.querySelector(".markdown-image-caption"),
		`${label} is missing its image caption`,
	);
	const prose = parse(html);
	prose.querySelectorAll("pre,code,script,style").forEach((node) => {
		node.remove();
	});
	assert.doesNotMatch(
		prose.textContent,
		/import ContentPipelineFixture|<ContentPipelineFixture|:::note|\[\[guide/,
	);

	const wikiCard = root.querySelector(".card-wiki-link");
	assert.equal(
		wikiCard.querySelectorAll("a").length,
		0,
		`${label} nests a link in its Wiki card`,
	);

	const internal = findLink(root, "https://mizuki.mysqil.com/about/");
	assert.equal(internal?.getAttribute("data-content-link-kind"), "internal");
	assert.equal(internal?.getAttribute("target"), undefined);
	const external = findLink(root, "https://example.com/reference");
	assert.equal(external?.getAttribute("data-content-link-kind"), "external");
	assert.equal(external?.getAttribute("target"), "_blank");

	if (feed) {
		assertNoExecutableMarkup(root, label);
		assertAbsoluteFeedUrls(root, label);
	} else {
		const wikiCover = root.querySelector(".wlc-cover-image");
		assert.match(wikiCover.getAttribute("src"), /^\/_astro\//);
		assert.match(wikiCover.getAttribute("srcset"), /160w/);
		assert.match(wikiCover.getAttribute("srcset"), /320w/);
		assert.match(wikiCover.getAttribute("srcset"), /480w/);
	}
}

const [pageHtml, rssXml, atomXml] = await Promise.all([
	readFile(FIXTURE_PAGE, "utf8"),
	readFile("dist/rss.xml", "utf8"),
	readFile("dist/atom.xml", "utf8"),
]);

for (const [label, xml] of [
	["RSS", rssXml],
	["Atom", atomXml],
]) {
	assert.equal(XMLValidator.validate(xml), true, `${label} is not strict XML`);
}

const parser = new XMLParser({
	ignoreAttributes: false,
	cdataPropName: "__cdata",
});
const rss = parser.parse(rssXml);
const atom = parser.parse(atomXml);
const rssItem = entries(rss.rss.channel.item).find(
	(item) => item.title === FIXTURE_TITLE,
);
const atomEntry = entries(atom.feed.entry).find(
	(item) => item.title === FIXTURE_TITLE,
);
assert.ok(rssItem, "RSS fixture item is missing");
assert.ok(atomEntry, "Atom fixture entry is missing");

const rssContent = rssItem["content:encoded"];
const atomContent = atomEntry.content.__cdata;
assert.equal(rssContent.trim(), atomContent.trim(), "RSS and Atom content diverged");

assertRenderedFixture(parse(pageHtml), "page");
assertRenderedFixture(parse(rssContent), "RSS", { feed: true });
assertRenderedFixture(parse(atomContent), "Atom", { feed: true });

console.log("Content pipeline build output verified.");
