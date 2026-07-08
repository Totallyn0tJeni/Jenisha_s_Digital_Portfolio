import AdminEntityManager from '@/components/AdminEntityManager';

const fields = [
  { name: 'author_name', label: 'Author Name', type: 'text', required: true },
  { name: 'author_role', label: 'Author Role', type: 'text' },
  { name: 'author_organization', label: 'Author Organization', type: 'text' },
  { name: 'avatar_url', label: 'Avatar URL', type: 'image' },
  { name: 'content', label: 'Content', type: 'textarea', required: true },
  { name: 'rating', label: 'Rating (1-5)', type: 'number' },
  { name: 'relationship', label: 'Relationship', type: 'text' },
  { name: 'date', label: 'Date', type: 'date' },
  { name: 'status', label: 'Status', type: 'select', options: ['draft', 'published', 'archived'] },
];

const columns = [
  { key: 'author_name', label: 'Author' },
  { key: 'author_role', label: 'Role' },
  { key: 'rating', label: 'Rating' },
];

export default function AdminTestimonials() {
  return (
    <AdminEntityManager
      entityName="Testimonial"
      title="Testimonials"
      fields={fields}
      columns={columns}
      defaultValues={{ status: 'draft', rating: 5 }}
      searchKeys={['author_name', 'content']}
    />
  );
}