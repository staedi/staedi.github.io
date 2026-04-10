# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

No test suite is configured.

## Architecture

**Nim** is a personal portfolio website built with Next.js 15 (App Router), React 19, Tailwind CSS v4, and Motion (Framer Motion successor).

### Content customization

All personal content lives in two files:
- `app/data.ts` — `PROJECTS` and `SOCIAL_LINKS` arrays; `WORK_EXPERIENCE` and `BLOG_POSTS` are commented out but typed and ready to enable
- `app/header.tsx` — name and subtitle text
- `lib/constants.ts` — `WEBSITE_URL` for canonical URLs / metadata base

### Blog

Blog posts are `.mdx` files at `app/blog/<slug>/page.mdx`. The `getBlogPosts()` function in `lib/posts.ts` reads them from disk using `gray-matter` to parse frontmatter (`title`, `description`, `date`). Posts are sorted by `date` descending. The blog layout (`app/blog/layout.tsx`) wraps each post with a scroll-progress bar and a copy-URL button.

MDX components are defined in `mdx-components.tsx`. Two custom components are available:
- `<Cover src alt caption />` — renders a captioned image
- `code` — syntax-highlighted via `sugar-high`

### UI components

Animated primitives from [Motion-Primitives](https://motion-primitives.com) live in `components/ui/`. These are standalone, self-contained components (no external Motion-Primitives package — the source is copied in directly).

### Theme

Dark mode is handled by `next-themes` with `attribute="class"`. The layout uses Geist and Geist Mono fonts. Max content width is `max-w-screen-sm` centered with `px-4`.

### Sections on home page (`app/page.tsx`)

Currently active: intro text, Selected Projects, Blog (from filesystem), Connect (social links).
Commented-out sections ready to re-enable: Work Experience (uses `Spotlight` component), project videos (`MorphingDialog`).
