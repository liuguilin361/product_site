# Configuration

VuePress uses a `.vuepress/config.js` file (or `.vuepress/config.ts` for TypeScript) inside the source directory as the configuration file.

## Basic Config

```js
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  bundler: viteBundler(),
  theme: defaultTheme(),
  lang: 'en-US',
  title: 'My VuePress Site',
  description: 'This is my first VuePress site',
})
```

## Site Config

| Option | Type | Description |
| ------ | ---- | ----------- |
| `lang` | `string` | Language of the site, e.g. `en-US`, `zh-CN` |
| `title` | `string` | Title of the site |
| `description` | `string` | Description of the site |
| `base` | `string` | Base URL the site will be deployed at |
| `head` | `HeadConfig[]` | Extra tags to inject in the `<head>` tag |

## Theme Config

The default theme provides many config options:

```js
defaultTheme({
  // Navbar
  navbar: [
    { text: 'Home', link: '/' },
    { text: 'Guide', link: '/guide/' },
  ],
  // Sidebar
  sidebar: {
    '/guide/': [
      {
        text: 'Guide',
        children: ['/guide/README.md', '/guide/getting-started.md'],
      },
    ],
  },
  // GitHub repo link
  repo: 'https://github.com/vuepress/core',
})
```

## More

For a full list of configuration options, refer to the [official VuePress documentation](https://v2.vuepress.vuejs.org/reference/config.html).
