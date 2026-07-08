import AdminEntityManager from '@/components/AdminEntityManager';

const categories = ['Brand Partnership', 'Creator Campaign', 'TikTok', 'Instagram', 'Reels', 'Product Photography', 'UGC', 'Other'];
const platforms = ['TikTok', 'Instagram', 'YouTube', 'Mixed', 'Other'];

const fields = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'brand', label: 'Brand', type: 'text' },
  { name: 'campaign', label: 'Campaign', type: 'text' },
  { name: 'category', label: 'Category', type: 'select', options: categories, required: true },
  { name: 'platform', label: 'Platform', type: 'select', options: platforms },
  { name: 'cover_image', label: 'Cover Image URL', type: 'image' },
  { name: 'video_url', label: 'Video URL', type: 'url' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'deliverables', label: 'Deliverables', type: 'tags' },
  { name: 'gallery', label: 'Gallery (Image URLs)', type: 'tags' },
  { name: 'metrics', label: 'Metrics / Results', type: 'metrics-list' },
  { name: 'tags', label: 'Tags', type: 'tags' },
  { name: 'date', label: 'Date', type: 'date' },
  { name: 'featured', label: 'Featured', type: 'boolean' },
  { name: 'status', label: 'Status', type: 'select', options: ['draft', 'published', 'archived'] },
];

const columns = [
  { key: 'cover_image', label: 'Cover', type: 'image' },
  { key: 'title', label: 'Title' },
  { key: 'brand', label: 'Brand' },
  { key: 'category', label: 'Category' },
  { key: 'featured', label: 'Featured', type: 'boolean', toggleField: 'featured' },
];

export default function AdminUGC() {
  return (
    <AdminEntityManager
      entityName="Ugc"
      title="UGC Content"
      fields={fields}
      columns={columns}
      defaultValues={{ category: 'Brand Partnership', platform: 'Instagram', status: 'draft', featured: false, deliverables: [], tags: [], gallery: [], metrics: [] }}
      searchKeys={['title', 'brand', 'campaign', 'category']}
      filterField="category"
    />
  );
}