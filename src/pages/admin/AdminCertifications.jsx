import AdminEntityManager from '@/components/AdminEntityManager';

const fields = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'issuer', label: 'Issuer', type: 'text' },
  { name: 'issue_date', label: 'Issue Date', type: 'date' },
  { name: 'expiry_date', label: 'Expiry Date', type: 'date' },
  { name: 'credential_id', label: 'Credential ID', type: 'text' },
  { name: 'credential_url', label: 'Credential URL', type: 'url' },
  { name: 'badge_image', label: 'Badge Image URL', type: 'image' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'skills', label: 'Skills', type: 'tags' },
  { name: 'status', label: 'Status', type: 'select', options: ['draft', 'published', 'archived'] },
];

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'issuer', label: 'Issuer' },
  { key: 'issue_date', label: 'Issued' },
];

export default function AdminCertifications() {
  return (
    <AdminEntityManager
      entityName="Certification"
      title="Certifications"
      fields={fields}
      columns={columns}
      defaultValues={{ status: 'draft', skills: [] }}
      searchKeys={['title', 'issuer']}
    />
  );
}