import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Calendar } from 'lucide-react';
import EmptyState from '@/components/EmptyState';
import { getOrganizationBySlugOrId } from '@/data/organizations/resolve';
import { getOrganizationAggregation } from '@/lib/orgAnalytics';
import { formatShortDate } from '@/lib/dateUtils';

const SECTION_ORDER = [
  ['experience', 'Experience'],
  ['leadership', 'Leadership Positions'],
  ['work', 'Projects'],
  ['marketing', 'Marketing Campaigns'],
  ['awards', 'Awards'],
  ['certifications', 'Certifications'],
  ['photography', 'Photography'],
  ['blog', 'Blog Posts'],
  ['memberships', 'Memberships'],
  ['education', 'Education'],
];

export default function OrganizationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const org = getOrganizationBySlugOrId(id);

  if (!org) {
    return (
      <div className="px-4 pt-20">
        <EmptyState title="Organization not found" description="This organization may have been removed or renamed." action={{ label: 'Back to Organizations', onClick: () => navigate('/organizations') }} />
      </div>
    );
  }

  const { grouped, stats, timelineEvents } = getOrganizationAggregation(org.id);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <article className="px-4 md:px-8 pt-12 pb-20">
        <div className="max-w-5xl mx-auto">
          <Link to="/organizations" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-premium mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Organizations
          </Link>

          <div className="flex items-center gap-4 mb-4">
            {org.logo_url ? (
              <img src={org.logo_url} alt={org.name} className="w-16 h-16 rounded-2xl object-cover" />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-display font-bold text-2xl">{org.name?.[0]}</div>
            )}
            <div>
              <h1 className="font-display font-bold text-3xl md:text-5xl text-foreground leading-tight">{org.name}</h1>
              {org.category && <p className="text-sm text-primary mt-1">{org.category}</p>}
            </div>
            {org.is_current && <span className="ml-auto px-2.5 py-0.5 rounded-full text-xs bg-emerald-500/15 text-emerald-500 shrink-0">Current</span>}
          </div>

          {org.role && <p className="text-muted-foreground leading-relaxed mb-2">{org.role}</p>}
          {org.description && <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl">{org.description}</p>}
          {org.website_url && (
            <a href={org.website_url} target="_blank" rel="noopener noreferrer" className="inline-block mb-8 text-sm text-primary hover:text-primary/80 transition-premium">
              Visit website →
            </a>
          )}

          {stats.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-12">
              {stats.map((s) => (
                <div key={s.label} className="glass-card p-4 text-center">
                  <p className="font-display font-bold text-2xl text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-10">
            {SECTION_ORDER.filter(([key]) => grouped[key]?.length).map(([key, label]) => (
              <div key={key}>
                <h2 className="font-display font-semibold text-xl text-foreground mb-3">{label}</h2>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {grouped[key].map((item) => (
                    <Link
                      key={`${item.type}-${item.id}`}
                      to={item.path}
                      className="glass-card p-4 flex items-center justify-between gap-2 hover:border-primary/30 transition-premium group"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                        {item.subtitle && <p className="text-xs text-muted-foreground truncate">{item.subtitle}</p>}
                      </div>
                      <ArrowUpRight className="w-4 h-4 shrink-0 text-muted-foreground opacity-60 group-hover:opacity-100 group-hover:text-primary transition-premium" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {timelineEvents.length > 0 && (
              <div>
                <h2 className="font-display font-semibold text-xl text-foreground mb-3">Timeline</h2>
                <div className="space-y-2.5">
                  {timelineEvents.map((e) => (
                    <Link
                      key={e.id}
                      to={`/timeline?highlight=${e.id}`}
                      className="glass-card p-4 flex items-center gap-3 hover:border-primary/30 transition-premium group"
                    >
                      <Calendar className="w-4 h-4 shrink-0 text-primary/60" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground truncate">{e.title}</p>
                        <p className="text-xs text-muted-foreground">{formatShortDate(e.date)}</p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 shrink-0 text-muted-foreground opacity-60 group-hover:opacity-100 group-hover:text-primary transition-premium" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {stats.length === 0 && SECTION_ORDER.every(([key]) => !grouped[key]?.length) && (
            <EmptyState title="Nothing linked yet" description="Content referencing this organization will appear here automatically." />
          )}
        </div>
      </article>
    </motion.div>
  );
}
