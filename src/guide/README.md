# Introduction

VuePress is a **Vue-powered Static Site Generator** with a minimalist design.

## How It Works

A VuePress site is a single-page application (SPA) powered by [Vue](https://vuejs.org/), [Vue Router](https://router.vuejs.org/) and [webpack](https://webpack.js.org/). During the build, the pages are pre-rendered into static HTML, which then becomes an SPA after being loaded in the browser.

Each Markdown file is compiled into HTML with [markdown-it](https://github.com/markdown-it/markdown-it) and then processed as the template of a Vue component. This allows you to directly use Vue inside your Markdown files, and is great when you need to embed dynamic content.

## Features

- **Markdown Extensions**: VuePress comes with many built-in markdown extensions designed to make technical documentation writing easy.
- **Vue in Markdown**: Each markdown file is compiled into HTML and then processed as a Vue single-file component, so you can use Vue components directly in your markdown files.
- **Custom Themes**: VuePress supports developing custom themes in Vue.
- **Default Theme**: VuePress ships with a responsive default theme, including a navigation bar, a sidebar, a search box, and more.

## Next Steps

- Read the [Getting Started](./getting-started.md) guide.
- Learn about [Configuration](./configuration.md).
