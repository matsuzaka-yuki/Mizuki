import { loadRenderers } from "astro:container";
import type { CollectionEntry, RenderResult } from "astro:content";
import { render } from "astro:content";
import { getContainerRenderer as getMdxRenderer } from "@astrojs/mdx/container-renderer";
import { getContainerRenderer as getSvelteRenderer } from "@astrojs/svelte/container-renderer";
import { experimental_AstroContainer as AstroContainer } from "astro/container";

import { prepareFeedHtml } from "./feed-content";
import { getPostUrl } from "./url-utils";

export type ContentRenderTarget = "page" | "feed";

interface RenderPostContentOptions {
	target: ContentRenderTarget;
	site: URL | string;
}

export interface PagePostContent extends RenderResult {
	target: "page";
}

export interface FeedPostContent {
	target: "feed";
	html: string;
}

let containerPromise: Promise<AstroContainer> | undefined;

async function getContentContainer(): Promise<AstroContainer> {
	containerPromise ??= (async () => {
		const renderers = await loadRenderers([
			getMdxRenderer(),
			getSvelteRenderer(),
		]);
		return AstroContainer.create({ renderers });
	})();
	return containerPromise;
}

export function renderPostContent(
	post: CollectionEntry<"posts">,
	options: RenderPostContentOptions & { target: "page" },
): Promise<PagePostContent>;
export function renderPostContent(
	post: CollectionEntry<"posts">,
	options: RenderPostContentOptions & { target: "feed" },
): Promise<FeedPostContent>;
export async function renderPostContent(
	post: CollectionEntry<"posts">,
	options: RenderPostContentOptions,
): Promise<PagePostContent | FeedPostContent> {
	const rendered = await render(post);
	if (options.target === "page") {
		return { target: "page", ...rendered };
	}

	const site = new URL(options.site);
	const postUrl = new URL(getPostUrl(post), site);
	const container = await getContentContainer();
	const html = await container.renderToString(rendered.Content, {
		request: new Request(postUrl),
		partial: true,
	});

	return {
		target: "feed",
		html: prepareFeedHtml({ html, site, postUrl }),
	};
}
