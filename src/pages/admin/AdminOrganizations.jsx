import AdminEntityManager from '@/components/AdminEntityManager';

const fields = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'role', label: 'Role', type: 'text' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'category', label: 'Category', type: 'text' },
  { name: 'start_date', label: 'Start Date', type: 'date' },
  { name: 'end_date', label: 'End Date', type: 'date' },
  { name: 'is_current', label: 'Current', type: 'boolean' },
  { name: 'logo_url', label: 'Logo URL', type: 'image' },
  { name: 'website_url', label: 'Website URL', type: 'url' },
  { name: 'members', label: 'Members', type: 'number' },
  { name: 'achievements', label: 'Achievements', type: 'tags' },
  { name: 'status', label: 'Status', type: 'select', options: ['draft', 'published', 'archived'] },
];

const columns = [
  { key: 'logo_url', label: 'Logo', type: 'image' },
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'is_current', label: 'Current', type: 'boolean' },
];

export default function AdminOrganizations() {
  return (
    <AdminEntityManager
      entityName="Organization"
      title="Organizations"
      fields={fields}
      columns={columns}
      defaultValues={{ status: 'draft', is_current: false, achievements: [] }}
      searchKeys={['name', 'role']}
    />
  );
}	