import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  bundler: viteBundler(),
  theme: defaultTheme({
    navbar: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          children: [
            '/guide/README.md',
            '/guide/getting-started.md',
            '/guide/configuration.md',
          ],
        },
      ],
    },
    repo: 'vuepress/core',
    docsDir: 'src',
  }),
  lang: 'en-US',
  title: 'VuePress Demo',
  description: 'A VuePress Demo Site',
})
