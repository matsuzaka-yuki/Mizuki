import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";

const fixtureSource = await readFile(
	new URL("../src/content/posts/content-pipeline-fixture.mdx", import.meta.url),
	"utf8",
);
const rssSource = await readFile(
	new URL("../src/pages/rss.xml.ts", import.meta.url),
	"utf8",
);
const atomSource = await readFile(
	new URL("../src/pages/atom.xml.ts", import.meta.url),
	"utf8",
);
const feedDataSource = await readFile(
	new URL("../src/utils/feed-data.ts", import.meta.url),
	"utf8",
);

describe("shared content pipeline fixture", () => {
	it("covers MDX, callouts, Wiki Links, code groups, math, and images", () => {
		assert.match(fixtureSource, /^import ContentPipelineFixture/m);
		assert.match(
			fixtureSource,
			/<ContentPipelineFixture label=\{componentMessage\}/,
		);
		assert.match(fixtureSource, /:::note/);
		assert.match(fixtureSource, /\[\[guide\]\]/);
		assert.match(fixtureSource, /::: code-group/);
		assert.match(fixtureSource, /\\ce\{/);
		assert.match(fixtureSource, /topics\.join\(/);
		assert.match(fixtureSource, /!\[A square demonstration image/);
	});

	it("routes RSS and Atom through one shared content renderer", () => {
		for (const source of [rssSource, atomSource]) {
			assert.match(source, /getFeedContentItems/);
			assert.doesNotMatch(source, /MarkdownIt|markdownParser\.render/);
		}
		assert.match(feedDataSource, /renderPostContent/);
	});
});
