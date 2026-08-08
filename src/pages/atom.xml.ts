import type { APIContext } from "astro";

import { profileConfig, siteConfig } from "@/config";
import { getFeedContentItems } from "@/utils/feed-data";
import { buildAtomFeed } from "@/utils/feed-xml";

export async function GET(context: APIContext) {
	if (!context.site) throw new Error("site not set");

	const atomFeed = buildAtomFeed({
		title: siteConfig.title,
		subtitle: siteConfig.subtitle || "No description",
		language: siteConfig.lang,
		author: profileConfig.name,
		site: context.site,
		items: await getFeedContentItems(context.site),
	});

	return new Response(atomFeed, {
		headers: {
			"Content-Type": "application/atom+xml; charset=utf-8",
		},
	});
}
