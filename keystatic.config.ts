import { config, collection, fields } from '@keystatic/core';

// 本地开发用 local 模式（无需登录），生产环境用 github 模式
const storage =
  process.env.NODE_ENV === 'development'
    ? ({ kind: 'local' } as const)
    : ({
        kind: 'github',
        repo: 'gitcyx93/chen-blog',
      } as const);

// 复用的文章字段 schema（各分类共用）
function articleSchema() {
  return {
    title: fields.slug({
      name: { label: '标题', description: '文章标题（同时决定 URL slug）' },
    }),
    description: fields.text({
      label: '摘要',
      description: '一两句话，显示在侧边栏和搜索结果里',
      multiline: true,
    }),
    date: fields.date({
      label: '发布日期',
      defaultValue: { kind: 'today' },
    }),
    tags: fields.array(
      fields.text({ label: '标签' }),
      {
        label: '标签',
        description: '如：心理学、投资、思考',
        itemLabel: (props) => props.value,
      }
    ),
    cover: fields.text({
      label: '封面图片路径',
      description: '如 /images/my-photo.jpg，图片请放到 public/images/ 目录',
    }),
    content: fields.mdx({
      label: '正文',
      options: {
        bold: true,
        italic: true,
        strikethrough: true,
        code: true,
        heading: [1, 2, 3, 4],
        blockquote: true,
        orderedList: true,
        unorderedList: true,
        table: true,
        link: true,
        image: {
          directory: 'public/images',
          publicPath: '/images/',
        },
      },
    }),
  };
}

export default config({
  storage,

  ui: {
    brand: { name: '陈的笔记' },
  },

  collections: {
    psychology: collection({
      label: '心理学',
      slugField: 'title',
      path: 'src/content/docs/psychology/*',
      format: { contentField: 'content' },
      schema: articleSchema(),
    }),

    investing: collection({
      label: '投资',
      slugField: 'title',
      path: 'src/content/docs/investing/*',
      format: { contentField: 'content' },
      schema: articleSchema(),
    }),

    learning: collection({
      label: '学习方法',
      slugField: 'title',
      path: 'src/content/docs/learning/*',
      format: { contentField: 'content' },
      schema: articleSchema(),
    }),

    health: collection({
      label: '健康',
      slugField: 'title',
      path: 'src/content/docs/health/*',
      format: { contentField: 'content' },
      schema: articleSchema(),
    }),

    world: collection({
      label: '国际关系',
      slugField: 'title',
      path: 'src/content/docs/world/*',
      format: { contentField: 'content' },
      schema: articleSchema(),
    }),

    misc: collection({
      label: '其他',
      slugField: 'title',
      path: 'src/content/docs/misc/*',
      format: { contentField: 'content' },
      schema: articleSchema(),
    }),
  },
});
