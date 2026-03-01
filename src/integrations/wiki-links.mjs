/**
 * Astro integration: Obsidian-style [[wikilinks]] + backlinks index
 *
 * 构建时扫描 src/content/docs/**\/*.md，完成两件事：
 * 1. 将页面名 → URL 的映射传给 remark-wiki-link，使 [[链接]] 变成可点击的 <a>
 * 2. 生成反向链接索引 src/data/backlinks.json，供 BacklinksPanel 组件使用
 */

import fs   from 'node:fs';
import path from 'node:path';
import remarkWikiLink from 'remark-wiki-link';

// ── 工具函数 ─────────────────────────────────────────

/** 递归获取目录下所有 .md / .mdx 文件的绝对路径 */
function findMarkdownFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findMarkdownFiles(full));
    } else if (/\.(md|mdx)$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

/** 从 frontmatter 提取 title */
function extractTitle(content) {
  const m = content.match(/^---[\s\S]*?^title:\s*["']?(.+?)["']?\s*$/m);
  return m ? m[1].trim() : null;
}

/** 从正文提取所有 [[wikilinks]]（忽略图片嵌入 ![[...]]，忽略 heading / alias 部分） */
function extractWikiLinks(content) {
  // 匹配 [[target]] 或 [[target|alias]] 或 [[target#heading]]，但跳过 ![[...]]
  const re = /(?<!!)\[\[([^\]|#\n]+?)(?:[|#][^\]]*?)?\]\]/g;
  return [...content.matchAll(re)].map(m => m[1].trim());
}

// ── 核心构建逻辑 ──────────────────────────────────────

function buildIndex(docsDir) {
  const files = findMarkdownFiles(docsDir);

  /** pageMap: 页面名 / 文件名 / title → { url, title } */
  const pageMap  = {};
  /** rawLinks: url → [wikilink 目标名] */
  const rawLinks = {};

  for (const file of files) {
    const content  = fs.readFileSync(file, 'utf-8');
    const title    = extractTitle(content);
    const rel      = path.relative(docsDir, file)
                         .replace(/\.(md|mdx)$/, '')
                         .replace(/\\/g, '/');   // Windows 兼容
    const url      = `/${rel}/`;
    const filename = path.basename(file, path.extname(file));

    const entry = { url, title: title || filename };

    // 以文件名作为主键
    pageMap[filename] = entry;
    // 以 title 作为备用键（如果和文件名不同）
    if (title && title !== filename) pageMap[title] = entry;

    // 记录该页面包含的 wikilinks
    rawLinks[url] = extractWikiLinks(content);
  }

  return { pageMap, rawLinks };
}

function buildBacklinks(pageMap, rawLinks) {
  /** backlinks: 目标 url → [{ url, title }（来源页）] */
  const backlinks = {};

  for (const [sourceUrl, links] of Object.entries(rawLinks)) {
    // 找来源页的 title
    const sourceMeta = Object.values(pageMap).find(p => p.url === sourceUrl);

    for (const linkName of links) {
      const target = pageMap[linkName];
      if (!target) continue;

      if (!backlinks[target.url]) backlinks[target.url] = [];
      // 去重，且排除自引用
      if (target.url !== sourceUrl && !backlinks[target.url].find(b => b.url === sourceUrl)) {
        backlinks[target.url].push({
          url:   sourceUrl,
          title: sourceMeta?.title || sourceUrl,
        });
      }
    }
  }

  return backlinks;
}

// ── Astro integration export ──────────────────────────

export function wikiLinksIntegration() {
  return {
    name: 'wiki-links',
    hooks: {
      'astro:config:setup'({ config, updateConfig }) {
        const docsDir = path.resolve('src/content/docs');

        // --- 构建索引 ---
        const { pageMap, rawLinks } = buildIndex(docsDir);
        const backlinks = buildBacklinks(pageMap, rawLinks);

        // 把反向链接写到磁盘，供 BacklinksPanel.astro 静态导入
        const dataDir = path.resolve('src/data');
        fs.mkdirSync(dataDir, { recursive: true });
        fs.writeFileSync(
          path.join(dataDir, 'backlinks.json'),
          JSON.stringify(backlinks, null, 2),
          'utf-8'
        );

        // 全部已知 permalinks（用于区分「存在的页面」和「断链」）
        const allPermalinks = [...new Set(
          Object.values(pageMap).map(p => p.url.replace(/^\/|\/$/g, ''))
        )];

        // --- 添加 remark-wiki-link 插件 ---
        updateConfig({
          markdown: {
            remarkPlugins: [
              ...(config.markdown?.remarkPlugins ?? []),
              [remarkWikiLink, {
                permalinks: allPermalinks,
                pageResolver: (name) => {
                  const page = pageMap[name];
                  return [page
                    ? page.url.replace(/^\/|\/$/g, '')
                    : name.toLowerCase()];
                },
                hrefTemplate:     (permalink) => `/${permalink}/`,
                wikiLinkClassName: 'internal-link',
                newClassName:      'internal-link broken',
                aliasDivider:      '|',
              }],
            ],
          },
        });
      },
    },
  };
}
