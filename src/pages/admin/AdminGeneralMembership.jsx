import AdminEntityManager from '@/components/AdminEntityManager';

const fields = [
  { name: 'organization', label: 'Organization', type: 'text', required: true },
  { name: 'category', label: 'Category', type: 'text', placeholder: 'Club, Team, Volunteer Group...' },
  { name: 'years', label: 'Years', type: 'text', placeholder: 'e.g. 2022–2026' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'logo_url', label: 'Logo', type: 'image' },
  { name: 'order', label: 'Display Order', type: 'number' },
  { name: 'status', label: 'Status', type: 'select', options: ['draft', 'published', 'archived'] },
];

const columns = [
  { key: 'organization', label: 'Organization' },
  { key: 'category', label: 'Category' },
  { key: 'years', label: 'Years' },
];

export default function AdminGeneralMembership() {
  return (
    <AdminEntityManager
      entityName="GeneralMembership"
      title="General Memberships"
      fields={fields}
      columns={columns}
      defaultValues={{ status: 'draft', category: 'Club', order: 0 }}
      searchKeys={['organization', 'category']}
      filterField="status"
    />
  );
}