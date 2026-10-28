# VuePress Demo

A demo project for [VuePress](https://v2.vuepress.vuejs.org/) - Vue-powered Static Site Generator.

## Project Structure

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

## Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:8080)
npm run dev

# Build static files to src/.vuepress/dist
npm run build
```

## Deploy on IGA Pages

This project can be deployed on IGA Pages. The build output is located at `src/.vuepress/dist`.

Build settings:

- **Build Command**: `vuepress build src`
- **Output Directory**: `src/.vuepress/dist`

## Deploy

```bash
iga pages build
iga pages deploy
```
