import AdminEntityManager from '@/components/AdminEntityManager';

const workTypes = [
  'software_project', 'ai_experiment', 'marketing_campaign', 'photography_collection',
  'ugc_campaign', 'brand_partnership', 'research', 'case_study', 'startup_idea',
  'design_project', 'open_source', 'robotics', 'competition', 'speaking_engagement', 'other'
];

const fields = [
  { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Project name' },
  { name: 'slug', label: 'Slug', type: 'text', placeholder: 'url-friendly-name' },
  { name: 'work_type', label: 'Work Type', type: 'select', options: workTypes, required: true },
  { name: 'tagline', label: 'Tagline', type: 'text', placeholder: 'One-line summary' },
  { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Short description for cards' },
  { name: 'category', label: 'Category', type: 'text' },
  { name: 'hero_image', label: 'Hero Image URL', type: 'image' },
  { name: 'gallery', label: 'Gallery Images', type: 'tags', placeholder: 'Paste image URLs...' },
  { name: 'tech_stack', label: 'Tech Stack / Tools', type: 'tags', placeholder: 'React, Python...' },
  { name: 'tags', label: 'Tags', type: 'tags', placeholder: 'Add tags...' },
  { name: 'collections', label: 'Collections', type: 'tags', placeholder: 'Collection names...' },
  { name: 'problem', label: 'Problem', type: 'textarea' },
  { name: 'solution', label: 'Solution', type: 'textarea' },
  { name: 'case_study', label: 'Case Study (Markdown)', type: 'richtext' },
  { name: 'content', label: 'Content (Markdown)', type: 'richtext' },
  { name: 'links', label: 'Links', type: 'links' },
  { name: 'metrics', label: 'Metrics / Results', type: 'metrics-list' },
  { name: 'related_work_ids', label: 'Related Work IDs', type: 'tags', placeholder: 'Work record IDs...' },
  { name: 'date', label: 'Date', type: 'date' },
  { name: 'end_date', label: 'End Date', type: 'date' },
  { name: 'location', label: 'Location', type: 'text' },
  { name: 'featured', label: 'Featured', type: 'boolean' },
  { name: 'pinned', label: 'Pinned', type: 'boolean' },
  { name: 'order', label: 'Order', type: 'number' },
  { name: 'status', label: 'Status', type: 'select', options: ['draft', 'published', 'scheduled', 'archived'] },
  { name: 'published_date', label: 'Publish Date', type: 'date' },
  { name: 'seo_title', label: 'SEO Title', type: 'text' },
  { name: 'seo_description', label: 'SEO Description', type: 'textarea' },
];

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'work_type', label: 'Type', render: (r) => <span className="px-2 py-0.5 rounded-full text-xs bg-primary/15 text-primary capitalize">{(r.work_type || '').replace(/_/g, ' ')}</span> },
  { key: 'featured', label: 'Featured', type: 'boolean', toggleField: 'featured' },
];

export default function AdminWork() {
  return (
    <AdminEntityManager
      entityName="Work"
      title="Work"
      fields={fields}
      columns={columns}
      defaultValues={{ work_type: 'software_project', status: 'draft', featured: false, pinned: false, tech_stack: [], tags: [], gallery: [], collections: [], related_work_ids: [], metrics: [], links: {}, order: 0 }}
      searchKeys={['title', 'tagline', 'description']}
      filterField="work_type"
    />
  );
}