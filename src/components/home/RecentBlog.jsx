import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import EmptyState from '@/components/EmptyState';

export default function RecentBlog({ posts, loading }) {
  return (
    <section className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <SectionHeading eyebrow="Recent Writing" title="Ideas, tutorials, and thoughts" align="left" />
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-premium">
            View All Posts <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">{[...Array(3)].map((_, i) => <div key={i} className="h-64 rounded-2xl shimmer" />)}</div>
        ) : posts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`} className="glass-card overflow-hidden group">
                <div className="aspect-[16/10] overflow-hidden bg-gradient-soft">
                  {post.cover_image ? (
                    <img src={post.cover_image} alt={post.cover_alt_text || post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary/20"><ArrowUpRight className="w-8 h-8" /></div>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs text-muted-foreground font-mono mb-2">
                    {post.category}{post.published_date ? ` · ${new Date(post.published_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}` : ''}
                  </p>
                  <h3 className="font-display font-semibold text-lg text-foreground leading-snug group-hover:text-primary transition-premium">{post.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState title="Your latest writing will appear here" description="Publish blog posts from the admin dashboard to feature them on your homepage." />
        )}
      </div>
    </section>
  );
}