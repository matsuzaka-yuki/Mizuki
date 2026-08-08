import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

import katex from "katex";
import "katex/dist/contrib/mhchem.mjs";

import {
	encodePlantUML,
	injectPlantUMLTheme,
	plantUMLUrl,
} from "../src/plugins/plantuml-encoder.mjs";
import {
	parseMarkdownImageAlt,
	rehypeMarkdownImages,
} from "../src/plugins/rehype-markdown-images.mjs";
import { remarkAutoImageGrid } from "../src/plugins/remark-auto-image-grid.mjs";
import { remarkFixGithubAdmonitions } from "../src/plugins/remark-fix-github-admonitions.js";
import { remarkPlantuml } from "../src/plugins/remark-plantuml.mjs";
import { remarkWikiLink } from "../src/plugins/remark-wiki-link.mjs";
import {
	readCodeCollapseConfig,
	shouldAutoCollapse,
} from "../src/scripts/code-collapse.js";
import { matchesNoReferrerDomain } from "../src/utils/image-referrer.ts";

describe("KaTeX mhchem integration", () => {
	it("uses one KaTeX version and renders chemical equations", () => {
		const require = createRequire(import.meta.url);
		const rehypeRequire = createRequire(require.resolve("rehype-katex"));
		assert.equal(rehypeRequire.resolve("katex"), require.resolve("katex"));

		const source = `${String.fromCharCode(92)}ce{H2O + CO2 -> H2CO3}`;
		const html = katex.renderToString(source, { throwOnError: true });
		assert.doesNotMatch(html, /#cc0000/);
		assert.match(html, /x-arrow|mathvariant="normal"/);
	});
});

describe("Automatic code block collapse", () => {
	it("reads validated settings and only collapses blocks at the threshold", () => {
		const config = readCodeCollapseConfig({
			dataset: {
				codeCollapseEnabled: "true",
				codeCollapseLineThreshold: "20",
				codeCollapsePreviewLines: "10",
				codeCollapseDefaultCollapsed: "true",
			},
		});
		assert.equal(shouldAutoCollapse(19, config), false);
		assert.equal(shouldAutoCollapse(20, config), true);
		assert.equal(config.previewLines, 10);
		assert.equal(config.defaultCollapsed, true);
	});
});

describe("PlantUML markdown pipeline", () => {
	it("encodes source and injects a theme after @startuml", () => {
		const source = "@startuml\nAlice -> Bob\n@enduml";
		const themed = injectPlantUMLTheme(source, "cyborg");
		assert.match(themed, /^@startuml\n!theme cyborg\n/);
		const encoded = encodePlantUML(themed);
		assert.match(encoded, /^[0-9A-Za-z_-]+$/);
		assert.equal(
			plantUMLUrl("https://plantuml.example/", encoded),
			`https://plantuml.example/svg/${encoded}`,
		);
	});

	it("converts plantuml fences to diagram source nodes", () => {
		const tree = {
			type: "root",
			children: [
				{ type: "code", lang: "plantuml", value: "@startuml\nA -> B\n@enduml" },
			],
		};
		remarkPlantuml({
			server: "https://plantuml.example",
			darkTheme: "cyborg",
		})(tree);
		assert.equal(tree.children[0].type, "plantuml");
		assert.match(
			tree.children[0].data.hProperties.dataPlantumlLight,
			/^https:\/\/plantuml\.example\/svg\//,
		);
	});
});

describe("Markdown AST enhancements", () => {
	it("enhances Markdown images without discarding existing attributes", () => {
		const image = {
			type: "element",
			tagName: "img",
			properties: {
				src: "https://img.example.com/photo.webp",
				srcSet: "/small.webp 480w, /large.webp 960w",
				alt: "A useful description w-75%",
				title: "Visible caption",
				width: 960,
				height: 540,
				className: ["existing-image"],
				style: "border-radius: 1rem",
				dataCredit: "Author",
			},
			children: [],
		};
		const tree = {
			type: "root",
			children: [
				{ type: "element", tagName: "p", properties: {}, children: [image] },
			],
		};

		rehypeMarkdownImages({ noReferrerDomains: ["*.example.com"] })(tree);

		const figure = tree.children[0];
		assert.equal(figure.tagName, "figure");
		assert.deepEqual(figure.properties.className, ["markdown-image-figure"]);
		assert.equal(figure.children[0], image);
		assert.equal(image.properties.alt, "A useful description");
		assert.equal(image.properties.loading, "lazy");
		assert.equal(image.properties.decoding, "async");
		assert.equal(image.properties.referrerPolicy, "no-referrer");
		assert.equal(image.properties.width, 960);
		assert.equal(image.properties.height, 540);
		assert.match(image.properties.style, /border-radius: 1rem/);
		assert.match(image.properties.style, /width: 75%/);
		assert.equal(figure.children[1].children[0].value, "Visible caption");
	});

	it("uses alt text independently and leaves invalid width tokens untouched", () => {
		assert.deepEqual(parseMarkdownImageAlt("Diagram"), {
			alt: "Diagram",
			width: undefined,
		});
		assert.deepEqual(parseMarkdownImageAlt("Diagram w-101%"), {
			alt: "Diagram w-101%",
			width: undefined,
		});
		assert.deepEqual(parseMarkdownImageAlt("Diagram w-0%"), {
			alt: "Diagram w-0%",
			width: undefined,
		});
	});

	it("applies no-referrer rules to raw HTML but skips structural wrapping", () => {
		const tree = {
			type: "root",
			children: [
				{
					type: "raw",
					value:
						'<div class="image-grid"><img src="https://i.example.com/a.png" alt="Grid w-50%" data-credit="A"></div>',
				},
				{
					type: "raw",
					value:
						'<img src="https://cdn.example.net/b.png" alt="Raw" title="Raw caption">',
				},
			],
		};

		rehypeMarkdownImages({ noReferrerDomains: ["*.example.com"] })(tree);

		const gridImage = tree.children[0].children[0];
		assert.equal(gridImage.tagName, "img");
		assert.equal(gridImage.properties.alt, "Grid w-50%");
		assert.equal(gridImage.properties.referrerPolicy, "no-referrer");
		assert.equal(tree.children[1].tagName, "figure");
		assert.equal(tree.children[1].children[0].properties.alt, "Raw");
	});

	it("honors data-no-enhance and existing figure boundaries", () => {
		const makeImage = (alt) => ({
			type: "element",
			tagName: "img",
			properties: { src: "/image.webp", alt, title: "No duplicate caption" },
			children: [],
		});
		const protectedImage = makeImage("Protected w-40%");
		const figureImage = makeImage("Figure w-50%");
		const tree = {
			type: "root",
			children: [
				{
					type: "element",
					tagName: "div",
					properties: { dataNoEnhance: true },
					children: [protectedImage],
				},
				{
					type: "element",
					tagName: "figure",
					properties: {},
					children: [figureImage],
				},
			],
		};

		rehypeMarkdownImages()(tree);

		assert.equal(tree.children[0].children[0], protectedImage);
		assert.equal(protectedImage.properties.alt, "Protected w-40%");
		assert.equal(tree.children[1].children[0], figureImage);
		assert.equal(figureImage.properties.alt, "Figure w-50%");
		assert.equal(tree.children[1].children.length, 1);
	});

	it("matches only valid HTTP image host patterns", () => {
		assert.equal(
			matchesNoReferrerDomain("https://i.hdslb.com/a.webp", ["*.hdslb.com"]),
			true,
		);
		assert.equal(
			matchesNoReferrerDomain("https://hdslb.com/a.webp", ["*.hdslb.com"]),
			false,
		);
		assert.equal(matchesNoReferrerDomain("/local.webp", ["*"]), false);
	});

	it("groups consecutive standalone images", () => {
		const image = (url) => ({
			type: "paragraph",
			children: [{ type: "image", url, alt: "" }],
		});
		const tree = {
			type: "root",
			children: [
				image("/a.png"),
				image("/b.png"),
				{ type: "paragraph", children: [] },
			],
		};
		remarkAutoImageGrid({ minImages: 2, maxColumns: 4 })(tree);
		assert.equal(tree.children[0].type, "containerDirective");
		assert.equal(tree.children[0].name, "grid");
		assert.equal(tree.children[0].attributes.columns, "2");
		assert.equal(tree.children[0].children.length, 2);
	});

	it("groups adjacent image lines parsed into one paragraph", () => {
		const tree = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{ type: "image", url: "/a.png", alt: "" },
						{ type: "text", value: "\n" },
						{ type: "image", url: "/b.png", alt: "" },
					],
				},
			],
		};
		remarkAutoImageGrid({ minImages: 2, maxColumns: 4 })(tree);
		assert.equal(tree.children[0].name, "grid");
		assert.equal(tree.children[0].attributes.columns, "2");
	});

	it("supports extended GitHub/Obsidian callout aliases and titles", () => {
		const tree = {
			type: "root",
			children: [
				{
					type: "blockquote",
					children: [
						{
							type: "paragraph",
							children: [
								{ type: "text", value: "[!BUG] Known issue\nDetails" },
							],
						},
					],
				},
			],
		};
		remarkFixGithubAdmonitions()(tree);
		assert.equal(tree.children[0].type, "containerDirective");
		assert.equal(tree.children[0].name, "caution");
		assert.equal(tree.children[0].attributes.title, "Known issue");
	});

	it("turns standalone wiki links into covered cards and inline links", async () => {
		const tree = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [{ type: "text", value: "[[guide]]" }],
				},
				{
					type: "paragraph",
					children: [
						{
							type: "text",
							value: "See [[guide|the guide]].",
						},
					],
				},
			],
		};
		await remarkWikiLink()(tree, {
			path: fileURLToPath(
				new URL(
					"../src/content/posts/content-pipeline-fixture.mdx",
					import.meta.url,
				),
			),
		});
		assert.equal(tree.children[0].data.hName, "a");
		assert.match(tree.children[0].data.hProperties.class, /card-wiki-link/);
		assert.equal(tree.children[0].children[0].data.hName, "span");
		assert.equal(
			tree.children[0].children[0].children[0].url,
			"./guide/cover.webp",
		);
		assert.equal(
			tree.children[0].children[0].data.hProperties.dataNoEnhance,
			true,
		);
		assert.equal(tree.children[1].children[1].type, "link");
		assert.equal(tree.children[1].children[1].children[0].value, "the guide");
	});
});
