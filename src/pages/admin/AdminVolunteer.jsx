import AdminEntityManager from '@/components/AdminEntityManager';

const causes = ['education', 'environment', 'community', 'health', 'stem', 'other'];

const fields = [
  { name: 'organization', label: 'Organization', type: 'text', required: true },
  { name: 'role', label: 'Role', type: 'text' },
  { name: 'cause', label: 'Cause', type: 'select', options: causes },
  { name: 'start_date', label: 'Start Date', type: 'date' },
  { name: 'end_date', label: 'End Date', type: 'date' },
  { name: 'is_current', label: 'Current', type: 'boolean' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'hours', label: 'Hours', type: 'number' },
  { name: 'logo_url', label: 'Logo URL', type: 'image' },
  { name: 'achievements', label: 'Achievements', type: 'tags' },
  { name: 'status', label: 'Status', type: 'select', options: ['draft', 'published', 'archived'] },
];

const columns = [
  { key: 'organization', label: 'Organization' },
  { key: 'role', label: 'Role' },
  { key: 'cause', label: 'Cause' },
  { key: 'is_current', label: 'Current', type: 'boolean' },
];

export default function AdminVolunteer() {
  return (
    <AdminEntityManager
      entityName="VolunteerWork"
      title="Volunteer Work"
      fields={fields}
      columns={columns}
      defaultValues={{ status: 'draft', cause: 'community', is_current: false, achievements: [] }}
      searchKeys={['organization', 'role']}
      filterField="cause"
    />
  );
}