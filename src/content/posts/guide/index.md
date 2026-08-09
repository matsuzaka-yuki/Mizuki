---
title: "Writing a Blog Post"
published: 2024-04-01
description: "A generic example of article structure and frontmatter."
image: "./cover.webp"
tags: ["Example", "Writing", "Markdown"]
category: Guides
draft: false
---



This blog template is built with [Astro](https://astro.build/). This article is a small, generic example of the file structure and common frontmatter used by a post. The complete current schema and Markdown syntax are maintained in the [Content Authoring Guide](../../../../docs/CONTENT_AUTHORING.md).

## Common frontmatter

```yaml
---
title: "An Example Article"
published: 2026-08-01
updated: 2026-08-08
description: "A short summary for previews."
image: ./cover.webp
tags: [Example, Guide]
category: Guides
draft: false
comment: true
---
```




| Attribute     | Description                                                                                                                                                                                                 |
|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `title`       | The title of the post.                                                                                                                                                                                      |
| `published`   | The date the post was published.                                                                                                                                                                            |
| `pinned`      | Whether this post is pinned to the top of the post list.                                                                                                                                                   |
| `priority`    | The priority of the pinned post. Smaller value means higher priority (0, 1, 2...).                                                                                                                          |
| `description` | A short description of the post. Displayed on index page.                                                                                                                                                   |
| `image`       | The cover image path of the post.<br/>1. Start with `http://` or `https://`: Use web image<br/>2. Start with `/`: For image in `public` dir<br/>3. With none of the prefixes: Relative to the markdown file |
| `tags`        | The tags of the post.                                                                                                                                                                                       |
| `category`    | The category of the post.                                                                                                                                                                                   |
| `licenseName` | The license name for the post content.                                                                                                                                                                      |
| `author`      | The author of the post.                                                                                                                                                                                     |
| `sourceLink`  | The source link or reference for the post content.                                                                                                                                                          |
| `draft`       | If this post is still a draft, which won't be displayed.                                                                                                                                                    |

## Where to Place the Post Files



Place post files in `src/content/posts/`. You can create sub-directories to organize articles and their local assets.

```
src/content/posts/
├── example.md
└── guides/
    ├── cover.webp
    └── index.md
```
Relative images such as `./cover.webp` are resolved from the current article file.
