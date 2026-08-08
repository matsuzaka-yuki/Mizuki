import type { CollectionEntry } from "astro:content";
import { renderPostContent } from "./content-renderer";
import { getSortedPosts } from "./content-utils";
import { initPostIdMap } from "./permalink-utils";
import { getPostPublicDescription } from "./post-card-content";
import { getPostUrl } from "./url-utils";

export interface FeedContentItem {
	title: string;
	description: string;
	pubDate: Date;
	updated: Date;
	link: string;
	content: string;
	category?: string;
}

function isPublicFeedPost(post: CollectionEntry<"posts">): boolean {
	return !post.data.encrypted && post.data.draft !== true;
}

export async function getFeedContentItems(
	site: URL,
): Promise<FeedContentItem[]> {
	const posts = (await getSortedPosts()).filter(isPublicFeedPost);
	initPostIdMap(posts);

	const items: FeedContentItem[] = [];
	for (const post of posts) {
		const rendered = await renderPostContent(post, { target: "feed", site });
		items.push({
			title: post.data.title,
			description: getPostPublicDescription(post.data),
			pubDate: post.data.published,
			updated: post.data.updated ?? post.data.published,
			link: new URL(getPostUrl(post), site).href,
			content: rendered.html,
			category: post.data.category || undefined,
		});
	}
	return items;
}
