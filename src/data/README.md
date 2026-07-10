# `src/data/` — content layer

All portfolio content lives here as plain JS, edited directly in your IDE. There is
no backend, no build step required to add content, and no database — everything is
bundled at build time.

## Two kinds of data files

### 1. Growth collections (folder + auto-index)

For content expected to grow into the dozens or hundreds over time:

```
src/data/work/
  items/
    wolfhacks-2026-marketing.js
    portfolio-website.js
    ...one file per project
  index.js        <- aggregates items/*.js automatically, sorts, exports helpers
```

**To add a new entry: create one new file in the `items/` folder. That's it.**
`index.js` uses Vite's `import.meta.glob` to pick up every file in `items/`
automatically — you never need to edit an index/registry by hand, so there's
nothing to merge-conflict or forget to update.

Each item file looks like:

```js
export default {
  id: 'my-new-project',   // stable, unique, kebab-case
  title: 'My New Project',
  order: 10,               // controls display order within the collection
  // ...whatever fields that collection uses, see an existing sibling file
  // for the exact shape expected by the pages that render it.
}
```

Collections using this pattern today:

| Folder | Powers | Sort |
|---|---|---|
| `work/` | Work / Projects page, Home "Featured Projects" | `order` |
| `blog/` | Blog, Home "Recent Writing" | `published_date` (desc) |
| `certifications/` | Certifications page (grouped by `category`) | `order` |
| `awards/` | Awards page, Experience page | `order` |
| `leadership/` | Leadership page, Home "Leadership Highlight" | `order` |
| `experience/` | Experience page ("Work Experience" section) | `order` |
| `photos/` | Photography page | `order` |
| `organizations/` | Home "Organizations & Communities" strip | `order` |
| `memberships/` | Leadership page "Everywhere else I show up" | `order` |
| `timeline/` | Timeline page | `date` (desc) |

Shared helpers for these live in `src/data/_collectionUtils.js`
(`loadItems`, `sortByOrder`, `sortByDateDesc`) — reuse them if you add a new
growth collection later (e.g. `timeline/`, `testimonials/`) rather than
reinventing sorting/loading logic.

### 2. Single-file data (bounded lists)

For content that will only ever have a handful of entries, a plain array or
object in one file is simpler and there's no reason to split it:

- `siteSettings.js` — hero copy, bio, stats, social links, footer CTA
- `navigation.js` — navbar / footer links
- `education.js` — schools attended (realistically caps out around 4–6, ever)
- `skills.js` — skill tags grouped by category
- `resume.js` — résumé file links
- `volunteerWork.js`, `testimonials.js`, `resources.js`, `ugc.js`
  — currently empty; add entries directly to the array. **If any of these
  grows large, convert it to the folder pattern above** — copy the shape of
  an existing collection's `index.js` and split the array into `items/*.js`.

## Editing content

- **Update an existing entry:** open its file, edit the fields, save.
- **Add a new entry to a growth collection:** copy a sibling file in that
  collection's `items/` folder, change the values, save.
- **Remove an entry:** delete its file (growth collections) or its array
  element (single-file collections).
- **Reorder:** change the `order` field (lower = earlier). Blog posts and
  most others sort by date instead — see the table above.

No other files need to change when you add/edit/remove content — pages
import the collection's `index.js` and re-render automatically.
