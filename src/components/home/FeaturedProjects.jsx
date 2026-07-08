import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import EmptyState from '@/components/EmptyState';
import WorkCard from '@/components/cards/WorkCard';

export default function FeaturedProjects({ work, loading }) {
  return (
    <section className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <SectionHeading eyebrow="Featured Projects" title="Things I've built and shipped" align="left" />
          <Link to="/work" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-premium">
            View All Projects <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">{[...Array(3)].map((_, i) => <div key={i} className="h-72 rounded-2xl shimmer" />)}</div>
        ) : work.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">{work.map((w, i) => <WorkCard key={w.id} work={w} index={i} />)}</div>
        ) : (
          <EmptyState title="Your featured work will appear here" description="Mark work as featured in the admin dashboard to showcase it on your homepage." />
        )}
      </div>
    </section>
  );
}