# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Project Is

A [Slidev](https://sli.dev) presentation for teaching Vue at AltSchool Africa. Slides are authored in `slides.md` (and page partials in `pages/*.md`) using Markdown with MDC syntax. The framework is Vue-powered, and the course content is Vue 3 — covering reactivity, composables, template syntax, state management, and more.

## Commands

```bash
# Start dev server (slides at http://localhost:3030)
pnpm dev

# Production build
pnpm build

# Export to PDF
pnpm build:pdf

# Format all files (uses prettier-plugin-slidev for .md)
pnpm format
```

The project uses `pnpm` (v10). There is no typecheck or lint script.

## Architecture

### Slide Content

- `slides.md` — root entry point; imports page partials via `src:` frontmatter
- `pages/*.md` — one file per Vue topic (reactivity, composables, routing, etc.)
- Each page file is a standalone slide deck merged into the main presentation

### Custom Vue Components (used inside slides)

- `components/` — Vue SFCs (`.vue`) embedded in slides via `<ComponentName />` MDC syntax
- `components/composables/`, `components/reactivity/` — topic-grouped interactive demos
- `global-top.vue` — injects `<TocIcon />` on every slide
- `global-bottom.vue` — WebSocket-connected visitor counter using `@vueuse/core`'s `useWebSocket`
- `layouts/iframe-lazy.vue` — lazy-loading iframe layout for embedding external demos

### Live Code Runners (`setup/code-runners.ts`)

Enables interactive code blocks in slides:
- `vue` runner: compiles Vue SFCs in-browser via `@vue/compiler-sfc`

Code blocks marked ` ```vue ` become runnable in the slide presentation.

### Styling

UnoCSS with custom shortcuts defined in `unocss.config.ts`:
- `text-gradient` — green-to-purple gradient text
- `logo`, `btn`, `card`, `input` — reusable utility shortcuts
- Web fonts: `font-strong` (Rubik Iso), `font-fast` (Ubuntu), `font-hand` (Caveat), `font-mono` (Operator Mono italic)

### Snippets (`snippets/`)

Reusable code snippet files referenced in slides via `<<< @/snippets/...` imports.

## Adding Slides

1. Create or edit the relevant `pages/<topic>.md`
2. Ensure `slides.md` has `src: ./pages/<topic>.md` in a separator block
3. Vue components in `components/` are auto-imported — no import statements needed in slides
4. Use `layout: center`, `hideInToc: true`, `name: SomeName` in slide frontmatter as needed

## Prettier

Single quotes, no semicolons. Slidev markdown files use `prettier-plugin-slidev` — always run `pnpm format` before committing slide content.

## Agent skills

### Issue tracker

Issues live in GitHub Issues for this repo. See `docs/agents/issue-tracker.md`.

### Triage labels

Default canonical label names are used (needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout — one `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
