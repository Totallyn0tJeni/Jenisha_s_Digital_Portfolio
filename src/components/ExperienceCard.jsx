import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const colorMap = {
  violet: { bg: 'bg-violet-500/15', text: 'text-violet-400', border: 'border-violet-500/20' },
  cyan: { bg: 'bg-cyan-500/15', text: 'text-cyan-400', border: 'border-cyan-500/20' },
  fuchsia: { bg: 'bg-fuchsia-500/15', text: 'text-fuchsia-400', border: 'border-fuchsia-500/20' },
  emerald: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  orange: { bg: 'bg-orange-500/15', text: 'text-orange-400', border: 'border-orange-500/20' },
  blue: { bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/20' },
  amber: { bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/20' },
  pink: { bg: 'bg-pink-500/15', text: 'text-pink-400', border: 'border-pink-500/20' },
  indigo: { bg: 'bg-indigo-500/15', text: 'text-indigo-400', border: 'border-indigo-500/20' },
  teal: { bg: 'bg-teal-500/15', text: 'text-teal-400', border: 'border-teal-500/20' },
  rose: { bg: 'bg-rose-500/15', text: 'text-rose-400', border: 'border-rose-500/20' },
  yellow: { bg: 'bg-yellow-500/15', text: 'text-yellow-400', border: 'border-yellow-500/20' },
};

export default function ExperienceCard({ experience, index = 0, defaultExpanded = false }) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const c = colorMap[experience.icon_color] || colorMap.violet;
  const dateStr = experience.is_current
    ? `${experience.start_date} – Present`
    : `${experience.start_date}${experience.end_date ? ' – ' + experience.end_date : ''}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card p-6 md:p-8"
    >
      <div className="flex items-start gap-4">
        <div className={`w-14 h-14 rounded-xl ${c.bg} flex items-center justify-center flex-shrink-0 border ${c.border}`}>
          <div className={`w-3 h-3 rounded-full ${c.text.replace('text-', 'bg-')}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-lg md:text-xl text-white">{experience.organization}</h3>
          <p className="text-sm text-slate-400 mt-1">{experience.role_title}</p>
          <p className="text-xs text-slate-500 mt-1">{dateStr}{experience.location ? ` · ${experience.location}` : ''}</p>
        </div>
      </div>

      {experience.description && (
        <div className="mt-5">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-between w-full text-left group"
            aria-expanded={expanded}
          >
            <span className="text-sm font-medium text-slate-300 group-hover:text-violet-300 transition-colors">
              {expanded ? 'Hide details' : 'View details'}
            </span>
            <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown className="w-5 h-5 text-slate-400" />
            </motion.div>
          </button>

          <motion.div
            initial={false}
            animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-slate-300 leading-relaxed mt-4">{experience.description}</p>
            {experience.achievements?.length > 0 && (
              <ul className="mt-4 space-y-2">
                {experience.achievements.map((a, i) => (
                  <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                    <span className="text-violet-400 mt-1">▸</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            )}
            {experience.skills?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {experience.skills.map((s, i) => (
                  <span key={i} className="skill-tag">{s}</span>
                ))}
              </div>
            )}
            {experience.media?.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mt-4">
                {experience.media.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${experience.organization} media`}
                    className="w-full h-32 object-cover rounded-xl"
                    loading="lazy"
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}