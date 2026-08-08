import type { RSSFeedItem } from "@astrojs/rss";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";

import { siteConfig } from "@/config";
import { getFeedContentItems } from "@/utils/feed-data";
import { escapeXml } from "@/utils/feed-xml";

export async function GET(context: APIContext) {
	if (!context.site) throw new Error("site not set");

	const items: RSSFeedItem[] = (await getFeedContentItems(context.site)).map(
		(item) => ({
			title: item.title,
			description: item.description,
			pubDate: item.pubDate,
			link: item.link,
			content: item.content,
		}),
	);

	return rss({
		title: siteConfig.title,
		description: siteConfig.subtitle || "No description",
		site: context.site,
		items,
		customData: `<language>${escapeXml(siteConfig.lang)}</language>`,
	});
}
