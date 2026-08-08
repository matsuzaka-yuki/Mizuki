import { parse } from "node-html-parser";
import sanitizeHtml from "sanitize-html";

const HTML_TAGS = [
	"a",
	"abbr",
	"address",
	"article",
	"aside",
	"b",
	"bdi",
	"bdo",
	"blockquote",
	"br",
	"caption",
	"cite",
	"code",
	"col",
	"colgroup",
	"dd",
	"del",
	"details",
	"div",
	"dl",
	"dt",
	"em",
	"figcaption",
	"figure",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"hr",
	"i",
	"img",
	"kbd",
	"li",
	"main",
	"mark",
	"ol",
	"p",
	"picture",
	"pre",
	"q",
	"rp",
	"rt",
	"ruby",
	"s",
	"samp",
	"section",
	"small",
	"source",
	"span",
	"strong",
	"sub",
	"summary",
	"sup",
	"table",
	"tbody",
	"td",
	"tfoot",
	"th",
	"thead",
	"time",
	"tr",
	"u",
	"ul",
	"var",
	"wbr",
];

const MATHML_TAGS = [
	"math",
	"maction",
	"menclose",
	"merror",
	"mfenced",
	"mfrac",
	"mglyph",
	"mi",
	"mlabeledtr",
	"mlongdiv",
	"mmultiscripts",
	"mn",
	"mo",
	"mover",
	"mpadded",
	"mphantom",
	"mprescripts",
	"mroot",
	"mrow",
	"ms",
	"mscarries",
	"mscarry",
	"msgroup",
	"msline",
	"mspace",
	"msqrt",
	"msrow",
	"mstack",
	"mstyle",
	"msub",
	"msubsup",
	"msup",
	"mtable",
	"mtd",
	"mtext",
	"mtr",
	"munder",
	"munderover",
	"semantics",
	"annotation",
];

export const SAFE_FEED_SVG_TAGS = [
	"svg",
	"g",
	"path",
	"rect",
	"circle",
	"ellipse",
	"line",
	"polyline",
	"polygon",
	"text",
	"tspan",
	"defs",
	"marker",
	"style",
	"foreignObject",
	"foreignobject",
	"clipPath",
	"clippath",
	"linearGradient",
	"lineargradient",
	"radialGradient",
	"radialgradient",
	"stop",
	"title",
	"desc",
	"use",
	"image",
	"mask",
	"pattern",
	"filter",
	"feDropShadow",
	"fedropshadow",
	"symbol",
	"div",
	"span",
	"p",
	"br",
];

export const SAFE_FEED_SVG_ATTRIBUTES = [
	"alignment-baseline",
	"aria-roledescription",
	"class",
	"clip-rule",
	"cx",
	"cy",
	"d",
	"dominant-baseline",
	"dx",
	"dy",
	"fill",
	"fill-rule",
	"flood-color",
	"flood-opacity",
	"font-family",
	"font-size",
	"height",
	"href",
	"id",
	"marker-end",
	"marker-start",
	"markerHeight",
	"markerUnits",
	"markerWidth",
	"name",
	"opacity",
	"orient",
	"points",
	"r",
	"refX",
	"refY",
	"role",
	"rx",
	"ry",
	"stdDeviation",
	"stroke",
	"stroke-dasharray",
	"stroke-linecap",
	"stroke-linejoin",
	"stroke-width",
	"style",
	"text-anchor",
	"transform",
	"transform-origin",
	"viewBox",
	"width",
	"x",
	"x1",
	"x2",
	"xlink:href",
	"xmlns",
	"xmlns:xlink",
	"y",
	"y1",
	"y2",
];

const GLOBAL_ATTRIBUTES = [
	"id",
	"class",
	"title",
	"lang",
	"dir",
	"role",
	"style",
	"aria-*",
	"data-*",
	"hidden",
	"tabindex",
	"colspan",
	"rowspan",
	"scope",
	"datetime",
	"open",
	"xmlns",
	"xmlns:xlink",
	"viewBox",
	"viewbox",
	"preserveAspectRatio",
	"preserveaspectratio",
	"width",
	"height",
	"x",
	"y",
	"x1",
	"x2",
	"y1",
	"y2",
	"cx",
	"cy",
	"r",
	"rx",
	"ry",
	"d",
	"points",
	"transform",
	"fill",
	"fill-opacity",
	"fill-rule",
	"stroke",
	"stroke-width",
	"stroke-opacity",
	"stroke-dasharray",
	"stroke-linecap",
	"stroke-linejoin",
	"opacity",
	"offset",
	"stop-color",
	"stop-opacity",
	"marker-start",
	"marker-mid",
	"marker-end",
	"orient",
	"refX",
	"refY",
	"refx",
	"refy",
	"markerWidth",
	"markerHeight",
	"markerwidth",
	"markerheight",
	"gradientUnits",
	"gradientunits",
	"text-anchor",
	"dominant-baseline",
	"font-family",
	"font-size",
	"font-weight",
	"mathvariant",
	"display",
	"encoding",
];

export const FEED_SANITIZER_SCHEMA: sanitizeHtml.IOptions = {
	allowedTags: [...HTML_TAGS, ...MATHML_TAGS],
	allowedAttributes: {
		"*": GLOBAL_ATTRIBUTES,
		a: ["href", "target", "rel", "name", ...GLOBAL_ATTRIBUTES],
		img: [
			"src",
			"srcset",
			"sizes",
			"alt",
			"loading",
			"decoding",
			"referrerpolicy",
			...GLOBAL_ATTRIBUTES,
		],
		source: ["src", "srcset", "sizes", "type", "media", ...GLOBAL_ATTRIBUTES],
	},
	allowedSchemes: ["http", "https", "mailto", "tel"],
	allowedSchemesByTag: {
		img: ["http", "https", "data"],
		source: ["http", "https", "data"],
	},
	allowProtocolRelative: true,
	parser: {
		lowerCaseAttributeNames: false,
		lowerCaseTags: false,
	},
};

function escapeHtml(value: string): string {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;");
}

function expandCodeGroups(root: ReturnType<typeof parse>) {
	for (const group of root.querySelectorAll(".rehype-code-group")) {
		const labels = group
			.querySelectorAll('[role="tab"]')
			.map((tab) => tab.textContent.trim());
		group.querySelector('[role="tablist"]')?.remove();

		group.querySelectorAll('[role="tabpanel"]').forEach((panel, index) => {
			panel.removeAttribute("hidden");
			panel.removeAttribute("role");
			panel.removeAttribute("aria-labelledby");
			panel.removeAttribute("id");
			const label = labels[index] || `Code example ${index + 1}`;
			panel.insertAdjacentHTML(
				"afterbegin",
				`<p class="feed-code-label"><strong>${escapeHtml(label)}</strong></p>`,
			);
		});
	}
}

function isSpecialUrl(value: string): boolean {
	return /^(?:data:|blob:|mailto:|tel:|#)/i.test(value);
}

function absoluteUrl(value: string, base: URL): string {
	if (!value || isSpecialUrl(value)) {
		return value.startsWith("#") ? new URL(value, base).href : value;
	}
	try {
		return new URL(value, base).href;
	} catch {
		return value;
	}
}

function absoluteSrcset(value: string, base: URL): string {
	if (/^\s*data:/i.test(value)) return value;
	return value
		.split(",")
		.map((candidate) => {
			const [url, ...descriptor] = candidate.trim().split(/\s+/);
			return [absoluteUrl(url, base), ...descriptor].join(" ");
		})
		.join(", ");
}

function absolutizeUrls(root: ReturnType<typeof parse>, base: URL) {
	for (const attribute of ["href", "src", "poster", "cite"]) {
		for (const element of root.querySelectorAll(`[${attribute}]`)) {
			if (element.closest("svg")) continue;
			const value = element.getAttribute(attribute);
			if (value) element.setAttribute(attribute, absoluteUrl(value, base));
		}
	}

	for (const element of root.querySelectorAll("[srcset]")) {
		if (element.closest("svg")) continue;
		const value = element.getAttribute("srcset");
		if (value) element.setAttribute("srcset", absoluteSrcset(value, base));
	}
}

const SAFE_SVG_TAG_SET = new Set(
	SAFE_FEED_SVG_TAGS.map((tag) => tag.toLowerCase()),
);
const SAFE_SVG_ATTRIBUTE_SET = new Set(
	SAFE_FEED_SVG_ATTRIBUTES.map((attribute) => attribute.toLowerCase()),
);
const DANGEROUS_SVG_VALUE =
	/(?:javascript:|vbscript:|data:text\/html|@import|expression\s*\(|url\s*\(\s*["']?(?!#))/i;

function isSafeGeneratedMermaidSvg(svg: ReturnType<typeof parse>): boolean {
	const id = svg.getAttribute("id") ?? "";
	if (
		!/^mermaid-[a-f0-9]{16}-light-0$/.test(id) ||
		svg.getAttribute("data-mermaid-theme") !== "light"
	) {
		return false;
	}

	for (const element of [svg, ...svg.querySelectorAll("*")]) {
		if (!SAFE_SVG_TAG_SET.has(element.tagName.toLowerCase())) return false;
		for (const [name, value] of Object.entries(element.attributes)) {
			const normalized = name.toLowerCase();
			if (
				!SAFE_SVG_ATTRIBUTE_SET.has(normalized) &&
				!normalized.startsWith("data-") &&
				!normalized.startsWith("aria-")
			) {
				return false;
			}
			if (normalized.startsWith("on") || DANGEROUS_SVG_VALUE.test(value)) {
				return false;
			}
		}
		if (element.tagName.toLowerCase() === "style") {
			if (DANGEROUS_SVG_VALUE.test(element.textContent)) return false;
		}
	}
	return true;
}

function extractFeedSafeSvg(root: ReturnType<typeof parse>): string[] {
	const safeSvg: string[] = [];
	for (const svg of root.querySelectorAll("svg")) {
		if (!svg.classList.contains("mermaid-svg")) svg.remove();
	}
	for (const svg of root.querySelectorAll(".mermaid-svg--dark")) svg.remove();
	for (const svg of root.querySelectorAll("svg.mermaid-svg--light")) {
		if (!isSafeGeneratedMermaidSvg(svg)) {
			svg.remove();
			continue;
		}
		const index = safeSvg.push(svg.toString()) - 1;
		const placeholder = parse(
			`<span data-mizuki-safe-svg="${index}"></span>`,
		).firstChild;
		if (placeholder) svg.replaceWith(placeholder);
	}
	root.querySelectorAll("style").forEach((style) => {
		style.remove();
	});
	return safeSvg;
}

export interface PrepareFeedHtmlOptions {
	html: string;
	site: URL;
	postUrl: URL;
}

export function prepareFeedHtml({
	html,
	postUrl,
}: PrepareFeedHtmlOptions): string {
	const root = parse(html);
	root.querySelectorAll("script,template,noscript").forEach((node) => {
		node.remove();
	});
	expandCodeGroups(root);
	const safeSvg = extractFeedSafeSvg(root);
	absolutizeUrls(root, postUrl);

	let sanitized = sanitizeHtml(root.toString(), FEED_SANITIZER_SCHEMA);
	safeSvg.forEach((svg, index) => {
		sanitized = sanitized.replace(
			`<span data-mizuki-safe-svg="${index}"></span>`,
			svg,
		);
	});
	return sanitized;
}
