import type { FeedContentItem } from "./feed-data";

export function escapeXml(value: unknown): string {
	return String(value ?? "")
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&apos;");
}

export function cdata(value: string): string {
	return `<![CDATA[${value.replaceAll("]]>", "]]]]><![CDATA[>")}]]>`;
}

export interface BuildAtomFeedOptions {
	title: string;
	subtitle: string;
	language: string;
	author: string;
	site: URL;
	items: FeedContentItem[];
}

export function buildAtomFeed({
	title,
	subtitle,
	language,
	author,
	site,
	items,
}: BuildAtomFeedOptions): string {
	const selfUrl = new URL("atom.xml", site).href;
	const updated = items.reduce(
		(latest, item) => (item.updated > latest ? item.updated : latest),
		new Date(0),
	);
	const entries = items
		.map(
			(item) => `  <entry>
    <title>${escapeXml(item.title)}</title>
    <link href="${escapeXml(item.link)}" rel="alternate" type="text/html"/>
    <id>${escapeXml(item.link)}</id>
    <published>${item.pubDate.toISOString()}</published>
    <updated>${item.updated.toISOString()}</updated>
    <summary>${escapeXml(item.description)}</summary>
    <content type="html">${cdata(item.content)}</content>
    <author><name>${escapeXml(author)}</name></author>${
			item.category
				? `
    <category term="${escapeXml(item.category)}"/>`
				: ""
		}
  </entry>`,
		)
		.join("\n");

	return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="${escapeXml(language)}">
  <title>${escapeXml(title)}</title>
  <subtitle>${escapeXml(subtitle)}</subtitle>
  <link href="${escapeXml(site.href)}" rel="alternate" type="text/html"/>
  <link href="${escapeXml(selfUrl)}" rel="self" type="application/atom+xml"/>
  <id>${escapeXml(site.href)}</id>
  <updated>${updated.toISOString()}</updated>
${entries}
</feed>`;
}
