import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { XMLValidator } from "fast-xml-parser";

import { prepareFeedHtml } from "../src/utils/feed-content.ts";
import { buildAtomFeed } from "../src/utils/feed-xml.ts";

describe("feed content post-processing", () => {
	it("keeps static semantics while removing executable and interactive markup", () => {
		const html = `
			<script>window.bad = true</script>
			<blockquote class="admonition bdm-note"><div class="bdm-title">NOTE</div><p>Readable callout</p></blockquote>
			<div class="rehype-code-group">
				<div role="tablist"><button role="tab">TypeScript</button><button role="tab">Shell</button></div>
				<div role="tabpanel" id="one"><pre><code>const target = "feed"</code></pre></div>
				<div role="tabpanel" id="two" hidden><pre><code>pnpm build</code></pre></div>
			</div>
			<a class="card-wiki-link" href="../guide/"><div class="wlc-title">Guide</div><div class="wlc-description">Wiki summary</div></a>
			<span class="katex"><math><mrow><mi>E</mi><mo>=</mo><mi>m</mi></mrow></math></span>
			<img src="/images/fixture.webp" alt="Fixture" onerror="alert(1)">
			<a href="/about/" data-content-link-kind="internal" onclick="alert(1)">About</a>
		`;

		const result = prepareFeedHtml({
			html,
			site: new URL("https://example.com/"),
			postUrl: new URL("https://example.com/posts/fixture/"),
		});

		assert.match(result, /Readable callout/);
		assert.match(result, /TypeScript/);
		assert.match(result, /Shell/);
		assert.match(result, /const target = "feed"/);
		assert.match(result, /pnpm build/);
		assert.match(result, /Wiki summary/);
		assert.match(result, /<math>/);
		assert.match(result, /href="https:\/\/example\.com\/posts\/guide\/"/);
		assert.match(result, /src="https:\/\/example\.com\/images\/fixture\.webp"/);
		assert.match(result, /href="https:\/\/example\.com\/about\/"/);
		assert.match(result, /data-content-link-kind="internal"/);
		assert.doesNotMatch(
			result,
			/<script|<button|\shidden(?:=|\s|>)|\son(?:click|error)=/i,
		);
	});
});

describe("Atom XML generation", () => {
	it("escapes metadata and safely splits CDATA terminators", () => {
		const xml = buildAtomFeed({
			title: "Mizuki & Friends",
			subtitle: "<Static> content",
			language: "en",
			author: 'Dawn "黎明"',
			site: new URL("https://example.com/"),
			items: [
				{
					title: "MD & MDX <fixture>",
					description: "Summary & details",
					pubDate: new Date("2026-08-08T00:00:00.000Z"),
					updated: new Date("2026-08-09T00:00:00.000Z"),
					link: "https://example.com/posts/fixture/",
					content: "<p>before ]]> after</p>",
					category: 'Examples & "Tests"',
				},
			],
		});

		assert.equal(XMLValidator.validate(xml), true);
		assert.match(xml, /Mizuki &amp; Friends/);
		assert.match(
			xml,
			/<!\[CDATA\[<p>before \]\]\]\]><!\[CDATA\[> after<\/p>\]\]>/,
		);
		assert.match(xml, /<updated>2026-08-09T00:00:00\.000Z<\/updated>/);
	});
});
