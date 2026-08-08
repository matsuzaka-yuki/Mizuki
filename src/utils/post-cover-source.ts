import { existsSync } from "node:fs";
import path from "node:path";

export type PostCoverKind = "none" | "local" | "public" | "remote" | "api";

export interface PostCoverData {
	image?: string | null;
	encrypted?: boolean;
	password?: string;
}

export interface PostCoverSource {
	kind: PostCoverKind;
	src?: string;
	basePath?: string;
	absolutePath?: string;
}

export interface PostCoverOptions {
	contentFilePath?: string;
	basePath?: string;
	identity?: string;
	apiImages?: string[];
	imageApi?: {
		enable?: boolean;
		url?: string;
	};
}

const apiImageCache = new Map<string, Promise<string[]>>();

function stableIndex(value: string, length: number): number {
	let hash = 2166136261;
	for (const character of value) {
		hash ^= character.codePointAt(0) ?? 0;
		hash = Math.imul(hash, 16777619);
	}
	return (hash >>> 0) % length;
}

function usableApiImage(value: string): boolean {
	return /^(?:https?:)?\/\//i.test(value) || value.startsWith("/");
}

async function fetchApiImages(url: string): Promise<string[]> {
	const existing = apiImageCache.get(url);
	if (existing) return existing;

	const pending = fetch(url)
		.then(async (response) => {
			if (!response.ok) throw new Error(`HTTP ${response.status}`);
			return (await response.text())
				.split(/\r?\n/)
				.map((item) => item.trim())
				.filter(usableApiImage);
		})
		.catch((error) => {
			console.warn(`[post-cover] Failed to load image API ${url}:`, error);
			return [];
		});
	apiImageCache.set(url, pending);
	return pending;
}

export function classifyPostCoverSource(
	image: string,
	options: PostCoverOptions = {},
): PostCoverSource {
	const src = image.trim();
	if (!src) return { kind: "none" };
	if (/^(?:https?:)?\/\//i.test(src) || src.startsWith("data:")) {
		return { kind: "remote", src };
	}
	if (src.startsWith("/")) return { kind: "public", src, basePath: "/" };

	const absolutePath = options.contentFilePath
		? path.resolve(path.dirname(options.contentFilePath), src)
		: undefined;
	if (absolutePath && !existsSync(absolutePath)) return { kind: "none" };

	return {
		kind: "local",
		src,
		basePath: options.basePath ?? "/",
		absolutePath,
	};
}

/**
 * Resolve all supported frontmatter cover forms. Encrypted posts intentionally
 * return no cover so cards, pages, and Wiki Link previews share one privacy rule.
 */
export async function resolvePostCoverSource(
	data: PostCoverData,
	options: PostCoverOptions = {},
): Promise<PostCoverSource> {
	if (data.encrypted === true || data.password) return { kind: "none" };

	const image = data.image?.trim() ?? "";
	if (!image) return { kind: "none" };
	if (image !== "api") return classifyPostCoverSource(image, options);

	let apiImages = options.apiImages?.filter(usableApiImage) ?? [];
	if (
		apiImages.length === 0 &&
		options.imageApi?.enable &&
		options.imageApi.url
	) {
		apiImages = await fetchApiImages(options.imageApi.url);
	}
	if (apiImages.length === 0) return { kind: "none" };

	const src =
		apiImages[stableIndex(options.identity ?? image, apiImages.length)];
	return { ...classifyPostCoverSource(src, options), kind: "api", src };
}
