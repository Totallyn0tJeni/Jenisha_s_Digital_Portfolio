import AdminEntityManager from '@/components/AdminEntityManager';

const types = ['article', 'tool', 'template', 'guide', 'video', 'pdf', 'course', 'other'];

const fields = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'url', label: 'URL', type: 'url', required: true },
  { name: 'resource_type', label: 'Type', type: 'select', options: types },
  { name: 'category', label: 'Category', type: 'text' },
  { name: 'thumbnail', label: 'Thumbnail URL', type: 'image' },
  { name: 'tags', label: 'Tags', type: 'tags' },
  { name: 'status', label: 'Status', type: 'select', options: ['draft', 'published', 'archived'] },
];

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'resource_type', label: 'Type' },
  { key: 'category', label: 'Category' },
];

export default function AdminResources() {
  return (
    <AdminEntityManager
      entityName="Resource"
      title="Resources"
      fields={fields}
      columns={columns}
      defaultValues={{ status: 'draft', resource_type: 'article', tags: [] }}
      searchKeys={['title', 'description']}
      filterField="resource_type"
    />
  );
}