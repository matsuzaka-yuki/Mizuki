import { fromHtml } from "hast-util-from-html";
import { matchesNoReferrerDomain } from "../utils/image-referrer.ts";

const WIDTH_TOKEN = /(?:^|\s)w-(\d{1,3})%(?=\s|$)/g;
const SKIP_CLASSES = new Set([
	"card-wiki-link",
	"diagram-container",
	"image-grid",
]);

function classNames(node) {
	const value = node?.properties?.className ?? node?.properties?.class;
	if (Array.isArray(value)) return value.map(String);
	return typeof value === "string" ? value.split(/\s+/).filter(Boolean) : [];
}

function hasNoEnhance(node) {
	const properties = node?.properties;
	return (
		properties &&
		("dataNoEnhance" in properties || "data-no-enhance" in properties)
	);
}

function shouldSkipEnhancement(ancestors, image) {
	return [...ancestors, image].some(
		(node) =>
			hasNoEnhance(node) ||
			node?.tagName === "figure" ||
			classNames(node).some((className) => SKIP_CLASSES.has(className)),
	);
}

/**
 * Parse the optional `w-N%` token without consuming invalid values.
 */
export function parseMarkdownImageAlt(value) {
	const alt = typeof value === "string" ? value : String(value ?? "");
	let width;
	const cleaned = alt.replace(WIDTH_TOKEN, (token, rawWidth) => {
		const candidate = Number.parseInt(rawWidth, 10);
		if (width === undefined && candidate >= 1 && candidate <= 100) {
			width = candidate;
			return "";
		}
		return token;
	});

	return {
		alt: cleaned.replace(/\s{2,}/g, " ").trim(),
		width,
	};
}

function appendStyle(current, declaration) {
	const style = typeof current === "string" ? current.trim() : "";
	if (!style) return declaration;
	return `${style.replace(/;?$/, ";")} ${declaration}`;
}

function createFigure(image, title) {
	return {
		type: "element",
		tagName: "figure",
		properties: { className: ["markdown-image-figure"] },
		children: [
			image,
			...(title
				? [
						{
							type: "element",
							tagName: "figcaption",
							properties: { className: ["markdown-image-caption"] },
							children: [{ type: "text", value: title }],
						},
					]
				: []),
		],
	};
}

function isWhitespaceText(node) {
	return node?.type === "text" && !node.value.trim();
}

function onlyImageChild(node) {
	const meaningful = (node.children ?? []).filter(
		(child) => !isWhitespaceText(child),
	);
	return meaningful.length === 1 && meaningful[0]?.tagName === "img"
		? meaningful[0]
		: null;
}

function enhanceImage(image, ancestors, options) {
	image.properties ??= {};
	const properties = image.properties;
	properties.loading ??= "lazy";
	properties.decoding ??= "async";

	if (
		matchesNoReferrerDomain(
			String(properties.src ?? ""),
			options.noReferrerDomains,
		)
	) {
		properties.referrerPolicy = "no-referrer";
	}

	if (shouldSkipEnhancement(ancestors, image)) return image;

	const parsedAlt = parseMarkdownImageAlt(properties.alt);
	properties.alt = parsedAlt.alt;
	if (parsedAlt.width !== undefined) {
		properties.style = appendStyle(
			properties.style,
			`width: ${parsedAlt.width}%; display: block; margin-inline: auto;`,
		);
	}

	const title =
		typeof properties.title === "string" ? properties.title.trim() : "";
	return title || parsedAlt.width !== undefined
		? createFigure(image, title)
		: image;
}

function transformChildren(parent, ancestors, options) {
	const nextChildren = [];

	for (const child of parent.children ?? []) {
		if (child.type === "raw" && /<img\b/i.test(child.value ?? "")) {
			const fragment = fromHtml(child.value, { fragment: true });
			transformChildren(fragment, ancestors, options);
			nextChildren.push(...fragment.children);
			continue;
		}

		if (child.type !== "element") {
			nextChildren.push(child);
			continue;
		}

		if (child.tagName === "p") {
			const image = onlyImageChild(child);
			if (image) {
				const enhanced = enhanceImage(image, [...ancestors, child], options);
				nextChildren.push(enhanced);
				continue;
			}
		}

		if (child.tagName === "img") {
			nextChildren.push(enhanceImage(child, ancestors, options));
			continue;
		}

		transformChildren(child, [...ancestors, child], options);
		nextChildren.push(child);
	}

	parent.children = nextChildren;
}

/**
 * Apply one set of Markdown image rules to Markdown and raw HTML images.
 */
export function rehypeMarkdownImages(options = {}) {
	const normalizedOptions = {
		noReferrerDomains: Array.isArray(options.noReferrerDomains)
			? options.noReferrerDomains
			: [],
	};

	return (tree) => {
		transformChildren(tree, [], normalizedOptions);
	};
}
