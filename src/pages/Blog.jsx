import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/SectionHeading';
import BlogCard from '@/components/BlogCard';
import EmptyState from '@/components/EmptyState';
import { blogPosts } from '@/data/blog';

export default function Blog() {
  const posts = blogPosts;
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...new Set(posts.map((p) => p.category).filter(Boolean))];
  const filtered = activeCategory === 'All' ? posts : posts.filter((p) => p.category === activeCategory);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <section className="px-4 md:px-8 pt-12 pb-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="Writing" title="Blog" subtitle="Thoughts, insights, and reflections on technology, leadership, and marketing." />
        </div>
      </section>

      <section className="px-4 md:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {categories.length > 1 && (
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 mb-10 justify-start md:justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-premium ${
                    activeCategory === cat ? 'bg-primary text-primary-foreground' : 'glass text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => <BlogCard key={post.id} post={post} index={i} />)}
            </div>
          ) : (
            <EmptyState title="Publish your first article" description="Your blog posts will appear here once published." />
          )}
        </div>
      </section>
    </motion.div>
  );
}