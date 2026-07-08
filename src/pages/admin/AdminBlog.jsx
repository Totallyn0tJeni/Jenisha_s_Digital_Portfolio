import AdminEntityManager from '@/components/AdminEntityManager';

const fields = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'slug', label: 'Slug', type: 'text', placeholder: 'url-friendly-name' },
  { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
  { name: 'content', label: 'Content (Markdown)', type: 'richtext', required: true },
  { name: 'cover_image', label: 'Featured Image (Card)', type: 'image' },
  { name: 'cover_alt_text', label: 'Featured Image Alt Text', type: 'text', placeholder: 'Describe the image for accessibility & SEO' },
  { name: 'hero_image', label: 'Hero Banner Image', type: 'image' },
  { name: 'gallery', label: 'Image Gallery', type: 'image-gallery' },
  { name: 'category', label: 'Category', type: 'text' },
  { name: 'tags', label: 'Tags', type: 'tags' },
  { name: 'reading_time', label: 'Reading Time (min)', type: 'number' },
  { name: 'featured', label: 'Featured', type: 'boolean' },
  { name: 'status', label: 'Status', type: 'select', options: ['draft', 'published', 'scheduled', 'archived'] },
  { name: 'published_date', label: 'Publish Date', type: 'date' },
];

const columns = [
  { key: 'cover_image', label: 'Cover', type: 'image' },
  { key: 'title', label: 'Title' },
  { key: 'category', label: 'Category' },
  { key: 'featured', label: 'Featured', type: 'boolean', toggleField: 'featured' },
];

export default function AdminBlog() {
  return (
    <AdminEntityManager
      entityName="BlogPost"
      title="Blog Posts"
      fields={fields}
      columns={columns}
      defaultValues={{ status: 'draft', featured: false, reading_time: 1, tags: [], gallery: [] }}
      searchKeys={['title', 'excerpt', 'category']}
      filterField="status"
    />
  );
}