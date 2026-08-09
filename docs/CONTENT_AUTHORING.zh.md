# 内容编写指南

语言版本：[English](CONTENT_AUTHORING.md) · [日本語](CONTENT_AUTHORING.ja.md) · [繁體中文](CONTENT_AUTHORING.tw.md)

本文介绍 Mizuki 支持的内容格式，适用于内容保存在主题仓库或通过内容分离功能从独立仓库同步的场景。

## 内容位置

本地模式下直接编辑以下目录：

| 内容 | 位置 |
| :--- | :--- |
| 文章 | `src/content/posts/` |
| Markdown 页面内容 | `src/content/spec/` |
| 结构化页面数据 | `src/data/` |
| 公共图片 | `public/images/` |

启用内容分离后，外部内容仓库中的 `posts/`、`spec/`、`data/` 和 `images/` 会分别同步到上述运行时目录。同步模式下不要直接编辑运行时目录；请在内容仓库中修改。

文章支持 `.md` 和 `.mdx`，既可以是单个文件，也可以使用包含 `index.md`/ `index.mdx` 和本地资源的目录：

~~~text
src/content/posts/
└── guides/
    └── getting-started/
        ├── index.md
        └── cover.webp
~~~

## Frontmatter

只有 `title` 和 `published` 是必填字段。当前 schema 支持：

| 字段 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `title` | string | 必填 | 文章标题。 |
| `published` | date | 必填 | 发布日期。 |
| `updated` | date | — | 最后更新时间。 |
| `draft` | boolean | `false` | 为 `true` 时，生产环境列表中不显示。 |
| `description` | string | `""` | 用于 SEO、卡片和预览的摘要。 |
| `image` | string | `""` | 封面路径，支持相对路径、根相对路径和远程 URL。 |
| `tags` | string[] | `[]` | 用于组织和筛选的标签。 |
| `category` | string 或 null | `""` | 文章分类。 |
| `lang` | string | `""` | 文章语言与站点语言不同时使用。 |
| `pinned` | boolean | `false` | 将文章排在普通文章之前。 |
| `priority` | number | — | 置顶文章排序，两个文章都设置时数值越小越靠前。 |
| `comment` | boolean | `true` | 全局评论系统启用时，控制本文是否显示评论区。 |
| `author` | string | `""` | 可选的作者署名。 |
| `sourceLink` | string | `""` | 可选的来源或参考链接。 |
| `licenseName` | string | `""` | 可选的文章许可证名称。 |
| `licenseUrl` | string | `""` | 可选的许可证链接。 |
| `encrypted` | boolean | `false` | 启用浏览器端密码保护。 |
| `password` | string | `""` | 加密文章使用的密码。 |
| `passwordHint` | string | `""` | 显示在密码输入框附近的可选提示。 |
| `hideHomeContent` | boolean | — | 隐藏公开首页/列表摘要；设置密码时默认隐藏。 |
| `alias` | string | — | `/posts/` 下的备用 URL。 |
| `permalink` | string | — | 站点根路径下的自定义 URL，优先级高于 `alias`。 |

示例：

~~~yaml
---
title: "我的第一篇文章"
published: 2026-08-09T13:00:00+08:00
updated: 2026-08-10
description: "用于预览和 SEO 的简短摘要。"
image: ./cover.webp
tags: [Astro, Blogging]
category: Guides
draft: false
pinned: false
comment: true
lang: zh-CN
author: "你的名字"
---
~~~

仅日期格式（如 `published: 2026-08-09`）也有效。如果需要表达确切时刻，请使用带时区的 ISO 时间戳。不要新增旧版的 `date` 或 `pubDate` 字段；当前 schema 使用 `published`。

### 草稿与置顶

写作期间可设置 `draft: true`。草稿在开发环境可见，但会从生产环境列表和 Feed 中排除。

设置 `pinned: true` 可将文章排在普通文章之前；如果设置了 `priority`，会优先按它排序，否则按发布日期排序。

### 别名与固定链接

`alias` 始终位于 `/posts/` 下：

~~~yaml
alias: "my-special-article"
~~~

`permalink` 位于站点根路径下，并且优先级高于 `alias`：

~~~yaml
permalink: "notes/my-special-article"
~~~

两者都不要包含开头或结尾的斜杠，并确保在整个站点中唯一。

### 文章加密

~~~yaml
encrypted: true
password: "use-a-strong-password"
passwordHint: "给读者的可选提示"
hideHomeContent: true
~~~

Mizuki 对渲染后的文章执行浏览器端解密。这不是服务端访问控制：加密内容仍会随静态站点分发，具备能力的访问者可以下载或分析它。不要用来存放凭据、私钥或高度敏感信息。加密文章不会进入 RSS 和 Atom Feed。

## Markdown 与 MDX

支持标准 Markdown、HTML 和 `.mdx`。如果组件属于当前项目，MDX 可以导入 Astro/Svelte 组件并使用客户端指令。

### 提示块

指令式提示块：

~~~markdown
:::note[可选标题]
这是一个信息提示。
:::

:::warning{title="请注意"}
这是一个警告。
:::
~~~

主要类型为 `note`、`tip`、`important`、`warning` 和 `caution`；`info`、`success`、`danger`、`example` 等常见别名也会映射到可用样式。

同时支持 GitHub 风格提示块：

~~~markdown
> [!NOTE]
> 这是一个信息提示。

> [!WARNING]
> 这是一个警告。
~~~

### 代码与数学公式

围栏代码块由 Expressive Code 渲染，提供语法高亮、行号、语言标签、复制按钮、代码组，以及长代码块自动折叠等功能。

行内公式使用 `$...$`，独立公式使用 `$$...$$`，构建时由 KaTeX 渲染。

### Mermaid 与 PlantUML

Mermaid 使用 `mermaid` 代码围栏：

~~~~markdown
~~~mermaid
graph LR
    A[编写] --> B[构建]
    B --> C[部署]
~~~
~~~~

PlantUML 使用 `plantuml` 代码围栏：

~~~~markdown
~~~plantuml
@startuml
Alice -> Bob: Hello
@enduml
~~~
~~~~

PlantUML 源码会编码到图片 URL，默认发送到 `src/config/markdownConfig.ts` 配置的公共服务器。图表中不要放密码、Token、个人信息或其他机密内容；不适合公开渲染时，请使用自建服务器或关闭该功能。

### GitHub 卡片、Wiki Link 与 Spoiler

GitHub 仓库卡片：

~~~markdown
::github{repo="owner/repository"}
~~~

链接到另一篇文章：

~~~markdown
[[guides/getting-started]]
[[guides/getting-started#installation|阅读安装章节]]
~~~

单独占一行的 Wiki Link 会渲染为文章卡片，行内 Wiki Link 会渲染为普通站内链接。

Spoiler 只是视觉遮罩：

~~~markdown
答案是 :spoiler[隐藏文本]。
~~~

不要把 Spoiler 当作安全功能；需要密码提示时使用文章加密，并理解其静态站点限制。

### 图片

相对图片从当前文章目录解析，根相对路径指向 `public/`，HTTP(S) URL 用于远程图片：

~~~markdown
![本地图片](./diagram.webp)
![公共图片](/images/posts/diagram.webp)
![远程图片](https://example.com/image.webp)
~~~

为图片添加标题即可显示说明文字；在 alt 文本中加入 `w-N%` 可将图片宽度设置为 1% 到 100% 并居中：

~~~markdown
![架构图 w-75%](./architecture.webp "内容管线")
~~~

### 图片网格

需要控制列数、宽高比或填充方式时使用 `:::grid`：

~~~markdown
:::grid{columns="3" aspect="16/9" fit="cover"}
![第一张图片](./one.webp)

![第二张图片](./two.webp)
:::
~~~

`columns` 支持 1–6，`aspect` 必须是正数比例，`fit` 为 `cover` 或 `contain`。默认配置还会把连续的纯图片段落转换成最多四列的自动网格。每个网格拥有独立的 Fancybox 灯箱分组。

### 视频嵌入

在服务商允许嵌入的前提下，将其 Embed 选项提供的 iframe 粘贴到 Markdown 或 MDX 文件中。YouTube 和 Bilibili 都提供嵌入代码；除非确有需要，否则不要启用自动播放。

## 仓库中的真实示例

以下是 `src/content/posts/` 下的真实文章，可按主题查看具体用法。它们属于演示内容，部署个人站点前请删除或替换：

| 主题 | 示例 |
| :--- | :--- |
| 目录式文章结构和基础文章 | [`guide/index.md`](../src/content/posts/guide/index.md) |
| 标准 Markdown 基础语法 | [`markdown-tutorial.md`](../src/content/posts/markdown-tutorial.md) |
| 提示块、GitHub 卡片、Wiki Link 等扩展 | [`markdown-extended.md`](../src/content/posts/markdown-extended.md) |
| Mermaid 流程图及其他图表 | [`markdown-mermaid.md`](../src/content/posts/markdown-mermaid.md) |
| 图片网格、标题、响应式行为和灯箱分组 | [`image-grid-demo.md`](../src/content/posts/image-grid-demo.md) |
| YouTube 与 Bilibili iframe 嵌入 | [`video.md`](../src/content/posts/video.md) |
| 浏览器端加密文章 | [`encrypted-post.md`](../src/content/posts/encrypted-post.md) |
| MDX 导入、JavaScript 导出和 Astro 组件 | [`content-pipeline-fixture.mdx`](../src/content/posts/content-pipeline-fixture.mdx) |

较早的演示文章可能仍展示已不属于当前 schema 的字段。新文章请以本文字段表和源代码为准。

## 发布前清单

1. 检查必填 frontmatter 和日期格式。
2. 检查图片路径、文件名大小写和远程 URL。
3. 确认每个提示块、网格、代码围栏和图表块都已闭合。
4. 确认 alias 和 permalink 在站点中唯一。
5. 不要把 Secret 放入 PlantUML、MDX、公共图片或文章内容。
6. 部署个人站点前，删除或替换仓库自带的演示文章、页面数据和图片。

更多渲染细节请参阅[内容渲染指南](CONTENT_RENDERING.md)；Markdown/MDX 扩展和实际文章用法也可以直接参考上述示例。
