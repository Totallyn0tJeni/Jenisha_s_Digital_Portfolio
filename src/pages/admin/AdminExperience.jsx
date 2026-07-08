import AdminEntityManager from '@/components/AdminEntityManager';

const types = ['Work', 'Volunteer', 'Leadership', 'Education'];

const fields = [
  { name: 'organization', label: 'Organization', type: 'text', required: true },
  { name: 'role_title', label: 'Role Title', type: 'text', required: true },
  { name: 'type', label: 'Type', type: 'select', options: types, required: true },
  { name: 'start_date', label: 'Start Date', type: 'date' },
  { name: 'end_date', label: 'End Date', type: 'date' },
  { name: 'is_current', label: 'Current', type: 'boolean' },
  { name: 'location', label: 'Location', type: 'text' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'achievements', label: 'Achievements', type: 'tags' },
  { name: 'skills', label: 'Skills', type: 'tags' },
  { name: 'status', label: 'Status', type: 'select', options: ['draft', 'published', 'archived'] },
];

const columns = [
  { key: 'role_title', label: 'Role' },
  { key: 'organization', label: 'Organization' },
  { key: 'type', label: 'Type' },
  { key: 'is_current', label: 'Current', type: 'boolean' },
];

export default function AdminExperience() {
  return (
    <AdminEntityManager
      entityName="Experience"
      title="Experience"
      fields={fields}
      columns={columns}
      defaultValues={{ type: 'Work', status: 'draft', is_current: false, achievements: [], skills: [] }}
      searchKeys={['organization', 'role_title']}
      filterField="type"
    />
  );
}