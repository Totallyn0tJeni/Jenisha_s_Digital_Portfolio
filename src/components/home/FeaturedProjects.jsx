import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Briefcase } from 'lucide-react';

const typeColors = {
  software_project: 'bg-violet-500/15 text-violet-400',
  ai_experiment: 'bg-fuchsia-500/15 text-fuchsia-400',
  marketing_campaign: 'bg-amber-500/15 text-amber-400',
  photography_collection: 'bg-emerald-500/15 text-emerald-400',
  ugc_campaign: 'bg-pink-500/15 text-pink-400',
  brand_partnership: 'bg-blue-500/15 text-blue-400',
  research: 'bg-cyan-500/15 text-cyan-400',
  case_study: 'bg-indigo-500/15 text-indigo-400',
  robotics: 'bg-rose-500/15 text-rose-400',
  speaking_engagement: 'bg-teal-500/15 text-teal-400',
  other: 'bg-muted text-muted-foreground',
};

const typeLabels = {
  software_project: 'Software',
  ai_experiment: 'AI',
  marketing_campaign: 'Marketing',
  photography_collection: 'Photography',
  ugc_campaign: 'UGC',
  brand_partnership: 'Brand',
  research: 'Research',
  case_study: 'Case Study',
  startup_idea: 'Startup',
  design_project: 'Design',
  open_source: 'Open Source',
  robotics: 'Robotics',
  competition: 'Competition',
  speaking_engagement: 'Speaking',
  other: 'Work',
};

export default function WorkCard({ work, index = 0 }) {
  const typeColor = typeColors[work.work_type] || typeColors.other;
  const typeLabel = typeLabels[work.work_type] || 'Work';
  const link = `/work/${work.slug || work.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={link} className="block glass-card overflow-hidden h-full group">
        <div className="aspect-video bg-gradient-soft relative overflow-hidden">
          {work.hero_image ? (
            <img
              src={work.hero_image}
              alt={work.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
              <Briefcase className="w-12 h-12" strokeWidth={1} />
            </div>
          )}
          <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold capitalize ${typeColor}`}>
            {typeLabel}
          </span>
        </div>
        <div className="p-5">
          <h3 className="font-display font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-premium">
            {work.title}
          </h3>
          {work.tagline && <p className="text-sm text-muted-foreground line-clamp-2">{work.tagline}</p>}
          {work.tech_stack && work.tech_stack.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {work.tech_stack.slice(0, 3).map((tech, i) => (
                <span key={i} className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{tech}</span>
              ))}
            </div>
          )}
          <div className="flex items-center gap-1 mt-4 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-premium">
            View details <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}