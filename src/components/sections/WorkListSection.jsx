import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import WorkCard from '../cards/WorkCard';
import EmptyState from '../EmptyState';
import SectionHeading from '../SectionHeading';

export default function WorkListSection({ config = {}, section }) {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const count = config.count || 6;
  const workType = config.work_type || null;

  useEffect(() => {
    (async () => {
      try {
        const filter = { status: 'published' };
        if (workType) filter.work_type = workType;
        const data = await base44.entities.Work.filter(filter, '-order', count);
        setWorks(data);
      } catch (e) { setWorks([]); }
      setLoading(false);
    })();
  }, [count, workType]);

  return (
    <section className="py-20 md:py-28 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          {section?.title && <SectionHeading title={section.title} align="left" />}
          <Link to="/work" className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-premium">
            View All <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        {works.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {works.map((work, i) => <WorkCard key={work.id} work={work} index={i} />)}
          </div>
        ) : (
          <EmptyState title="Your first project will appear here" description="Add work from the admin dashboard to showcase your projects, campaigns, and experiments." />
        )}
      </div>
    </section>
  );
}