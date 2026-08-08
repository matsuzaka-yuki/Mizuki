function domainPatternToRegExp(pattern: string): RegExp | null {
	const escaped = pattern
		.trim()
		.toLowerCase()
		.replace(/[.+?^${}()|[\]\\]/g, "\\$&")
		.replace(/\*/g, ".*");
	return escaped ? new RegExp(`^${escaped}$`, "i") : null;
}

/** Match an HTTP(S) image URL against exact or wildcard host patterns. */
export function matchesNoReferrerDomain(
	url: string,
	patterns: string[] = [],
): boolean {
	if (!/^https?:\/\//i.test(url)) return false;

	try {
		const hostname = new URL(url).hostname;
		return patterns.some((pattern) => {
			const matcher = domainPatternToRegExp(pattern);
			return matcher?.test(hostname) ?? false;
		});
	} catch {
		return false;
	}
}
