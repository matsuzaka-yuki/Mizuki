# 相册系统完整使用教程

## 目录
1. [系统概述](#系统概述)
2. [相册模式](#相册模式)
3. [基础配置](#基础配置)
4. [本地模式详解](#本地模式详解)
5. [外链模式详解](#外链模式详解)
6. [隐藏功能](#隐藏功能)
7. [完整配置示例](#完整配置示例)
8. [最佳实践](#最佳实践)
9. [常见问题](#常见问题)

## 系统概述

相册系统支持两种存储模式和灵活的显示控制：

### 支持的模式
- **本地模式**：图片存储在服务器本地文件系统
- **外链模式**：图片通过外部链接引用

### 核心功能
- 自动扫描和生成相册
- 支持多种布局（网格/瀑布流）
- 相册隐藏/显示控制
- 标签和元数据管理
- 响应式设计

## 相册模式

### 模式对比

| 特性 | 本地模式 | 外链模式 |
|------|----------|----------|
| 图片存储 | 本地文件系统 | 外部链接 |
| 加载速度 | 快速 | 取决于外部服务 |
| 存储成本 | 占用服务器空间 | 无本地存储成本 |
| 稳定性 | 高 | 取决于外部服务 |
| 配置复杂度 | 简单 | 中等 |
| 适用场景 | 个人网站、小型项目 | 大量图片、CDN优化 |

## 基础配置

每个相册都需要一个 `info.json` 配置文件，位于相册文件夹内。

### 基本结构
```
public/images/albums/
├── 相册名称1/
│   ├── info.json          # 必需：相册配置
│   ├── cover.jpg          # 本地模式必需：封面图
│   ├── photo1.jpg         # 本地模式：相册图片
│   └── photo2.png
├── 相册名称2/
│   └── info.json          # 外链模式只需配置文件
└── ...
```

### 通用字段说明

| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `mode` | string | 否 | 模式设置，"external" 为外链模式，不设置为本地模式 |
| `hidden` | boolean | 否 | 是否隐藏相册，true 为隐藏 |
| `title` | string | 否 | 相册标题 |
| `description` | string | 否 | 相册描述 |
| `date` | string | 否 | 创建日期，格式：YYYY-MM-DD |
| `location` | string | 否 | 拍摄地点 |
| `tags` | array | 否 | 标签数组 |
| `layout` | string | 否 | 布局方式："grid" 或 "masonry" |
| `columns` | number | 否 | 列数，默认 3 |

## 本地模式详解

### 文件结构
```
相册文件夹/
├── info.json              # 配置文件
├── cover.jpg              # 封面图（必需）
├── 图片1.jpg
├── 图片2.png
└── 图片3.gif
```

### 配置示例
```json
{
  "title": "我的旅行相册",
  "description": "2024年夏天的美好回忆",
  "date": "2024-08-15",
  "location": "日本京都",
  "tags": ["旅行", "京都", "夏天"],
  "layout": "masonry",
  "columns": 3
}
```

### 支持的图片格式
- `.jpg` / `.jpeg`
- `.png`
- `.gif`
- `.webp`
- `.svg`
- `.avif`
- `.bmp`
- `.tiff` / `.tif`

### 文件命名规则
- 封面图必须命名为 `cover.jpg`
- 其他图片可以任意命名
- 支持中文文件名
- 建议使用有意义的文件名

### 自动功能
- 系统会自动扫描文件夹内的所有图片
- 自动生成图片ID和基本信息
- 自动获取文件修改时间作为拍摄日期

## 外链模式详解

### 配置结构
外链模式需要在 `info.json` 中完整定义所有图片信息。

### 基本配置
```json
{
  "mode": "external",
  "title": "外链相册示例",
  "cover": "https://example.com/cover.jpg",
  "photos": [
    {
      "src": "https://example.com/photo1.jpg",
      "alt": "图片描述"
    }
  ]
}
```

### 完整配置示例
```json
{
  "mode": "external",
  "title": "风景摄影集",
  "description": "来自世界各地的美丽风景",
  "date": "2024-08-20",
  "location": "全球",
  "tags": ["风景", "摄影", "自然"],
  "layout": "masonry",
  "columns": 3,
  "cover": "https://cdn.example.com/albums/landscape/cover.jpg",
  "photos": [
    {
      "id": "mountain-sunset",
      "src": "https://cdn.example.com/photos/mountain-sunset.jpg",
      "thumbnail": "https://cdn.example.com/thumbs/mountain-sunset.jpg",
      "alt": "山顶日落",
      "title": "阿尔卑斯山日落",
      "description": "在阿尔卑斯山顶拍摄的壮丽日落景象",
      "tags": ["山脉", "日落", "阿尔卑斯"],
      "date": "2024-07-15",
      "location": "瑞士阿尔卑斯山",
      "width": 1920,
      "height": 1080,
      "camera": "Canon EOS R5",
      "lens": "RF 24-70mm f/2.8L IS USM",
      "settings": {
        "aperture": "f/8",
        "shutter": "1/125",
        "iso": "200",
        "focal": "35mm"
      }
    },
    {
      "id": "ocean-waves",
      "src": "https://cdn.example.com/photos/ocean-waves.jpg",
      "alt": "海浪",
      "title": "太平洋海浪",
      "tags": ["海洋", "海浪"],
      "width": 1920,
      "height": 1280
    }
  ]
}
```

### 照片字段说明

| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `id` | string | 否 | 唯一标识符，不设置会自动生成 |
| `src` | string | 是 | 图片链接地址 |
| `thumbnail` | string | 否 | 缩略图链接 |
| `alt` | string | 否 | 替代文本 |
| `title` | string | 否 | 图片标题 |
| `description` | string | 否 | 图片描述 |
| `tags` | array | 否 | 图片标签 |
| `date` | string | 否 | 拍摄日期 |
| `location` | string | 否 | 拍摄地点 |
| `width`/`height` | number | 否 | 图片尺寸 |
| `camera` | string | 否 | 相机型号 |
| `lens` | string | 否 | 镜头信息 |
| `settings` | object | 否 | 拍摄参数 |

### 外链服务推荐
- **免费服务**：Imgur、Cloudinary（免费额度）
- **付费CDN**：阿里云OSS、腾讯云COS、AWS S3
- **图床服务**：SM.MS、路过图床
- **GitHub**：可用作图床（注意使用限制）

## 隐藏功能

### 基本用法
在任何模式的 `info.json` 中添加 `"hidden": true` 即可隐藏相册：

```json
{
  "hidden": true,
  "title": "私人相册",
  "description": "这个相册不会在列表中显示"
}
```

### 隐藏行为
- ✅ 相册不会出现在相册列表页面
- ✅ 文件仍然保留在服务器上
- ✅ 知道直接链接仍可访问
- ❌ 不是真正的访问控制

### 使用场景
1. **临时隐藏**：维护期间暂时隐藏
2. **私人内容**：不想公开展示的相册
3. **测试相册**：开发测试用途
4. **未完成相册**：正在整理中的内容
5. **季节性展示**：特定时期才显示

### 显示控制
```json
// 隐藏相册
{ "hidden": true }

// 显示相册（默认）
{ "hidden": false }
// 或者不设置 hidden 字段
{}
```

## 完整配置示例

### 示例1：本地模式相册
```json
{
  "title": "家庭聚会",
  "description": "2024年春节家庭聚会的温馨时光",
  "date": "2024-02-10",
  "location": "北京",
  "tags": ["家庭", "春节", "聚会"],
  "layout": "grid",
  "columns": 4
}
```

### 示例2：外链模式相册
```json
{
  "mode": "external",
  "title": "街头摄影",
  "description": "城市街头的生活瞬间",
  "date": "2024-06-15",
  "location": "上海",
  "tags": ["街头", "摄影", "城市"],
  "layout": "masonry",
  "columns": 3,
  "cover": "https://cdn.example.com/street/cover.jpg",
  "photos": [
    {
      "src": "https://cdn.example.com/street/photo1.jpg",
      "alt": "街头行人",
      "title": "匆忙的脚步",
      "tags": ["行人", "街头"]
    },
    {
      "src": "https://cdn.example.com/street/photo2.jpg",
      "alt": "咖啡店",
      "title": "角落的咖啡店",
      "tags": ["咖啡", "店铺"]
    }
  ]
}
```

### 示例3：隐藏的外链相册
```json
{
  "mode": "external",
  "hidden": true,
  "title": "测试相册",
  "description": "用于测试的相册，暂时隐藏",
  "cover": "https://picsum.photos/800/600",
  "photos": [
    {
      "src": "https://picsum.photos/800/600?random=1",
      "alt": "测试图片"
    }
  ]
}
```

## 最佳实践

### 1. 文件组织
```
albums/
├── 2024-春节聚会/           # 使用日期+描述命名
├── 2024-06-上海街拍/
├── 2024-07-日本旅行/
└── 测试相册/               # 测试内容单独分类
```

### 2. 图片优化
- **本地模式**：压缩图片以节省空间和提高加载速度
- **外链模式**：使用CDN和适当的图片格式
- **建议尺寸**：封面图 800x600，相册图片不超过 2000px

### 3. 标签管理
```json
{
  "tags": ["主要标签", "次要标签", "地点标签"]
}
```
- 使用一致的标签命名
- 避免过多标签（建议3-5个）
- 考虑建立标签分类体系

### 4. 描述撰写
- 简洁明了，突出重点
- 包含时间、地点、事件等关键信息
- 避免过长的描述

### 5. 布局选择
- **Grid布局**：适合尺寸相近的图片
- **Masonry布局**：适合尺寸差异较大的图片
- **列数设置**：手机端建议1-2列，桌面端3-4列

### 6. 性能优化
- 定期清理不需要的相册
- 使用适当的图片格式（WebP优于JPEG）
- 考虑懒加载和缩略图

## 常见问题

### Q1: 相册不显示怎么办？
**检查清单：**
- [ ] `info.json` 文件格式正确
- [ ] 本地模式是否有 `cover.jpg`
- [ ] 外链模式是否设置了 `mode: "external"`
- [ ] 是否设置了 `hidden: true`
- [ ] 文件路径是否正确

### Q2: 外链图片加载失败？
**可能原因：**
- 图片链接失效
- 跨域限制
- 网络连接问题
- 图片服务器限制

**解决方案：**
- 检查图片链接是否可访问
- 使用支持跨域的图片服务
- 考虑使用CDN服务

### Q3: 如何批量管理相册？
**建议方法：**
- 使用脚本批量生成 `info.json`
- 建立相册模板
- 使用版本控制管理配置文件

### Q4: 相册加载速度慢？
**优化建议：**
- 压缩图片文件
- 使用CDN加速
- 启用浏览器缓存
- 考虑懒加载

### Q5: 如何迁移相册？
**本地到外链：**
1. 上传图片到图床/CDN
2. 修改 `info.json` 添加外链信息
3. 测试确认后删除本地文件

**外链到本地：**
1. 下载所有外链图片
2. 移除 `mode: "external"`
3. 确保有 `cover.jpg` 文件

### Q6: 相册安全性如何保障？
**注意事项：**
- `hidden` 只是隐藏显示，不是访问控制
- 敏感内容建议使用服务器端权限控制
- 定期备份相册数据
- 注意外链图片的隐私设置

## 总结

相册系统提供了灵活的配置选项，支持本地和外链两种模式，以及便捷的隐藏功能。通过合理的配置和管理，可以构建出功能丰富、性能优良的相册展示系统。

记住关键要点：
- 选择合适的存储模式
- 合理使用隐藏功能
- 注意性能优化
- 定期维护和备份

如有其他问题，请参考项目文档或提交Issue。