# コンテンツ執筆ガイド

言語： [English](CONTENT_AUTHORING.md) · [简体中文](CONTENT_AUTHORING.zh.md) · [繁體中文](CONTENT_AUTHORING.tw.md)

このガイドでは Mizuki が対応しているコンテンツ形式を説明します。テーマのリポジトリにコンテンツを置く場合と、コンテンツ分離機能で別リポジトリから同期する場合の両方に適用されます。

## コンテンツの場所

ローカルモードでは、次のディレクトリを直接編集します。

| コンテンツ | 場所 |
| :--- | :--- |
| 記事 | `src/content/posts/` |
| Markdown ページ | `src/content/spec/` |
| 構造化されたページデータ | `src/data/` |
| 公開画像 | `public/images/` |

コンテンツ分離を有効にすると、外部コンテンツリポジトリの `posts/`、`spec/`、`data/`、`images/` が上記の実行時ディレクトリへ同期されます。同期モードでは実行時ディレクトリを直接編集せず、コンテンツリポジトリ側を変更してください。

記事は `.md` と `.mdx` に対応しています。単一ファイルだけでなく、`index.md`/ `index.mdx` と画像などのローカル素材を含むフォルダも使えます。

~~~text
src/content/posts/
└── guides/
    └── getting-started/
        ├── index.md
        └── cover.webp
~~~

## Frontmatter

必須フィールドは `title` と `published` だけです。現在の schema は次のフィールドに対応しています。

| フィールド | 型 | デフォルト | 説明 |
| :--- | :--- | :--- | :--- |
| `title` | string | 必須 | 記事タイトル。 |
| `published` | date | 必須 | 公開日時。 |
| `updated` | date | — | 最終更新日時。 |
| `draft` | boolean | `false` | `true` の場合、本番の一覧から除外。 |
| `description` | string | `""` | SEO、カード、プレビューに使う概要。 |
| `image` | string | `""` | カバー画像。相対パス、ルート相対パス、リモート URL に対応。 |
| `tags` | string[] | `[]` | 整理とフィルタリングに使うタグ。 |
| `category` | string または null | `""` | 記事カテゴリ。 |
| `lang` | string | `""` | サイトの言語と異なる記事言語。 |
| `pinned` | boolean | `false` | 通常の記事より前に表示。 |
| `priority` | number | — | ピン留め記事の順序。両方が設定されている場合は小さい値が先。 |
| `comment` | boolean | `true` | グローバルのコメント機能が有効な場合にコメント欄を表示するか。 |
| `author` | string | `""` | 任意の著者表記。 |
| `sourceLink` | string | `""` | 任意の出典・参考リンク。 |
| `licenseName` | string | `""` | 任意の記事ライセンス名。 |
| `licenseUrl` | string | `""` | 任意のライセンス URL。 |
| `encrypted` | boolean | `false` | ブラウザー側のパスワード保護を有効化。 |
| `password` | string | `""` | 暗号化記事のパスワード。 |
| `passwordHint` | string | `""` | パスワード入力画面に表示する任意のヒント。 |
| `hideHomeContent` | boolean | — | ホーム/一覧の公開概要を隠す。パスワード設定時はデフォルトで隠す。 |
| `alias` | string | — | `/posts/` 配下の別 URL。 |
| `permalink` | string | — | サイトルートのカスタム URL。 `alias` より優先。 |

例：

~~~yaml
---
title: "最初のブログ記事"
published: 2026-08-09T13:00:00+08:00
updated: 2026-08-10
description: "プレビューと SEO 用の短い概要。"
image: ./cover.webp
tags: [Astro, Blogging]
category: Guides
draft: false
pinned: false
comment: true
lang: ja
author: "あなたの名前"
---
~~~

`published: 2026-08-09` のような日付だけの値も使えます。正確な時刻が必要な場合は、タイムゾーン付き ISO タイムスタンプを使用してください。古い `date` や `pubDate` は追加せず、現在の schema の `published` を使います。

### 下書きとピン留め

執筆中は `draft: true` を設定できます。下書きは開発中に表示されますが、本番の一覧と Feed から除外されます。

`pinned: true` を設定すると通常の記事より前に表示されます。 `priority` があればそれを使い、なければ公開日で並びます。

### Alias と Permalink

`alias` は `/posts/` 配下になります。

~~~yaml
alias: "my-special-article"
~~~

`permalink` はサイトルート配下になり、`alias` より優先されます。

~~~yaml
permalink: "notes/my-special-article"
~~~

どちらにも先頭・末尾のスラッシュを付けず、サイト全体で一意にしてください。

### 記事の暗号化

~~~yaml
encrypted: true
password: "use-a-strong-password"
passwordHint: "読者向けの任意のヒント"
hideHomeContent: true
~~~

Mizuki はレンダリング済みの記事をブラウザー側で復号します。これはサーバー側のアクセス制御ではありません。暗号化されたペイロードも静的サイトと一緒に配信されるため、閲覧者はダウンロードまたは解析できます。認証情報、秘密鍵、高度に機密性の高い情報には使わないでください。暗号化記事は RSS と Atom Feed から除外されます。

## Markdown と MDX

標準 Markdown、HTML、`.mdx` に対応しています。プロジェクト内のコンポーネントであれば、MDX から Astro/Svelte コンポーネントをインポートし、クライアントディレクティブも利用できます。

### コールアウト

ディレクティブ形式：

~~~markdown
:::note[任意のタイトル]
これは情報を知らせるノートです。
:::

:::warning{title="注意してください"}
これは警告です。
:::
~~~

主な種類は `note`、`tip`、`important`、`warning`、`caution` です。`info`、`success`、`danger`、`example` などの一般的な別名も利用可能なスタイルにマッピングされます。

GitHub 形式のコールアウトにも対応しています。

~~~markdown
> [!NOTE]
> これは情報を知らせるノートです。

> [!WARNING]
> これは警告です。
~~~

### コードと数式

フェンス付きコードブロックは Expressive Code が処理します。構文ハイライト、行番号、言語ラベル、コピー操作、コードグループ、長いブロックの自動折りたたみに対応しています。

インライン数式は `$...$`、表示数式は `$$...$$` を使います。ビルド時に KaTeX でレンダリングされます。

### Mermaid と PlantUML

Mermaid は `mermaid` フェンスを使います。

~~~~markdown
~~~mermaid
graph LR
    A[執筆] --> B[ビルド]
    B --> C[デプロイ]
~~~
~~~~

PlantUML は `plantuml` フェンスを使います。

~~~~markdown
~~~plantuml
@startuml
Alice -> Bob: Hello
@enduml
~~~
~~~~

PlantUML のソースは画像 URL にエンコードされ、デフォルトでは `src/config/markdownConfig.ts` に設定された公開サーバーへ送信されます。図にパスワード、Token、個人情報、その他の秘密情報を含めないでください。公開レンダリングが適切でない場合は、自分で用意したサーバーを使うか、機能を無効にしてください。

### GitHub カード、Wiki Link、Spoiler

GitHub リポジトリカード：

~~~markdown
::github{repo="owner/repository"}
~~~

別の記事へのリンク：

~~~markdown
[[guides/getting-started]]
[[guides/getting-started#installation|インストール節を読む]]
~~~

単独行の Wiki Link は記事カードになり、行内の Wiki Link は通常の内部リンクになります。

Spoiler は見た目を隠すだけです。

~~~markdown
答えは :spoiler[隠されたテキスト] です。
~~~

Spoiler をセキュリティ機能として使わないでください。パスワード入力が必要な場合は記事の暗号化を使い、静的サイトとしての制限を理解してください。

### 画像

相対画像は現在の記事ディレクトリから解決されます。ルート相対パスは `public/` を指し、HTTP(S) URL はリモート画像を指します。

~~~markdown
![ローカル画像](./diagram.webp)
![公開画像](/images/posts/diagram.webp)
![リモート画像](https://example.com/image.webp)
~~~

タイトルを付けるとキャプションになります。alt テキストに `w-N%` を付けると、画像を 1% から 100% の幅で中央寄せできます。

~~~markdown
![アーキテクチャ w-75%](./architecture.webp "コンテンツパイプライン")
~~~

### 画像グリッド

列数、アスペクト比、フィット方法を指定する場合は `:::grid` を使います。

~~~markdown
:::grid{columns="3" aspect="16/9" fit="cover"}
![1 枚目](./one.webp)

![2 枚目](./two.webp)
:::
~~~

`columns` は 1–6、`aspect` は正の比率、`fit` は `cover` または `contain` です。デフォルトでは、連続する画像だけの段落も最大 4 列の自動グリッドになります。各グリッドは独立した Fancybox ライトボックスグループを持ちます。

### 動画の埋め込み

埋め込みが許可されているサービスの iframe を Markdown または MDX に貼り付けます。YouTube と Bilibili には Embed オプションがあります。サイトで明確な理由がない限り、自動再生は避けてください。

## リポジトリ内の実例

以下は `src/content/posts/` にある実際の記事です。機能ごとの具体的な使い方を確認できます。いずれもデモコンテンツなので、自分のサイトを公開する前に削除または置き換えてください。

| テーマ | 例 |
| :--- | :--- |
| フォルダ形式の記事構成と基本記事 | [`guide/index.md`](../src/content/posts/guide/index.md) |
| 標準 Markdown の基本 | [`markdown-tutorial.md`](../src/content/posts/markdown-tutorial.md) |
| コールアウト、GitHub カード、Wiki Link など | [`markdown-extended.md`](../src/content/posts/markdown-extended.md) |
| Mermaid のフローチャートなど | [`markdown-mermaid.md`](../src/content/posts/markdown-mermaid.md) |
| 画像グリッド、キャプション、レスポンシブ表示、ライトボックス | [`image-grid-demo.md`](../src/content/posts/image-grid-demo.md) |
| YouTube と Bilibili の iframe | [`video.md`](../src/content/posts/video.md) |
| ブラウザー側で暗号化する記事 | [`encrypted-post.md`](../src/content/posts/encrypted-post.md) |
| MDX の import、JavaScript export、Astro コンポーネント | [`content-pipeline-fixture.mdx`](../src/content/posts/content-pipeline-fixture.mdx) |

古いデモ記事には、現在の schema に含まれないフィールドが残っている場合があります。新しい記事では、このガイドとソースコードを正としてください。

## 公開前チェックリスト

1. 必須の frontmatter と日付形式を確認する。
2. 画像パス、ファイル名の大文字小文字、リモート URL を確認する。
3. コールアウト、グリッド、コードフェンス、図表ブロックをすべて閉じる。
4. alias と permalink がサイト内で一意であることを確認する。
5. PlantUML、MDX、公開画像、記事本文に Secret を入れない。
6. 個人サイトをデプロイする前に、リポジトリ付属のデモ記事、ページデータ、画像を削除または置き換える。

詳細なレンダリング仕様は [Content Rendering](CONTENT_RENDERING.md) を参照してください。Markdown/MDX の実例は上記の記事からも確認できます。
