// Two kinds of "resources" live here, both using this same array + page:
//
// 1. Curated links (resource_type: 'article'|'tool'|'template'|'guide'|'video'|'course'|'other')
//    — external things worth pointing people to.
//
// 2. Downloadable materials (resource_type: 'download', download_category: one of
//    DOWNLOAD_CATEGORIES below) — first-party files people can grab directly.
//    Add an entry once you have a real file_url; until then the Resources page
//    shows the supported categories as an empty state so the architecture is
//    visible even with nothing uploaded yet.
//
// Shape for a downloadable entry:
// {
//   id: 'media-kit', title: 'Media Kit', resource_type: 'download',
//   download_category: 'Media Kit', file_url: '', description: '...',
// }

export const DOWNLOAD_CATEGORIES = [
  'Resume',
  'Media Kit',
  'Brand Guidelines',
  'Headshots',
  'Logos',
  'Photography Pricing Guide',
  'UGC Rate Card',
  'Marketing Portfolio PDF',
  'Speaker Bio',
  'One-Page CV',
];

export const resources = [];

export default resources;
