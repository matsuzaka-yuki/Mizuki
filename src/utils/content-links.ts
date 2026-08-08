export type ContentLinkKind =
	| "internal"
	| "external"
	| "fragment"
	| "email"
	| "telephone"
	| "download"
	| "other"
	| "unsafe";

export interface ContentLinkContext {
	siteUrl: string | URL;
	base?: string | URL;
	internalOrigins?: Array<string | URL>;
	download?: boolean;
}

const UNSAFE_PROTOCOLS = new Set(["javascript:", "vbscript:", "file:"]);

function origin(value: string | URL): string | undefined {
	try {
		return new URL(value).origin;
	} catch {
		return undefined;
	}
}

/** Classify a rendered content link once for page and static-feed consumers. */
export function classifyContentLink(
	href: string,
	context: ContentLinkContext,
): ContentLinkKind {
	const value = href.trim();
	if (context.download) return "download";
	if (!value) return "other";
	if (value.startsWith("#")) return "fragment";

	const scheme = value.match(/^([a-z][a-z\d+.-]*):/i)?.[1]?.toLowerCase();
	if (scheme === "mailto") return "email";
	if (scheme === "tel") return "telephone";
	if (scheme && UNSAFE_PROTOCOLS.has(`${scheme}:`)) return "unsafe";

	const siteOrigin = origin(context.siteUrl);
	const base = context.base ?? context.siteUrl;
	try {
		const resolved = new URL(value, base);
		if (UNSAFE_PROTOCOLS.has(resolved.protocol)) return "unsafe";
		if (resolved.protocol !== "http:" && resolved.protocol !== "https:") {
			return "other";
		}

		const internalOrigins = new Set(
			[context.siteUrl, ...(context.internalOrigins ?? [])]
				.map(origin)
				.filter((item): item is string => Boolean(item)),
		);
		return siteOrigin && internalOrigins.has(resolved.origin)
			? "internal"
			: "external";
	} catch {
		return scheme ? "other" : "internal";
	}
}
