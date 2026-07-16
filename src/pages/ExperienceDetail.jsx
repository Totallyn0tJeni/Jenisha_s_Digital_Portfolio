import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Briefcase, Calendar, ArrowUpRight } from 'lucide-react';
import EmptyState from '@/components/EmptyState';
import OrganizationLink from '@/components/OrganizationLink';
import RelatedContentSection from '@/components/RelatedContentSection';
import { getRoleById, allRoles } from '@/data/experienceRoles';
import { getTimelineEventIdForRole, getTimelineEventById } from '@/data/timelineEvents';
import { resolvePrimaryOrganization } from '@/data/organizations/resolve';
import { work } from '@/data/work';
import { formatMonthYear, sortByRecency } from '@/lib/dateUtils';

const formatDate = formatMonthYear;

// Roles ordered newest-first (current roles lead), shared by both collections — used for Previous/Next navigation.
const orderedRoles = sortByRecency(allRoles);

export default function ExperienceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const role = getRoleById(id);
  const timelineEventId = role ? getTimelineEventIdForRole(role.source, role.id) : null;
  const hasTimelineEntry = timelineEventId && !!getTimelineEventById(timelineEventId);
  const relatedCampaigns = role ? work.filter((w) => w.related_experience_id === role.id) : [];
  const org = role ? resolvePrimaryOrganization(role.organization) : null;

  const roleIndex = role ? orderedRoles.findIndex((r) => r.id === role.id) : -1;
  // orderedRoles is newest-first, so "Previous Role" (chronologically earlier) is the next index.
  const previousRole = roleIndex >= 0 ? orderedRoles[roleIndex + 1] : null;
  const nextRole = roleIndex > 0 ? orderedRoles[roleIndex - 1] : null;

  if (!role) {
    return (
      <div className="px-4 pt-20">
        <EmptyState title="Role not found" description="This role may have been removed or renamed." action={{ label: 'Back to Experience', onClick: () => navigate('/experience') }} />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <article className="px-4 md:px-8 pt-12 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-8">
            <Link to="/experience" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-premium">
              <ArrowLeft className="w-4 h-4" /> Back to Experience
            </Link>
            {hasTimelineEntry && (
              <Link to={`/timeline?highlight=${timelineEventId}`} className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-premium">
                <Calendar className="w-4 h-4" /> View in Timeline
              </Link>
            )}
            {org && (
              <Link to={`/organizations/${org.id}`} className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-premium">
                View Organization
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-semibold capitalize bg-primary/15 text-primary">
              {role.source === 'experience' ? 'Professional Experience' : 'Leadership'}
            </span>
            {(role.start_date || role.end_date) && (
              <time className="text-sm text-muted-foreground">
                {formatDate(role.start_date)}{role.is_current ? ' – Present' : role.end_date ? ` – ${formatDate(role.end_date)}` : ''}
              </time>
            )}
          </div>

          <h1 className="font-display font-bold text-4xl md:text-6xl text-foreground leading-tight mb-3">{role.title}</h1>
          <OrganizationLink organization={role.organization} className="text-xl text-primary font-medium mb-2 inline-block" />
          {role.location && <p className="text-sm text-muted-foreground mb-8">{role.location}</p>}

          {role.secondary_positions?.length > 0 && (
            <div className="mb-8 space-y-1">
              {role.secondary_positions.map((sp, i) => (
                <p key={i} className="text-sm text-muted-foreground flex gap-2"><span className="text-primary/60">↳</span> {sp}</p>
              ))}
            </div>
          )}

          <div className="rounded-2xl overflow-hidden glass-card mb-12 aspect-[21/9] flex items-center justify-center bg-gradient-soft">
            <Briefcase className="w-10 h-10 text-primary/40" />
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              {role.description && (
                <div>
                  <h2 className="font-display font-semibold text-xl text-foreground mb-3">Overview</h2>
                  <p className="text-muted-foreground leading-relaxed">{role.description}</p>
                </div>
              )}

              {role.responsibilities?.length > 0 && (
                <div>
                  <h2 className="font-display font-semibold text-xl text-foreground mb-3">Responsibilities</h2>
                  <ul className="space-y-2.5">
                    {role.responsibilities.map((r, i) => (
                      <li key={i} className="flex gap-2.5 text-muted-foreground leading-relaxed"><span className="text-primary shrink-0">•</span> {r}</li>
                    ))}
                  </ul>
                </div>
              )}

              {role.achievements?.length > 0 && (
                <div>
                  <h2 className="font-display font-semibold text-xl text-foreground mb-3">Achievements</h2>
                  <ul className="space-y-2.5">
                    {role.achievements.map((a, i) => (
                      <li key={i} className="flex gap-2.5 text-muted-foreground leading-relaxed"><span className="text-primary shrink-0">—</span> {a}</li>
                    ))}
                  </ul>
                </div>
              )}

              {role.media?.length > 0 && (
                <div>
                  <h2 className="font-display font-semibold text-xl text-foreground mb-3">Media</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {role.media.map((img, i) => (
                      <div key={i} className="aspect-square rounded-xl overflow-hidden glass-card">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {role.documents?.length > 0 && (
                <div>
                  <h2 className="font-display font-semibold text-xl text-foreground mb-3">Documents</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {role.documents.map((d, i) => (
                      <a key={i} href={d.url} target="_blank" rel="noopener noreferrer" className="glass-card p-4 flex items-center gap-3 hover:border-primary/30 transition-premium text-sm text-foreground">
                        {d.title || 'View document'}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="space-y-6">
              {relatedCampaigns.length > 0 && (
                <div className="glass-card p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Related Marketing Campaigns</h3>
                  <div className="space-y-2">
                    {relatedCampaigns.map((c) => (
                      <Link key={c.id} to={`/work/${c.slug || c.id}`} className="flex items-center justify-between gap-2 text-sm text-muted-foreground hover:text-primary transition-premium group">
                        <span>{c.title}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 shrink-0 opacity-60 group-hover:opacity-100" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {role.impact_metrics?.length > 0 && (
                <div className="glass-card p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Impact</h3>
                  <div className="flex flex-wrap gap-2">
                    {role.impact_metrics.map((m, i) => (
                      <span key={i} className="text-xs font-mono px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">{m}</span>
                    ))}
                  </div>
                </div>
              )}
              {role.skills?.length > 0 && (
                <div className="glass-card p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Skills & Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {role.skills.map((s, i) => <span key={i} className="skill-tag">{s}</span>)}
                  </div>
                </div>
              )}
            </aside>
          </div>

          <div className="mt-16 pt-10 border-t border-border">
            <RelatedContentSection typeKey={role.source} id={role.id} />
          </div>

          <div className="mt-16 pt-8 border-t border-border grid sm:grid-cols-2 gap-4">
            {previousRole ? (
              <Link to={`/experience/${previousRole.id}`} className="glass-card p-5 flex items-center gap-3 hover:border-primary/30 transition-premium group">
                <ArrowLeft className="w-4 h-4 shrink-0 text-muted-foreground group-hover:text-primary transition-premium" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground mb-0.5">Previous Role</p>
                  <p className="text-sm font-medium text-foreground truncate">{previousRole.title} — {previousRole.organization}</p>
                </div>
              </Link>
            ) : <div />}
            {nextRole ? (
              <Link to={`/experience/${nextRole.id}`} className="glass-card p-5 flex items-center justify-end gap-3 text-right hover:border-primary/30 transition-premium group">
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground mb-0.5">Next Role</p>
                  <p className="text-sm font-medium text-foreground truncate">{nextRole.title} — {nextRole.organization}</p>
                </div>
                <ArrowRight className="w-4 h-4 shrink-0 text-muted-foreground group-hover:text-primary transition-premium" />
              </Link>
            ) : <div />}
          </div>
        </div>
      </article>
    </motion.div>
  );
}
