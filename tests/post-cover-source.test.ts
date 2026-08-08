import assert from "node:assert/strict";
import path from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

import {
	classifyPostCoverSource,
	resolvePostCoverSource,
} from "../src/utils/post-cover-source.ts";

const repositoryRoot = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	"..",
);
const guidePath = path.join(repositoryRoot, "src/content/posts/guide/index.md");

describe("shared post cover resolution", () => {
	it("classifies local, public, and remote sources", () => {
		assert.equal(classifyPostCoverSource("./cover.webp").kind, "local");
		assert.equal(classifyPostCoverSource("/images/cover.webp").kind, "public");
		assert.equal(
			classifyPostCoverSource("https://images.example.com/cover.webp").kind,
			"remote",
		);
	});

	it("resolves an existing post-relative cover", async () => {
		const cover = await resolvePostCoverSource(
			{ image: "./cover.webp" },
			{ contentFilePath: guidePath, basePath: "content/posts/guide" },
		);
		assert.equal(cover.kind, "local");
		assert.equal(cover.basePath, "content/posts/guide");
		assert.equal(
			cover.absolutePath,
			path.join(path.dirname(guidePath), "cover.webp"),
		);
	});

	it("selects API images deterministically", async () => {
		const options = {
			identity: "guide",
			apiImages: [
				"https://images.example.com/a.webp",
				"https://images.example.com/b.webp",
			],
		};
		const first = await resolvePostCoverSource({ image: "api" }, options);
		const second = await resolvePostCoverSource({ image: "api" }, options);
		assert.equal(first.kind, "api");
		assert.equal(first.src, second.src);
	});

	it("never exposes an encrypted post cover", async () => {
		const cover = await resolvePostCoverSource(
			{
				image: "https://private.example.com/secret.webp",
				encrypted: true,
				password: "secret",
			},
			{},
		);
		assert.deepEqual(cover, { kind: "none" });
	});

	it("degrades missing local files and unavailable API configuration", async () => {
		assert.deepEqual(
			await resolvePostCoverSource(
				{ image: "./missing.webp" },
				{ contentFilePath: guidePath },
			),
			{ kind: "none" },
		);
		assert.deepEqual(await resolvePostCoverSource({ image: "api" }), {
			kind: "none",
		});
	});
});
