# 內容編寫指南

語言版本：[English](CONTENT_AUTHORING.md) · [简体中文](CONTENT_AUTHORING.zh.md) · [日本語](CONTENT_AUTHORING.ja.md)

本文介紹 Mizuki 支援的內容格式，適用於內容保存在主題倉庫，或透過內容分離功能從獨立倉庫同步的情況。

## 內容位置

本地模式下直接編輯以下目錄：

| 內容 | 位置 |
| :--- | :--- |
| 文章 | `src/content/posts/` |
| Markdown 頁面內容 | `src/content/spec/` |
| 結構化頁面資料 | `src/data/` |
| 公開圖片 | `public/images/` |

啟用內容分離後，外部內容倉庫中的 `posts/`、`spec/`、`data/` 和 `images/` 會分別同步到上述執行時目錄。同步模式下不要直接編輯執行時目錄，請在內容倉庫中修改。

文章支援 `.md` 和 `.mdx`，可以是單一檔案，也可以使用包含 `index.md`/ `index.mdx` 和本地素材的資料夾：

~~~text
src/content/posts/
└── guides/
    └── getting-started/
        ├── index.md
        └── cover.webp
~~~

## Frontmatter

只有 `title` 和 `published` 是必填欄位。目前 schema 支援：

| 欄位 | 型別 | 預設值 | 說明 |
| :--- | :--- | :--- | :--- |
| `title` | string | 必填 | 文章標題。 |
| `published` | date | 必填 | 發布日期。 |
| `updated` | date | — | 最後更新日期。 |
| `draft` | boolean | `false` | 為 `true` 時，不會顯示在正式環境列表中。 |
| `description` | string | `""` | 用於 SEO、卡片和預覽的摘要。 |
| `image` | string | `""` | 封面路徑，支援相對路徑、根相對路徑和遠端 URL。 |
| `tags` | string[] | `[]` | 用於組織和篩選的標籤。 |
| `category` | string 或 null | `""` | 文章分類。 |
| `lang` | string | `""` | 文章語言與網站語言不同時使用。 |
| `pinned` | boolean | `false` | 將文章排在一般文章之前。 |
| `priority` | number | — | 置頂文章排序，兩篇文章都設定時數值越小越靠前。 |
| `comment` | boolean | `true` | 全域留言系統啟用時，控制本文是否顯示留言區。 |
| `author` | string | `""` | 可選的作者署名。 |
| `sourceLink` | string | `""` | 可選的來源或參考連結。 |
| `licenseName` | string | `""` | 可選的文章授權名稱。 |
| `licenseUrl` | string | `""` | 可選的授權連結。 |
| `encrypted` | boolean | `false` | 啟用瀏覽器端密碼保護。 |
| `password` | string | `""` | 加密文章使用的密碼。 |
| `passwordHint` | string | `""` | 顯示在密碼輸入框附近的可選提示。 |
| `hideHomeContent` | boolean | — | 隱藏公開首頁/列表摘要；設定密碼時預設隱藏。 |
| `alias` | string | — | `/posts/` 下的替代 URL。 |
| `permalink` | string | — | 網站根路徑下的自訂 URL，優先級高於 `alias`。 |

範例：

~~~yaml
---
title: "我的第一篇文章"
published: 2026-08-09T13:00:00+08:00
updated: 2026-08-10
description: "用於預覽和 SEO 的簡短摘要。"
image: ./cover.webp
tags: [Astro, Blogging]
category: Guides
draft: false
pinned: false
comment: true
lang: zh-TW
author: "你的名字"
---
~~~

僅日期格式（例如 `published: 2026-08-09`）也有效。如果需要表達確切時刻，請使用帶時區的 ISO 時間戳。不要新增舊版的 `date` 或 `pubDate` 欄位，目前 schema 使用 `published`。

### 草稿與置頂

寫作期間可以設定 `draft: true`。草稿在開發環境可見，但會從正式環境列表和 Feed 中排除。

設定 `pinned: true` 可將文章排在一般文章之前；如果設定 `priority`，會優先按它排序，否則按發布日期排序。

### 別名與固定連結

`alias` 位於 `/posts/` 下：

~~~yaml
alias: "my-special-article"
~~~

`permalink` 位於網站根路徑下，且優先級高於 `alias`：

~~~yaml
permalink: "notes/my-special-article"
~~~

兩者都不要包含開頭或結尾的斜線，並確保在整個網站中唯一。

### 文章加密

~~~yaml
encrypted: true
password: "use-a-strong-password"
passwordHint: "給讀者的可選提示"
hideHomeContent: true
~~~

Mizuki 對渲染後的文章執行瀏覽器端解密。這不是伺服器端存取控制：加密內容仍會隨靜態網站分發，有能力的訪客可以下載或分析它。不要用來存放憑據、私鑰或高度敏感資訊。加密文章不會進入 RSS 和 Atom Feed。

## Markdown 與 MDX

支援標準 Markdown、HTML 和 `.mdx`。如果元件屬於目前專案，MDX 可以匯入 Astro/Svelte 元件並使用用戶端指令。

### 提示區塊

指令式提示區塊：

~~~markdown
:::note[可選標題]
這是一個資訊提示。
:::

:::warning{title="請注意"}
這是一個警告。
:::
~~~

主要類型為 `note`、`tip`、`important`、`warning` 和 `caution`；`info`、`success`、`danger`、`example` 等常見別名也會映射到可用樣式。

同時支援 GitHub 風格提示區塊：

~~~markdown
> [!NOTE]
> 這是一個資訊提示。

> [!WARNING]
> 這是一個警告。
~~~

### 程式碼與數學公式

圍欄程式碼區塊由 Expressive Code 渲染，提供語法高亮、行號、語言標籤、複製按鈕、程式碼群組，以及長區塊自動摺疊等功能。

行內公式使用 `$...$`，獨立公式使用 `$$...$$`，建置時由 KaTeX 渲染。

### Mermaid 與 PlantUML

Mermaid 使用 `mermaid` 程式碼圍欄：

~~~~markdown
~~~mermaid
graph LR
    A[編寫] --> B[建置]
    B --> C[部署]
~~~
~~~~

PlantUML 使用 `plantuml` 程式碼圍欄：

~~~~markdown
~~~plantuml
@startuml
Alice -> Bob: Hello
@enduml
~~~
~~~~

PlantUML 原始碼會編碼到圖片 URL，預設傳送到 `src/config/markdownConfig.ts` 配置的公共伺服器。圖表中不要放入密碼、Token、個人資料或其他機密內容；不適合公開渲染時，請使用自建伺服器或停用此功能。

### GitHub 卡片、Wiki Link 與 Spoiler

GitHub 儲存庫卡片：

~~~markdown
::github{repo="owner/repository"}
~~~

連結到另一篇文章：

~~~markdown
[[guides/getting-started]]
[[guides/getting-started#installation|閱讀安裝章節]]
~~~

單獨佔一行的 Wiki Link 會渲染為文章卡片，行內 Wiki Link 會渲染為一般站內連結。

Spoiler 只是視覺遮罩：

~~~markdown
答案是 :spoiler[隱藏文字]。
~~~

不要把 Spoiler 當作安全功能；需要密碼提示時使用文章加密，並理解其靜態網站限制。

### 圖片

相對圖片從目前文章目錄解析，根相對路徑指向 `public/`，HTTP(S) URL 用於遠端圖片：

~~~markdown
![本地圖片](./diagram.webp)
![公開圖片](/images/posts/diagram.webp)
![遠端圖片](https://example.com/image.webp)
~~~

為圖片加入標題即可顯示說明文字；在 alt 文字中加入 `w-N%` 可將圖片寬度設定為 1% 到 100% 並置中：

~~~markdown
![架構圖 w-75%](./architecture.webp "內容管線")
~~~

### 圖片網格

需要控制欄數、寬高比或填充方式時使用 `:::grid`：

~~~markdown
:::grid{columns="3" aspect="16/9" fit="cover"}
![第一張圖片](./one.webp)

![第二張圖片](./two.webp)
:::
~~~

`columns` 支援 1–6，`aspect` 必須是正數比例，`fit` 為 `cover` 或 `contain`。預設配置也會把連續的純圖片段落轉換成最多四欄的自動網格。每個網格擁有獨立的 Fancybox 燈箱分組。

### 影片嵌入

在服務商允許嵌入的前提下，將其 Embed 選項提供的 iframe 貼到 Markdown 或 MDX 檔案中。YouTube 和 Bilibili 都提供嵌入程式碼；除非確有需要，否則不要啟用自動播放。

## 倉庫中的真實範例

以下是 `src/content/posts/` 下的真實文章，可按主題查看具體用法。它們屬於示範內容，部署個人網站前請刪除或替換：

| 主題 | 範例 |
| :--- | :--- |
| 資料夾式文章結構和基礎文章 | [`guide/index.md`](../src/content/posts/guide/index.md) |
| 標準 Markdown 基礎語法 | [`markdown-tutorial.md`](../src/content/posts/markdown-tutorial.md) |
| 提示區塊、GitHub 卡片、Wiki Link 等擴充 | [`markdown-extended.md`](../src/content/posts/markdown-extended.md) |
| Mermaid 流程圖及其他圖表 | [`markdown-mermaid.md`](../src/content/posts/markdown-mermaid.md) |
| 圖片網格、標題、響應式行為和燈箱分組 | [`image-grid-demo.md`](../src/content/posts/image-grid-demo.md) |
| YouTube 與 Bilibili iframe 嵌入 | [`video.md`](../src/content/posts/video.md) |
| 瀏覽器端加密文章 | [`encrypted-post.md`](../src/content/posts/encrypted-post.md) |
| MDX 匯入、JavaScript 匯出和 Astro 元件 | [`content-pipeline-fixture.mdx`](../src/content/posts/content-pipeline-fixture.mdx) |

較早的示範文章可能仍展示已不屬於目前 schema 的欄位。新文章請以本文欄位表和原始碼為準。

## 發布前清單

1. 檢查必填 frontmatter 和日期格式。
2. 檢查圖片路徑、檔名大小寫和遠端 URL。
3. 確認每個提示區塊、網格、程式碼圍欄和圖表區塊都已閉合。
4. 確認 alias 和 permalink 在網站中唯一。
5. 不要把 Secret 放入 PlantUML、MDX、公開圖片或文章內容。
6. 部署個人網站前，刪除或替換倉庫自帶的示範文章、頁面資料和圖片。

更多渲染細節請參閱[內容渲染指南](CONTENT_RENDERING.md)；Markdown/MDX 擴充和實際文章用法也可以直接參考上述範例。
