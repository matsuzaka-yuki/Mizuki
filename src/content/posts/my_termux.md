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