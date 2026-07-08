import AdminEntityManager from '@/components/AdminEntityManager';

const categories = ['Events', 'Nature', 'Portraits', 'Robotics', 'Travel', 'Urban'];

const fields = [
  { name: 'title', label: 'Title', type: 'text' },
  { name: 'image_url', label: 'Image URL', type: 'image', required: true },
  { name: 'alt_text', label: 'Alt Text', type: 'text' },
  { name: 'caption', label: 'Caption', type: 'textarea' },
  { name: 'category', label: 'Category', type: 'select', options: categories, required: true },
  { name: 'album', label: 'Album', type: 'text' },
  { name: 'status', label: 'Status', type: 'select', options: ['draft', 'published', 'archived'] },
];

const columns = [
  { key: 'image_url', label: 'Photo', type: 'image' },
  { key: 'title', label: 'Title' },
  { key: 'category', label: 'Category' },
];

export default function AdminPhotos() {
  return (
    <AdminEntityManager
      entityName="Photo"
      title="Photography"
      fields={fields}
      columns={columns}
      defaultValues={{ category: 'Events', status: 'draft' }}
      searchKeys={['title', 'caption', 'category']}
      filterField="category"
    />
  );
}