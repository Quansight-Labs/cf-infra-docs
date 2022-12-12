# czi-cf-docs

[![Netlify Status](https://api.netlify.com/api/v1/badges/0c42a203-3592-4910-a5cc-81530f1811d9/deploy-status)](https://app.netlify.com/sites/czi-cf-docs/deploys)

## What is this

This site is the temporary home for the documentation that will be generated as part of the work being done for the [CZI EOSS 5 grant for conda-forge](https://chanzuckerberg.com/eoss/proposals/transparent-open-sustainable-infrastructure-for-conda-forge-and-bioconda/). More details in the [project management repository](https://github.com/Quansight-Labs/czi-conda-forge-mgmt).

We are writing things in a way that would allow us to upstream parts of the site to conda-forge.org itself, if the need arises at any point.

## For contributors

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Structure

#### Organization of the content

Docusaurus has different plugins for different kinds of content; namely blog posts, documentation and single pages.

Docusaurus parses its pages as MDX files ([Markdown+JSX](https://docusaurus.io/docs/markdown-features/react)). It's up to you to decide how much JSX you use:

- No JSX: it will be plain Markdown. Usually denoted with `.md` extensions.
- Mostly Markdown, but with some JSX blocks. Usually denoted with `.mdx` extensions.
- Only JSX. Use `.js` extensions.

The content is categorized in several directories, which use different plugins:

- `blog/` (uses [`@docusaurus/plugin-content-blog`][docusaurus/blog]): The conda-forge blog.
- `community/` (uses [`@docusaurus/plugin-content-docs`][docusaurus/docs]): Documentation about the community aspects.
- `docs/` (uses [`@docusaurus/plugin-content-docs`][docusaurus/docs]): Technical documentation for users, maintainers and organizing teams.
- `news/` (uses [`@docusaurus/plugin-content-blog`][docusaurus/blog]): Quick announcements with a RSS feed
- `src/pages/` (uses [`@docusaurus/plugin-content-pages`][docusaurus/pages]): One-off, standalone pages. Currently:
  - `src/pages/index.js`: Renders the home page. It's a JSX script that returns some React code. It relies on some custom components under `src/components`.

[docusaurus/blog]: https://docusaurus.io/docs/blog
[docusaurus/docs]: https://docusaurus.io/docs/docs-introduction
[docusaurus/pages]: https://docusaurus.io/docs/creating-pages

#### Navigation

- For the top navigation bar, see `themeConfig.navBar` in `docusaurus.config.js`.
- For the footer links, see `themeConfig.footer` in `docusaurus.config.js`.
- The sidebars for `/docs` and `/community` are auto-generated by `sidebarsDocs.js` and `sidebarsCommunity.js`, respectively.

#### Theme and style

It uses the default theme, with custom CSS added in `src/css/custom.css`.

Some components and pages might have their own CSS modules (`*.module.css`).

#### Configuration file

The Docusaurus configuration is stored in `docusaurus.config.js`.
[Read its docs](https://docusaurus.io/docs/api/docusaurus-config).

### Local Development

With `nodejs` 16 or above:

```bash
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Happens automatically through [Netlify](https://app.netlify.com/sites/czi-cf-docs/).