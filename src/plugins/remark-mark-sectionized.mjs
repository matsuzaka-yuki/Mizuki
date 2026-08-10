import { visit } from "unist-util-visit";

const SECTION_CLASS = "markdown-section";

function normalizeClassNames(className) {
	if (Array.isArray(className)) return className;
	if (typeof className === "string")
		return className.split(/\s+/).filter(Boolean);
	return [];
}

/**
 * Marks only the structural sections emitted by remark-sectionize.
 *
 * A dedicated class lets layout styles distinguish document sections from
 * semantic <section> elements authored inside Markdown content.
 */
export function remarkMarkSectionized() {
	return (tree) => {
		visit(tree, "section", (node) => {
			if (node.data?.hName !== "section") return;

			const hProperties = node.data.hProperties ?? {};
			const className = normalizeClassNames(hProperties.className);
			if (!className.includes(SECTION_CLASS)) className.push(SECTION_CLASS);

			node.data.hProperties = {
				...hProperties,
				className,
			};
		});
	};
}
