# 个人博客 — 项目架构说明

> 供 AI 编程工具（Claude Code、Codex 等）读取，了解项目结构和约定。

---

## 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 框架 | Astro v5 | 静态站点生成，`output: 'static'` |
| 样式 | Tailwind CSS v4 | 以 Vite 插件方式集成（非传统 config.js 方式） |
| 内容 | Markdown + Content Collections | Astro 原生内容管理 |
| 双链 | remark-wiki-link | 支持 `[[文章名]]` Obsidian 风格双链 |
| 部署 | Cloudflare Pages | 项目名 `personal-blog-cn`，域名 `personal-blog-cn.pages.dev` |

---

## 目录结构

```
chen-blog/
├── src/
│   ├── content/
│   │   ├── config.ts              # Content Collections 类型定义（必须）
│   │   └── posts/                 # 所有文章 Markdown 文件（从 Obsidian 复制进来）
│   │       └── *.md
│   ├── layouts/
│   │   └── BaseLayout.astro       # 唯一全局布局（导航 + footer + 灯箱）
│   ├── pages/
│   │   ├── index.astro            # 首页：按日期倒序展示文章列表
│   │   └── posts/
│   │       └── [slug].astro       # 文章详情页（动态路由）
│   └── styles/
│       └── global.css             # 全局样式 + .prose 排版 + 灯箱 + 双链样式
├── public/
│   └── images/                    # 文章图片（路径对应 /images/xxx.jpg）
├── astro.config.mjs               # Astro 配置（含双链插件）
├── deploy.sh                      # 一键发布脚本
├── package.json
└── tsconfig.json
```

---

## Obsidian 工作流（日常写作方式）

### 写文章
在 Obsidian 里新建笔记，**必须加 frontmatter**：

```markdown
---
title: "文章标题"
date: 2026-03-01
description: "一两句话的摘要，显示在首页卡片和 SEO description 里"
cover: "/images/my-photo.jpg"   # 可选，封面图放 public/images/
tags: ["心理学", "思考"]          # 可选
---

正文内容...
```

### 双链写法
在 Obsidian 里用 `[[]]` 双链，发布后会自动渲染为链接：

```markdown
这篇文章和 [[investment-psychology]] 的主题相关。

也支持别名：[[investment-psychology|市场心理]] 这篇文章。
```

**双链规则**：`[[文件名]]` → `/posts/文件名`（自动转小写、空格转连字符）
- `[[my-post]]` → `/posts/my-post`
- `[[My Post]]` → `/posts/my-post`
- 链接不存在的文章时显示红色虚线（class: `wiki-link-new`）

### 发布方式（两种，可同时使用）

#### 方式一：网页编辑（所见即所得）
直接在浏览器打开 https://personal-blog-cn.pages.dev/keystatic
用 GitHub 账号登录，在线写文章并保存。
保存后自动 commit 到 GitHub，约 1 分钟后上线。

#### 方式二：Obsidian 本地写好再发布
1. 在 Obsidian 写好文章
2. 把 `.md` 文件复制到 `src/content/posts/`
3. 图片复制到 `public/images/`
4. 终端运行：

```bash
cd /Users/yuxiangchen/Documents/个人站/chen-blog
git add .
git commit -m "add: 文章标题"
git push
```

push 后 GitHub Actions 自动构建 + 部署，约 1 分钟后上线。

### 本地预览（可选，看效果再发布）
```bash
npm run dev
# 打开 http://localhost:4321
```

---

## 关键文件说明

### `astro.config.mjs`
- `site` 字段：`https://personal-blog-cn.pages.dev`（绑定自定义域名后改这里）
- `markdown.remarkPlugins`：双链插件配置，`hrefTemplate` 控制链接格式
- Tailwind v4 通过 Vite 插件引入，**不要**改成传统 `@astrojs/tailwind` 写法

### `src/content/config.ts`
定义 `posts` 集合的 Zod schema，字段如下：

```ts
{
  title: string;          // 必填
  date: Date;             // 必填，支持字符串自动转换
  description: string;   // 必填，用于首页摘要和 SEO meta
  cover?: string;        // 可选，封面图路径，如 "/images/foo.jpg"
  tags?: string[];       // 可选，标签数组
}
```

新增 frontmatter 字段时，同时修改此文件。

### `src/layouts/BaseLayout.astro`
接受三个 Props：`title`、`description?`、`image?`

包含：导航栏、`<slot />`主内容区、footer、图片灯箱 JS。
- **改博客名称**：修改 `<a href="/">` 的文字
- **改导航链接**：修改 `<nav>` 里的链接列表
- **改 footer**：修改底部 `<footer>` 文案

### `src/styles/global.css`
- `@import "tailwindcss"` — Tailwind v4 引入方式
- `.prose` — 正文排版（行高、段距、图片、引用块、代码块）
- `.wiki-link` — 双链样式（已存在文章，灰色下划线）
- `.wiki-link-new` — 双链样式（不存在文章，红色虚线）
- `:root` — CSS 变量，改配色从这里入手

---

## 常用命令

```bash
npm run dev      # 本地预览，http://localhost:4321
./deploy.sh      # 一键构建 + 发布到 Cloudflare Pages
npm run build    # 仅构建，输出到 dist/
```

---

## 部署信息

- **Cloudflare Pages 项目名**：`personal-blog-cn`
- **线上地址**：https://personal-blog-cn.pages.dev
- **构建命令**：`npm run build`
- **输出目录**：`dist`
- **发布脚本**：`deploy.sh`

---

## 待办功能（按需添加，不要提前建设）

- [ ] `/about` 关于页面
- [ ] 标签筛选页
- [ ] RSS 订阅（`/rss.xml`）
- [ ] 暗色模式
- [ ] 评论系统（Giscus）
- [ ] 文章目录 TOC
- [ ] 网站统计（Cloudflare Web Analytics）
- [ ] 图片迁移至 Cloudflare R2
- [ ] Obsidian 文件夹软链接（自动同步，无需手动复制）

---

## 设计原则（修改时遵守）

1. **极简** — 不加没有实际作用的元素
2. **内容优先** — 排版服务于阅读，最大宽度 720px
3. **中文优化** — 系统字体栈，不加载外部字体
4. **速度** — 静态站点，图片懒加载，不引入不必要的 JS
