import AdminEntityManager from '@/components/AdminEntityManager';

const fields = [
  { name: 'institution', label: 'Institution', type: 'text', required: true },
  { name: 'degree', label: 'Degree', type: 'text' },
  { name: 'field_of_study', label: 'Field of Study', type: 'text' },
  { name: 'start_date', label: 'Start Date', type: 'date' },
  { name: 'end_date', label: 'End Date', type: 'date' },
  { name: 'is_current', label: 'Current', type: 'boolean' },
  { name: 'gpa', label: 'GPA', type: 'text' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'logo_url', label: 'Logo URL', type: 'image' },
  { name: 'achievements', label: 'Achievements', type: 'tags' },
  { name: 'courses', label: 'Courses', type: 'tags' },
  { name: 'status', label: 'Status', type: 'select', options: ['draft', 'published', 'archived'] },
];

const columns = [
  { key: 'institution', label: 'Institution' },
  { key: 'degree', label: 'Degree' },
  { key: 'is_current', label: 'Current', type: 'boolean' },
];

export default function AdminEducation() {
  return (
    <AdminEntityManager
      entityName="Education"
      title="Education"
      fields={fields}
      columns={columns}
      defaultValues={{ status: 'draft', is_current: false, achievements: [], courses: [] }}
      searchKeys={['institution', 'degree']}
    />
  );
}