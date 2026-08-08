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
	"width",
	"height",
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
			const value = element.getAttribute(attribute);
			if (value) element.setAttribute(attribute, absoluteUrl(value, base));
		}
	}

	for (const element of root.querySelectorAll("[srcset]")) {
		const value = element.getAttribute("srcset");
		if (value) element.setAttribute("srcset", absoluteSrcset(value, base));
	}
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
	root
		.querySelectorAll("script,template,noscript,svg,style")
		.forEach((node) => {
			node.remove();
		});
	expandCodeGroups(root);
	absolutizeUrls(root, postUrl);

	return sanitizeHtml(root.toString(), FEED_SANITIZER_SCHEMA);
}
