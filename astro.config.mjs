// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://personal-blog-cn.pages.dev',
  adapter: cloudflare(),
  integrations: [
    starlight({
      title: '陈的笔记',
      description: '关于心理学、投资、学习方法、健康与国际关系的观察与思考',
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
        { label: '国际关系', autogenerate: { directory: 'world'     } },
        { label: '其他',    autogenerate: { directory: 'misc'       } },
      ],
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
      pagination: true,
      lastUpdated: true,
      social: [],
    }),
    keystatic(),
    react(),
  ],
});
