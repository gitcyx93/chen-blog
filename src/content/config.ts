import { defineCollection, z } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

// 用 Starlight 的 docsSchema 并扩展自定义字段
export const collections = {
  docs: defineCollection({
    schema: docsSchema({
      extend: () =>
        z.object({
          date: z.string().optional(),
          tags: z.array(z.string()).optional(),
          cover: z.string().optional(),
        }),
    }),
  }),
};
