# Getting Started

## Prerequisites

- [Node.js v20.9.0+](https://nodejs.org/)
- Package manager like [pnpm](https://pnpm.io/), [yarn](https://classic.yarnpkg.com/en/), or [npm](https://www.npmjs.com/)

## Installation

Install the dependencies:

::: code-tabs
@tab npm

```bash
npm install
```

@tab yarn

```bash
yarn install
```

@tab pnpm

```bash
pnpm install
```

:::

## Start Dev Server

::: code-tabs
@tab npm

```bash
npm run dev
```

@tab yarn

```bash
yarn dev
```

@tab pnpm

```bash
pnpm docs:dev
```

:::

VuePress will start a hot-reloading development server at `http://localhost:8080`.

## Build Your Site

::: code-tabs
@tab npm

```bash
npm run docs:build
```

@tab yarn

```bash
yarn docs:build
```

@tab pnpm

```bash
pnpm docs:build
```

:::

The static files will be generated in `src/.vuepress/dist`.

## Directory Structure

```
.
├── src
│   ├── .vuepress
│   │   └── config.js       # VuePress config
│   ├── guide
│   │   ├── README.md       # /guide/
│   │   ├── getting-started.md
│   │   └── configuration.md
│   └── README.md           # Home page /
└── package.json
```
