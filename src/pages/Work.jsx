import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import WorkCard from '@/components/cards/WorkCard';
import EmptyState from '@/components/EmptyState';
import SectionHeading from '@/components/SectionHeading';
import { work as workData } from '@/data/work';

const workTypes = [
  { value: 'all', label: 'All' },
  { value: 'software_project', label: 'Software' },
  { value: 'ai_experiment', label: 'AI' },
  { value: 'marketing_campaign', label: 'Marketing' },
  { value: 'photography_collection', label: 'Photography' },
  { value: 'ugc_campaign', label: 'UGC' },
  { value: 'brand_partnership', label: 'Brand' },
  { value: 'research', label: 'Research' },
  { value: 'robotics', label: 'Robotics' },
  { value: 'design_project', label: 'Design' },
  { value: 'speaking_engagement', label: 'Speaking' },
];

export default function Work() {
  const works = workData;
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = works.filter((w) => {
    const matchesFilter = filter === 'all' || w.work_type === filter;
    const matchesSearch = !search || (w.title || '').toLowerCase().includes(search.toLowerCase()) || (w.tagline || '').toLowerCase().includes(search.toLowerCase()) || (w.tags || []).some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <section className="px-4 md:px-8 pt-12 pb-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="Everything I Build" title="Work" subtitle="Software, AI, marketing, photography, and more — unified in one place." />
        </div>
      </section>

      <section className="px-4 md:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Search + Filters */}
          <div className="flex flex-col gap-4 mb-10">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search work..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-surface border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/50"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {workTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setFilter(type.value)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-premium ${
                    filter === type.value ? 'bg-primary text-primary-foreground' : 'glass text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((work, i) => <WorkCard key={work.id} work={work} index={i} />)}
            </div>
          ) : (
            <EmptyState title="Your first project will appear here" description="Add work to src/data/work/items/." />
          )}
        </div>
      </section>
    </motion.div>
  );
}