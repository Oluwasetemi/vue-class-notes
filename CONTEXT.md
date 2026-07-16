# CONTEXT.md — vue-note domain glossary

This file records the domain language for vue-note. All architectural work should use these terms.
The `/improve-codebase-architecture` skill reads this before exploring.

---

## Domain terms

### Presentation

**Slide page** — one `.md` file in `pages/`. Each page covers a single Vue topic and maps it to the React equivalent via `<Tips>` callouts. Imported into `slides.md` via `src:`.

**Section header** — the slide in `slides.md` before each `src:` import. Provides the animated reveal of the section name.

**TOC slide** — the first slide in each page file (`layout: center`). Contains nav links using `$nav.currentPage+N` offsets.

**React callout** — a `<Tips type="info">` block that maps the Vue concept to its React equivalent. Every concept slide that has a React analogue ends with one.

---

### Vue Playground (`views/vue-playground.vue`)

**Playground view** — a full-screen Slidev view (registered in `setup/routes.ts`) that provides an in-browser Vue SFC editor with a live preview and a reactive console.

**SFC compilation** — the process of parsing a Vue SFC string with `@vue/compiler-sfc`, rewriting `import { ... } from 'vue'` to inline the host Vue instance, and evaluating the result as a component definition. Handled by `setup/compile-sfc.ts`.

**Console capture** — monkey-patching `log/error/warn` on a `Console` object to intercept output and deliver it as `ConsoleEntry` values to a reactive list. Handled by `setup/capture-console.ts`. The html code-runner captures `iframeWindow.console`; the playground captures `window.console`.

**Split pane** — the two-axis resizable layout in the playground: a vertical divider (editor ↔ preview+console, in %) and a horizontal divider (preview ↔ console, in px). Managed by `composables/use-split-pane.ts`.

**Syntax highlight overlay** — the Shiki-rendered HTML layer positioned behind the transparent textarea. Provides syntax colouring without replacing the textarea's native editing behaviour. Managed by `composables/use-code-highlight.ts`.

---

### Lazy iframe

**Lazy-load state machine** — idle → loading → loaded transitions for a deferred iframe, triggered by user click or IntersectionObserver. Shared between `components/LazyIframe.vue` (click-triggered, optional autoLoad) and `layouts/iframe-lazy.vue` (click-triggered, same). Managed by `composables/use-lazy-load.ts`.

---

## Preferred terms / avoid

| Use | Avoid |
|-----|-------|
| SFC compilation | "running code", "evaluating the vue runner" |
| Console capture | "console interception", "proxying console" |
| Split pane | "drag handle logic", "resizable panels" |
| Lazy-load state machine | "iframe loading logic" |
| Slide page | "slide file", "page file" |
| React callout | "tip", "React comparison" |
