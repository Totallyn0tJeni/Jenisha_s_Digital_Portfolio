import { motion } from 'framer-motion';
import SectionHeading from '@/components/SectionHeading';
import EmptyState from '@/components/EmptyState';
import ContinueExploring from '@/components/ContinueExploring';
import { leadership as leadershipData } from '@/data/leadership';
import { volunteerWork as volunteerData } from '@/data/volunteerWork';
import { memberships as membershipsData } from '@/data/memberships';

export default function Leadership() {
  const roles = [...leadershipData].sort((a, b) => a.order - b.order);
  const volunteer = [...volunteerData].sort((a, b) => (a.order || 0) - (b.order || 0));
  const memberships = [...membershipsData].sort((a, b) => a.order - b.order);
  const loading = false;

  const grouped = roles.reduce((acc, role) => {
    if (!acc[role.organization]) acc[role.organization] = [];
    acc[role.organization].push(role);
    return acc;
  }, {});

  const formatDate = (dateStr) => dateStr ? new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {/* Page Hero */}
      <section className="px-4 md:px-8 pt-12 pb-10">
        <div className="max-w-5xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-primary">
            <span className="w-4 h-px bg-primary" /> Leadership
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground leading-tight mt-4">
            Where I've <span className="text-gradient">led</span>
          </h1>
          <p className="text-muted-foreground mt-4 max-w-xl text-[15px] leading-relaxed">
            Organizations I've led, causes I've served, and communities I've been part of — from student government to robotics to youth nonprofits.
          </p>
        </div>
      </section>

      {/* Leadership Roles */}
      <section className="px-4 md:px-8 pb-16">
        <div className="max-w-5xl mx-auto">
          {roles.length > 0 ? (
            <div className="space-y-6">
              {Object.entries(grouped).map(([org, orgRoles], idx) => (
                <motion.div
                  key={org}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                  className="glass-card p-6 md:p-10"
                >
                  {orgRoles.map((role) => (
                    <div key={role.id}>
                      <div className="flex items-start justify-between gap-4 flex-wrap mb-1">
                        <h3 className="font-display font-semibold text-xl md:text-2xl text-foreground">{org}</h3>
                        {(role.start_date || role.end_date) && (
                          <span className="text-xs font-mono text-muted-foreground whitespace-nowrap pt-1">
                            {formatDate(role.start_date)}{role.is_current ? ' – Present' : role.end_date ? ` – ${formatDate(role.end_date)}` : ''}
                          </span>
                        )}
                      </div>

                      <p className="text-base font-semibold text-primary mt-2">{role.position}</p>
                      {role.location && <p className="text-xs text-muted-foreground mt-1">{role.location}</p>}

                      {role.secondary_positions?.length > 0 && (
                        <div className="mt-3 space-y-1">
                          {role.secondary_positions.map((sp, i) => (
                            <p key={i} className="text-sm text-muted-foreground flex gap-2"><span className="text-primary/60">↳</span> {sp}</p>
                          ))}
                        </div>
                      )}

                      {role.description && <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{role.description}</p>}

                      {role.responsibilities?.length > 0 && (
                        <ul className="mt-4 space-y-2.5">
                          {role.responsibilities.map((r, i) => (
                            <li key={i} className="flex gap-2.5 text-sm text-muted-foreground leading-relaxed"><span className="text-primary shrink-0">•</span> {r}</li>
                          ))}
                        </ul>
                      )}

                      {role.achievements?.length > 0 && (
                        <div className="mt-5 pt-5 border-t border-border/60">
                          <h4 className="text-xs font-mono uppercase tracking-[0.12em] text-primary mb-2.5">Achievements</h4>
                          <ul className="space-y-1.5">
                            {role.achievements.map((a, i) => (
                              <li key={i} className="flex gap-2.5 text-sm text-foreground leading-relaxed"><span className="text-primary shrink-0">—</span> {a}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {role.impact_metrics?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {role.impact_metrics.map((m, i) => (
                            <span key={i} className="text-xs font-mono px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">{m}</span>
                          ))}
                        </div>
                      )}

                      {role.skills?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-4">{role.skills.map((s, i) => <span key={i} className="skill-tag">{s}</span>)}</div>
                      )}
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>
          ) : (
            <EmptyState title="Add your first leadership role" description="Add entries to src/data/leadership/items/." />
          )}
        </div>
      </section>

      {/* Volunteer Experience */}
      {!loading && volunteer.length > 0 && (
        <section className="px-4 md:px-8 py-16 border-t border-border/50">
          <div className="max-w-5xl mx-auto">
            <SectionHeading eyebrow="Volunteer" title="Giving back" align="left" />
            <div className="grid md:grid-cols-2 gap-5 mt-8">
              {volunteer.map((vol, i) => (
                <motion.div key={vol.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="glass-card p-6">
                  <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
                    <div>
                      <h4 className="font-display font-semibold text-lg text-foreground">{vol.organization}</h4>
                      {vol.role && <p className="text-sm text-primary font-medium mt-0.5">{vol.role}</p>}
                    </div>
                    {vol.is_current && <span className="px-2.5 py-0.5 rounded-full text-xs bg-emerald-500/15 text-emerald-500">Current</span>}
                  </div>
                  <p className="text-xs font-mono text-muted-foreground">
                    {formatDate(vol.start_date)}{vol.is_current ? ' – Present' : vol.end_date ? ` – ${formatDate(vol.end_date)}` : ''}
                    {vol.hours ? ` · ${vol.hours} hrs` : ''}
                  </p>
                  {vol.description && <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{vol.description}</p>}
                  {vol.achievements?.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {vol.achievements.map((a, idx) => <li key={idx} className="flex gap-2 text-sm text-muted-foreground"><span className="text-primary">—</span> {a}</li>)}
                    </ul>
                  )}
                  {vol.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">{vol.tags.map((t, idx) => <span key={idx} className="skill-tag">{t}</span>)}</div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* General Membership */}
      {!loading && memberships.length > 0 && (
        <section className="px-4 md:px-8 py-16 border-t border-border/50">
          <div className="max-w-5xl mx-auto">
            <SectionHeading eyebrow="General Membership" title="Everywhere else I show up" align="left" />
            <div className="flex flex-wrap gap-2.5 mt-8">
              {memberships.map((mem, i) => (
                <motion.span
                  key={mem.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className="font-mono text-[13px] px-4 py-2 rounded-full bg-surface border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-premium cursor-default"
                >
                  {mem.organization}
                </motion.span>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContinueExploring />
    </motion.div>
  );
}