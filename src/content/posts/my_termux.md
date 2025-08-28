---
title: "Termux 完全上手：从零到进阶的 Android 终端之旅"
description: "无需 Root，在 Android 手机里搭建完整的 Linux 开发环境：包管理、SSH、代码运行、定时任务一站式教程。"
published: 2024-06-02
tags: ["termux", "android", "linux", "cli", "教程"]
cover: ./cover-termux.png
---

> 只需一部手机，就能把地铁碎片时间变成高效编程时间。

---

## 1 安装与初始化

| 渠道 | 链接 |
|---|---|
| F-Droid（推荐） | https://f-droid.org/en/packages/com.termux/ |
| GitHub Release | https://github.com/termux/termux-app/releases |

安装后首次打开执行：

```bash
pkg update && pkg upgrade -y
pkg install git curl wget -y
jhgff
# Tips

The first few notes should have given you an overview of the main functionalities of Joplin, but there's more it can do. See below for some of these features and how to get more help using the app:

## Web clipper

![](:/8dcaacabe82749dca6e48883c9e8c32e)

The Web Clipper is a browser extension that allows you to save web pages and screenshots from your browser. To start using it, open the Joplin desktop application, go to the Web Clipper Options and follow the instructions.

More info on the official website: https://joplinapp.org/help/apps/clipper

## Plugins

Joplin supports many plugins that allows you to add new features to the app, such as tabs, a table of content for your notes, a way to manage favourite notes, and many other ones. To add a plugin, go to the "Plugins" section in the config screen. From there you can search and install plugins, as well as search or update plugins.

## Attachments

Any kind of file can be attached to a note. In Markdown, links to these files are represented as an ID. In the note viewer, these files, if they are images, will be displayed or, if they are other files (PDF, text files, etc.) they will be displayed as links. Clicking on this link will open the file in the default application.

Images can be attached either by clicking on "Attach file" or by pasting (with `Ctrl+V` or `Cmd+V`) an image directly in the editor, or by drag and dropping an image.

More info about attachments: https://joplinapp.org/help/apps/attachments

## Search

Joplin supports advanced search queries, which are fully documented on the official website: https://joplinapp.org/help/apps/search

## Alarms

An alarm can be associated with any to-do. It will be triggered at the given time by displaying a notification. To use this feature, see the documentation: https://joplinapp.org/help/apps/notifications

## Markdown advanced tips

Joplin uses and renders [Github-flavoured Markdown](https://joplinapp.org/help/apps/markdown) with a few variations and additions.

For example, tables are supported:

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

You can also create lists of checkboxes. These checkboxes can be ticked directly in the viewer, or by adding an "x" inside:

- [ ] Milk
- [ ] Eggs
- [x] Beer

Math expressions can be added using the [KaTeX notation](https://khan.github.io/KaTeX/):

$$
f(x) = \int_{-\infty}^\infty
    \hat f(\xi)\,e^{2 \pi i \xi x}
    \,d\xi
$$

Various other tricks are possible, such as using HTML, or customising the CSS. See the Markdown documentation for more info - https://joplinapp.org/help/apps/markdown

## Community and further help

- For general discussion about Joplin, user support, software development questions, and to discuss new features, go to the [Joplin Forum](https://discourse.joplinapp.org/). It is possible to login with your GitHub account.
- The latest news are posted [on the Patreon page](https://www.patreon.com/joplin).
- For bug reports and feature requests, go to the [GitHub Issue Tracker](https://github.com/laurent22/joplin/issues).

## Donations

Donations to Joplin support the development of the project. Developing quality applications mostly takes time, but there are also some expenses, such as digital certificates to sign the applications, app store fees, hosting, etc. Most of all, your donation will make it possible to keep up the current development standard.

Please see the [donation page](https://joplinapp.org/donate/) for information on how to support the development of Joplin.