import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { rehypeContentLinks } from "../src/plugins/rehype-content-links.mjs";
import { classifyContentLink } from "../src/utils/content-links.ts";

const siteUrl = "https://example.com/blog/";

describe("shared content link classification", () => {
	it("classifies site-relative, same-origin, and external URLs by origin", () => {
		const cases = [
			["/about/", "internal"],
			["./next", "internal"],
			["https://example.com/about/", "internal"],
			["//example.com/about/", "internal"],
			["https://example.com:8443/about/", "external"],
			["http://example.com/about/", "external"],
			["https://docs.example.com/", "external"],
			["#heading", "fragment"],
			["mailto:hello@example.com", "email"],
			["tel:+12025550123", "telephone"],
			["javascript:alert(1)", "unsafe"],
		] as const;

		for (const [href, expected] of cases) {
			assert.equal(classifyContentLink(href, { siteUrl }), expected, href);
		}
	});

	it("annotates all links but enhances only true external links", () => {
		const link = (href: string, properties = {}) => ({
			type: "element",
			tagName: "a",
			properties: { href, ...properties },
			children: [],
		});
		const internal = link("https://example.com/about/");
		const external = link("https://outside.example/article", {
			rel: ["ugc", "noopener"],
		});
		const email = link("mailto:hello@example.com");
		const optedOut = link("https://outside.example/plain", {
			dataNoExternal: true,
		});
		const tree = {
			type: "root",
			children: [internal, external, email, optedOut],
		};

		rehypeContentLinks({
			siteUrl,
			target: "_blank",
			rel: ["nofollow", "noopener", "noreferrer"],
		})(tree);

		assert.equal(internal.properties.dataContentLinkKind, "internal");
		assert.equal(internal.properties.target, undefined);
		assert.equal(external.properties.dataContentLinkKind, "external");
		assert.equal(external.properties.target, "_blank");
		assert.deepEqual(external.properties.rel, [
			"ugc",
			"noopener",
			"nofollow",
			"noreferrer",
		]);
		assert.equal(email.properties.dataContentLinkKind, "email");
		assert.equal(email.properties.target, undefined);
		assert.equal(optedOut.properties.dataContentLinkKind, "external");
		assert.equal(optedOut.properties.target, undefined);
	});

	it("handles raw HTML links through the same entry point", () => {
		const tree = {
			type: "root",
			children: [
				{
					type: "raw",
					value: '<a href="https://example.com/raw">Raw link</a>',
				},
			],
		};
		rehypeContentLinks({ siteUrl })(tree);
		assert.equal(tree.children[0].tagName, "a");
		assert.equal(tree.children[0].properties.dataContentLinkKind, "internal");
		assert.equal(tree.children[0].properties.target, undefined);
	});
});
