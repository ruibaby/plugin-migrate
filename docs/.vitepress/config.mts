import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-CN",
  title: "Halo 迁移插件",
  description: "多平台迁移至 Halo 2.x 的迁移插件使用文档",
  head: [["link", { rel: "icon", href: "/logo.svg" }]],
  lastUpdated: true,
  themeConfig: {
    logo: "/logo.svg",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      {
        text: "Release",
        link: "https://github.com/halo-sigs/plugin-migrate/releases",
      },
    ],

    sidebar: [
      {
        items: [{ text: "介绍", link: "/" }],
      },
      {
        text: "迁移",
        items: [
          { text: "Halo 1.x", link: "/provider/halo" },
          { text: "WordPress", link: "/provider/wordpress" },
          { text: "RSS", link: "/provider/rss" },
          { text: "Atom", link: "/provider/atom" },
          { text: "HUGO", link: "/provider/hugo" },
          { text: "Ghost", link: "/provider/ghost" },
        ],
      },
      {
        text: "扩展",
        items: [
          { text: "扩展 Provider", link: "/extend/provider" },
          { text: "扩展迁移步骤", link: "/extend/steps" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/halo-sigs/plugin-migrate" },
    ],
  },
});
