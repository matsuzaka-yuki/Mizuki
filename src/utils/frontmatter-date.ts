const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function isDateOnlyString(value: string): boolean {
	return DATE_ONLY_PATTERN.test(value.trim());
}

export function getFrontmatterScalar(
	rawFrontmatter: string,
	field: string,
): string | undefined {
	const escapedField = field.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const match = rawFrontmatter.match(
		new RegExp(`^${escapedField}\\s*:\\s*(.+?)\\s*$`, "m"),
	);
	if (!match) {
		return undefined;
	}

	const rawValue = match[1].trim();
	const quoted = rawValue.match(/^(["'])(.*?)\1(?:\s+#.*)?$/);
	if (quoted) {
		return quoted[2];
	}

	return rawValue.replace(/\s+#.*$/, "").trim();
}

export function isDateOnlyFrontmatterField(
	rawFrontmatter: string,
	field: string,
): boolean {
	const value = getFrontmatterScalar(rawFrontmatter, field);
	return value !== undefined && isDateOnlyString(value);
}
