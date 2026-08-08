import { fromHtml } from "hast-util-from-html";
import { classifyContentLink } from "../utils/content-links.ts";

function relTokens(value) {
	if (Array.isArray(value))
		return value.flatMap((token) => String(token).split(/\s+/));
	return typeof value === "string" ? value.split(/\s+/) : [];
}

function hasProperty(properties, camelCase, htmlName) {
	return camelCase in properties || htmlName in properties;
}

function transformAnchor(node, options) {
	node.properties ??= {};
	const properties = node.properties;
	const href = properties.href;
	if (typeof href !== "string") return;

	const kind = classifyContentLink(href, {
		siteUrl: options.siteUrl,
		base: options.base,
		internalOrigins: options.internalOrigins,
		download: hasProperty(properties, "download", "download"),
	});
	properties.dataContentLinkKind = kind;

	if (
		kind !== "external" ||
		hasProperty(properties, "dataNoExternal", "data-no-external")
	) {
		return;
	}

	if (options.target && properties.target === undefined) {
		properties.target = options.target;
	}
	const mergedRel = new Set([...relTokens(properties.rel), ...options.rel]);
	if (mergedRel.size > 0) properties.rel = [...mergedRel];
}

function transformChildren(parent, options) {
	const nextChildren = [];
	for (const child of parent.children ?? []) {
		if (child.type === "raw" && /<a\b/i.test(child.value ?? "")) {
			const fragment = fromHtml(child.value, { fragment: true });
			transformChildren(fragment, options);
			nextChildren.push(...fragment.children);
			continue;
		}
		if (child.type === "element") {
			if (child.tagName === "a") transformAnchor(child, options);
			transformChildren(child, options);
		}
		nextChildren.push(child);
	}
	parent.children = nextChildren;
}

/** Apply the shared content-link classification to final Markdown/MDX HAST. */
export function rehypeContentLinks(options = {}) {
	if (!options.siteUrl) {
		throw new Error("rehypeContentLinks requires siteUrl");
	}
	const normalizedOptions = {
		siteUrl: options.siteUrl,
		base: options.base ?? options.siteUrl,
		internalOrigins: options.internalOrigins ?? [],
		target: options.target ?? "_blank",
		rel: options.rel ?? ["nofollow", "noopener", "noreferrer"],
	};

	return (tree) => {
		transformChildren(tree, normalizedOptions);
	};
}
