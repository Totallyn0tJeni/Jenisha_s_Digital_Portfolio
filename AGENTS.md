# Agent instructions

This is a standalone React + Vite portfolio site. There is no backend and no CMS —
all content lives in `src/data/` as plain JS files, and the site is built into
static assets with `vite build`.

## Stack
- React 18 + React Router 6
- Vite (bundler/dev server)
- Tailwind CSS + shadcn/ui (Radix primitives) for styling
- Framer Motion for animation

## Content
See `src/data/README.md` for the full convention. Short version: growth
collections (work, blog, certifications, awards, leadership, experience,
photos, organizations, memberships) are folders of one-file-per-item under
`items/`, auto-aggregated by an `index.js` via `import.meta.glob`. Bounded
data (site settings, navigation, education, skills, resume links) is a
single file each.

## Making changes
- Never re-introduce calls to a `base44` SDK, `@base44/*` packages, or an
  `@/api/base44Client` import — there is no backend, those calls will fail.
- To add content: create a new file in the relevant collection's `items/`
  folder (see `src/data/README.md`), don't hand-edit an index file.
- Preserve the existing visual design system (see `src/index.css` for the
  CSS custom properties / theme tokens, Tailwind config for utilities) unless
  explicitly asked to change it.
- Run `npm run build` after non-trivial changes to make sure nothing is
  broken — there's no live backend to mask a broken import at runtime.
