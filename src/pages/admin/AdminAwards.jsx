import AdminEntityManager from '@/components/AdminEntityManager';

const fields = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'organization', label: 'Organization', type: 'text' },
  { name: 'date', label: 'Date', type: 'date' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'status', label: 'Status', type: 'select', options: ['draft', 'published', 'archived'] },
];

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'organization', label: 'Organization' },
  { key: 'date', label: 'Date' },
];

export default function AdminAwards() {
  return (
    <AdminEntityManager
      entityName="Award"
      title="Awards"
      fields={fields}
      columns={columns}
      defaultValues={{ status: 'draft' }}
      searchKeys={['title', 'organization']}
    />
  );
}