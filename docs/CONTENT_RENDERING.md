# Markdown 内容渲染

Mizuki 将文章页作为规范内容管线。Markdown 与 MDX 只解析一次，RSS 和 Atom
复用相同的 remark/rehype 结果，再执行面向 Feed 的静态化、安全清洗和 URL
绝对化。这意味着新增内容语法时，不需要为两个 Feed 分别维护解析器。

## 作者语法

### 图片

Markdown 图片的 `alt` 只用于无障碍替代文本，`title` 会显示为图片说明：

```markdown
![架构图 w-75%](./architecture.webp "统一内容管线")
```

可选的 `w-N%` 必须在 1 到 100 之间。有效标记会从 `alt` 中移除并设置显示
宽度；无效值会原样保留。图片默认使用懒加载和异步解码。匹配
`siteConfig.imageOptimization.noReferrerDomains` 的远程图片会在构建 HTML 中
直接得到 `referrerpolicy="no-referrer"`，避免首次请求已经携带 Referer。

图片网格、Wiki Link 封面、图表、已有 `figure`，以及带
`data-no-enhance` 的容器不会被重复包装。

### Wiki Link 封面

独立一行的 `[[post]]` 会生成文章卡片，并复用目标文章的 `image`：

- `./cover.webp` 相对于目标文章文件解析，并进入 Astro 图片优化；
- `/images/cover.webp` 作为 public 路径；
- `https://...` 作为远程图片；
- `image: api` 使用 `siteConfig.banner.imageApi` 返回的图片列表，并按文章稳定选择。

本地封面生成 160、320、480 像素的响应式缩略图。缺图或 API 失败时显示无图卡片；
加密文章不会在文章列表、文章页或 Wiki Link 卡片中暴露封面。Wiki 卡片保持单一
外层链接，其图片不加入正文 Fancybox。

### 链接

页面和 Feed 使用同一个链接分类结果。相对链接、片段和当前站点的绝对 URL 都按
站内链接处理；真正的外链继续沿用当前 `_blank` 与
`nofollow noopener noreferrer` 兼容策略。更细的 `rel` 策略和邮箱保护属于独立
链接策略功能。

## Feed 静态降级

RSS 与 Atom 保留 Callout 标题、Wiki Link 摘要与封面、MathML 和代码组标签。
代码组会展开，交互脚本和事件属性会移除，文章内相对链接、public 图片、Astro
构建图片和 `srcset` 全部转换为绝对 URL。Feed HTML 使用显式标签/属性白名单，
RSS 与 Atom XML 都经过严格解析验证。

## 验证

`src/content/posts/content-pipeline-fixture.mdx` 是面向用户的完整示例，也是构建回归
夹具。运行以下命令验证内容管线：

```bash
pnpm test
pnpm check
pnpm type-check
pnpm build
```

`pnpm build` 会额外检查夹具页面、RSS 和 Atom 的静态内容、XML、安全属性、绝对
URL、Wiki 封面和链接分类是否一致。
