// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import { wikiLinksIntegration } from './src/integrations/wiki-links.mjs';
import { remarkCover } from './src/plugins/remark-cover.mjs';

export default defineConfig({
  site: 'https://personal-blog-cn.pages.dev',
  adapter: cloudflare(),
  markdown: {
    remarkPlugins: [remarkCover],  // 封面图：读取 frontmatter cover 字段注入图片
  },
  integrations: [
    starlight({
      title: 'yuxiang@blog',
      description: '关于心理学、投资、学习方法、健康与科技的观察与思考',
      defaultLocale: 'root',
      locales: {
        root: { label: '中文', lang: 'zh-CN' },
      },
      customCss: ['./src/styles/nord.css'],
      sidebar: [
        { label: '心理学',  autogenerate: { directory: 'psychology' } },
        { label: '投资',    autogenerate: { directory: 'investing'  } },
        { label: '学习方法', autogenerate: { directory: 'learning'  } },
        { label: '健康',    autogenerate: { directory: 'health'     } },
        { label: '其他',    autogenerate: { directory: 'misc'       } },
        { label: '科技',    autogenerate: { directory: 'tech'       } },
      ],
      tableOfContents: true,
      pagination: true,
      lastUpdated: true,
      social: [],
      components: {
        // 自定义顶栏：导航链接 + 终端路径栏
        Header: './src/components/overrides/Header.astro',
        // 在正文下方注入「反向链接」面板
        ContentPanel: './src/components/overrides/ContentPanel.astro',
        // 只保留 H1（路径已移至 Header）
        PageTitle: './src/components/overrides/PageTitle.astro',
      },
    }),
    wikiLinksIntegration(),   // Obsidian [[双链]] + 反向链接索引
    keystatic(),
    react(),
  ],
});
