/**
 * remark-cover
 * 在 Markdown 编译阶段，把 frontmatter 里的 cover 字段
 * 注入为文章第一个节点（图片 HTML），无需任何 Starlight 内部 API。
 *
 * 用法：在文章 frontmatter 加一行
 *   cover: "https://..."
 */
export function remarkCover() {
  return function (tree, file) {
    const cover = file.data?.astro?.frontmatter?.cover;
    if (!cover) return;

    tree.children.unshift({
      type: 'html',
      value: `<div class="article-cover-wrapper"><img src="${cover}" alt="" class="article-cover" loading="lazy"></div>`,
    });
  };
}
