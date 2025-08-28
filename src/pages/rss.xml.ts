import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
import { getCollection } from 'astro:content';
import { siteConfig } from '@/config';
import { parse as htmlParser } from 'node-html-parser';
import { getImage } from 'astro:assets';
import type { APIContext } from 'astro';
import type { RSSFeedItem } from '@astrojs/rss';

const markdownParser = new MarkdownIt();

// get dynamic import of images as a map collection
const imagesGlob = import.meta.glob<{ default: ImageMetadata }>(
	'/src/content/**/*.{jpeg,jpg,png,gif,webp}', // include posts and assets
);

export async function GET(context: APIContext) {
	if (!context.site) {
		throw Error('site not set');
	}

	const posts = await getCollection('posts');
	const feed: RSSFeedItem[] = [];

	for (const post of posts) {
		// convert markdown to html string
		const body = markdownParser.render(post.body);
		// convert html string to DOM-like structure
		const html = htmlParser.parse(body);
		// hold all img tags in variable images
		const images = html.querySelectorAll('img');

		for (const img of images) {
			const src = img.getAttribute('src');
			if (!src) continue;

			// Handle content-relative images and convert them to built _astro paths
			if (src.startsWith('./') || src.startsWith('../')) {
				let importPath: string | null = null;

				if (src.startsWith('./')) {
					// Path relative to the post file directory
					const prefixRemoved = src.slice(2);
					importPath = `/src/content/posts/${prefixRemoved}`;
				} else {
					// Path like ../assets/images/xxx -> relative to /src/content/
					const cleaned = src.replace(/^\.\.\//, '');
					importPath = `/src/content/${cleaned}`;
				}

				const imageMod = await imagesGlob[importPath]?.()?.then((res) => res.default);
				if (imageMod) {
					const optimizedImg = await getImage({ src: imageMod });
					img.setAttribute('src', new URL(optimizedImg.src, context.site).href);
				}
			} else if (src.startsWith('/')) {
				// images starting with `/` are in public dir
				img.setAttribute('src', new URL(src, context.site).href);
			}
		}

		feed.push({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.published,
			link: `/posts/${post.slug}/`,
			// sanitize the new html string with corrected image paths
			content: sanitizeHtml(html.toString(), {
				allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
			}),
		});
	}

	return rss({
		title: siteConfig.title,
		description: siteConfig.subtitle || 'No description',
		site: context.site,
		items: feed,
		customData: `<language>${siteConfig.lang}</language>`,
	});
}