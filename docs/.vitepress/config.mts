import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'xd-ui',
  description: 'Vue3 组件库',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    footer: {
      message: 'Released under the MIT License',
      copyright: 'Copyright © 2024-present Stream1998',
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/initialization', activeMatch: '/guide/' },
      { text: '组件', link: '/component/icon', activeMatch: '/component/' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '安装', link: '/guide/initialization' },
            { text: '快速开始', link: '/guide/quickStart' },
          ],
        },
      ],
      '/component/': [
        {
          text: '组件',
          items: [{ text: 'icon', link: '/component/icon' }],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Stream1998/vue3-component' },
    ],
  },
});
