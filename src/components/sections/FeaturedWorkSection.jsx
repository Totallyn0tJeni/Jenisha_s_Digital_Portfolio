import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import ImagePlaceholder from '../ImagePlaceholder';
import SectionHeading from '../SectionHeading';
import WorkCard from '../cards/WorkCard';

export default function FeaturedWorkSection({ config = {}, section }) {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const count = config.count || 3;

  useEffect(() => {
    (async () => {
      try {
        const data = await base44.entities.Work.filter({ status: 'published', featured: true }, '-order', count);
        setWorks(data);
      } catch (e) { setWorks([]); }
      setLoading(false);
    })();
  }, [count]);

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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(count)].map((_, i) => <ImagePlaceholder key={i} label="Your first project will appear here" aspect="auto" className="h-64" />)}
          </div>
        )}
      </div>
    </section>
  );
}