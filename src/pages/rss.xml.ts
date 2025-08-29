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
					// Handle posts in subdirectories like bestimageapi/index.md
					if (post.slug.includes('/')) {
						// For posts like bestimageapi/index.md, the images are in the same folder
						const postDir = post.slug.split('/')[0];
						importPath = `/src/content/posts/${postDir}/${prefixRemoved}`;
					} else {
						// For posts like post.md directly in posts folder
						importPath = `/src/content/posts/${prefixRemoved}`;
					}
				} else {
					// Path like ../assets/images/xxx -> relative to /src/content/
					let cleaned = src;
					// Remove ../ prefixes and build correct path
					while (cleaned.startsWith('../')) {
						cleaned = cleaned.slice(3);
					}
					importPath = `/src/content/${cleaned}`;
				}

				// Try to find the image in the glob
				let imageMod = null;
				if (importPath && imagesGlob[importPath]) {
					try {
						const moduleResult = await imagesGlob[importPath]();
						imageMod = moduleResult.default;
					} catch (error) {
						console.warn(`Failed to load image: ${importPath}`, error);
					}
				}

				// If direct path didn't work, try to find it in available images
				if (!imageMod) {
					// Extract just the filename to search for
					const filename = src.split('/').pop();
					if (filename) {
						// Search through all available image paths
						for (const [path, loader] of Object.entries(imagesGlob)) {
							if (path.includes(filename)) {
								try {
									const moduleResult = await loader();
									imageMod = moduleResult.default;
									break;
								} catch (error) {
									console.warn(`Failed to load image: ${path}`, error);
								}
							}
						}
					}
				}

				if (imageMod) {
					try {
						const optimizedImg = await getImage({ src: imageMod });
						img.setAttribute('src', new URL(optimizedImg.src, context.site).href);
					} catch (error) {
						console.warn('Failed to optimize image:', error);
					}
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
		customData: `<language>${siteConfig.lang}</language>
		<follow_challenge>
			<feedId>184100848287736832</feedId>
			<userId>177556222102647808</userId>
		</follow_challenge>`,
	});
}