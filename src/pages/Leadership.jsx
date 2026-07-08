import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import SectionHeading from '@/components/SectionHeading';
import EmptyState from '@/components/EmptyState';
import ContinueExploring from '@/components/ContinueExploring';

export default function Leadership() {
  const [roles, setRoles] = useState([]);
  const [volunteer, setVolunteer] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [roleData, volData, memData] = await Promise.all([
          base44.entities.LeadershipRole.filter({ status: 'published' }, 'order', 100).catch(() => []),
          base44.entities.VolunteerWork.filter({ status: 'published' }, 'order', 100).catch(() => []),
          base44.entities.GeneralMembership.filter({ status: 'published' }, 'order', 100).catch(() => []),
        ]);
        setRoles(roleData);
        setVolunteer(volData);
        setMemberships(memData);
      } catch (e) { console.error(e); }
      setLoading(false);
    })();
  }, []);

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
          {loading ? (
            <div className="space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="h-40 rounded-2xl shimmer" />)}</div>
          ) : roles.length > 0 ? (
            <div className="space-y-5">
              {Object.entries(grouped).map(([org, orgRoles], idx) => (
                <motion.div
                  key={org}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                  className="glass-card p-6 md:p-8"
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
                    <div>
                      {orgRoles[0]?.role_title && (
                        <span className="inline-block text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-2">{orgRoles[0].role_title}</span>
                      )}
                      <h3 className="font-display font-semibold text-xl md:text-2xl text-foreground">{org}</h3>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground whitespace-nowrap pt-1">
                      {formatDate(orgRoles[0]?.start_date)}{orgRoles[0]?.is_current ? ' – Present' : orgRoles[0]?.end_date ? ` – ${formatDate(orgRoles[0].end_date)}` : ''}
                    </span>
                  </div>
                  <div className="space-y-4">
                    {orgRoles.map((role, i) => (
                      <div key={role.id} className="pl-4 border-l-2 border-border">
                        <p className="text-sm font-semibold text-foreground">{role.role_title}</p>
                        {role.description && <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{role.description}</p>}
                        {role.achievements?.length > 0 && (
                          <ul className="mt-2 space-y-1">
                            {role.achievements.map((a, idx) => <li key={idx} className="flex gap-2 text-sm text-muted-foreground"><span className="text-primary">—</span> {a}</li>)}
                          </ul>
                        )}
                        {role.skills?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3">{role.skills.map((s, idx) => <span key={idx} className="skill-tag">{s}</span>)}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <EmptyState title="Add your first leadership role" description="Your leadership positions will appear here once added from the admin dashboard." />
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