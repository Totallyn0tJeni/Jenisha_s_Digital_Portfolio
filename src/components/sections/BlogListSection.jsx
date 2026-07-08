import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import BlogCard from '../BlogCard';
import SectionHeading from '../SectionHeading';

export default function BlogListSection({ config = {}, section }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const count = config.count || 3;

  useEffect(() => {
    (async () => {
      try {
        const data = await base44.entities.BlogPost.filter({ status: 'published' }, '-published_date', count);
        setPosts(data);
      } catch (e) { setPosts([]); }
      setLoading(false);
    })();
  }, [count]);

  return (
    <section className="py-20 md:py-28 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          {section?.title && <SectionHeading title={section.title} align="left" />}
          <Link to="/blog" className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-premium">
            View All <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post, i) => <BlogCard key={post.id} post={post} index={i} />)}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground/50 italic">Publish your first article to see it here.</p>
          </div>
        )}
      </div>
    </section>
  );
}