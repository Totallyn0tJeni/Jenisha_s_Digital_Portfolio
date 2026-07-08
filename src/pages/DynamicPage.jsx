import PageRenderer from '@/components/PageRenderer';
import { useParams } from 'react-router-dom';

export default function DynamicPage() {
  const { slug } = useParams();
  return <PageRenderer slug={slug} />;
}