import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Briefcase, Megaphone, Cpu, HeartHandshake, Sparkles, Video, BookOpen, Globe, Users } from 'lucide-react';

const iconMap = { briefcase: Briefcase, megaphone: Megaphone, cpu: Cpu, 'heart-handshake': HeartHandshake, sparkles: Sparkles, video: Video, 'book-open': BookOpen, globe: Globe, users: Users };

const formatDate = (dateStr) => dateStr ? new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '';

// A concise, clickable preview card for a role (professional or leadership).
// Used on the homepage (Featured Roles) and the Experience page — the single
// shared card UI for "a role someone held," so both surfaces stay visually
// and structurally identical without duplicating markup.
export default function RoleCard({ role, index = 0 }) {
  const Icon = iconMap[role.icon] || Briefcase;
  const dateRange = role.start_date
    ? `${formatDate(role.start_date)} – ${role.is_current ? 'Present' : formatDate(role.end_date) || ''}`
    : '';
  const tags = (role.skills || []).slice(0, 3);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: index * 0.05, duration: 0.5 }}>
      <Link to={`/experience/${role.id}`} className="glass-card p-6 block group h-full">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/15 transition-premium">
            <Icon className="w-5 h-5" />
          </div>
          <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-premium shrink-0 mt-1" />
        </div>

        <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-premium leading-snug">{role.title}</h3>
        <p className="text-sm text-primary font-mono mt-0.5">{role.organization}</p>
        {dateRange && <p className="text-xs text-muted-foreground mt-1.5 font-mono">{dateRange}</p>}

        {role.summary && <p className="text-sm text-muted-foreground mt-3 leading-relaxed line-clamp-2">{role.summary}</p>}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {tags.map((t, i) => <span key={i} className="skill-tag">{t}</span>)}
          </div>
        )}
      </Link>
    </motion.div>
  );
}
