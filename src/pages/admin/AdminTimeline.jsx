import AdminEntityManager from '@/components/AdminEntityManager';

const categories = ['career', 'education', 'award', 'project', 'event', 'milestone', 'volunteer', 'leadership'];

const fields = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'date', label: 'Date', type: 'date', required: true },
  { name: 'end_date', label: 'End Date', type: 'date' },
  { name: 'category', label: 'Category', type: 'select', options: categories },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'icon', label: 'Icon (lucide name)', type: 'text' },
  { name: 'image_url', label: 'Image URL', type: 'image' },
  { name: 'is_milestone', label: 'Milestone', type: 'boolean' },
  { name: 'external_link', label: 'External Link URL', type: 'url' },
  { name: 'external_link_label', label: 'External Link Label', type: 'text' },
  { name: 'related_work_ids', label: 'Related Work IDs', type: 'tags' },
  { name: 'related_blog_ids', label: 'Related Blog IDs', type: 'tags' },
  { name: 'related_award_ids', label: 'Related Award IDs', type: 'tags' },
  { name: 'related_certification_ids', label: 'Related Certification IDs', type: 'tags' },
  { name: 'related_organization_ids', label: 'Related Organization IDs', type: 'tags' },
  { name: 'status', label: 'Status', type: 'select', options: ['draft', 'published', 'archived'] },
];

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'date', label: 'Date' },
  { key: 'category', label: 'Category' },
  { key: 'is_milestone', label: 'Milestone', type: 'boolean' },
];

export default function AdminTimeline() {
  return (
    <AdminEntityManager
      entityName="TimelineEvent"
      title="Timeline"
      fields={fields}
      columns={columns}
      defaultValues={{ status: 'draft', category: 'milestone', is_milestone: false, related_work_ids: [], related_blog_ids: [], related_award_ids: [], related_certification_ids: [], related_organization_ids: [] }}
      searchKeys={['title', 'description']}
      filterField="category"
    />
  );
}