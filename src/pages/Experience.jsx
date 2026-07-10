import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Download, Star, Award } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import EmptyState from '@/components/EmptyState';
import ContinueExploring from '@/components/ContinueExploring';
import SectionHeading from '@/components/SectionHeading';
import { experience as experienceData } from '@/data/experience';
import { leadership as leadershipData } from '@/data/leadership';
import { volunteerWork as volunteerData } from '@/data/volunteerWork';
import { education as educationData } from '@/data/education';
import { awards as awardsData } from '@/data/awards';
import { certifications as certificationsData } from '@/data/certifications';
import { memberships as membershipsData } from '@/data/memberships';

const formatDate = (dateStr) => dateStr ? new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '';

export default function Experience() {
  const experiences = [...experienceData].filter((e) => e.type === 'Work').sort((a, b) => a.order - b.order);
  const leadership = [...leadershipData].sort((a, b) => a.order - b.order);
  const volunteer = [...volunteerData].sort((a, b) => (a.order || 0) - (b.order || 0));
  const education = [...educationData].sort((a, b) => a.order - b.order);
  const awards = [...awardsData].sort((a, b) => a.order - b.order);
  const certifications = [...certificationsData].sort((a, b) => a.order - b.order);
  const allMemberships = [...membershipsData].sort((a, b) => a.order - b.order);
  const participatedIn = allMemberships.filter((m) => m.category === 'Participated In');
  const generalMembership = allMemberships.filter((m) => m.category !== 'Participated In');
  const { settings } = useSiteSettings();
  const resumeUrl = settings?.resume_pdf_url;

  // Executive Positions — a scannable index derived from experience + leadership,
  // rather than a separately-maintained list (avoids a duplicate data source).
  const executivePositions = [
    ...experiences.map((e) => ({ title: e.role_title, org: e.organization })),
    ...leadership.flatMap((l) => [
      { title: l.position, org: l.organization },
      ...(l.secondary_positions || []).map((sp) => ({ title: sp, org: l.organization })),
    ]),
  ].filter((p) => p.title);

  // Community Involvement — a small aggregate pulled from data already stored
  // elsewhere (education achievements, leadership impact_metrics), not a new database.
  const communityStats = [
    { label: 'Volunteer Hours', value: '500+', source: 'High school volunteer record' },
    { label: 'Students Reached', value: '300+', source: 'Superposition Toronto & WolfHacks outreach' },
    { label: 'Community Contacts', value: '200+', source: 'WolfHacks / STAC outreach' },
    { label: 'Library Service Hours', value: '93+', source: 'Brampton Library' },
  ];

  // Certifications grouped by issuer, nested by parent certificate (mirrors Certifications page)
  const topLevelCerts = certifications.filter((c) => !c.parent_certification);
  const certChildren = certifications.reduce((acc, c) => {
    if (c.parent_certification) (acc[c.parent_certification] ||= []).push(c);
    return acc;
  }, {});
  const certGroups = topLevelCerts.reduce((acc, cert) => {
    const group = cert.issuer || 'Other';
    (acc[group] ||= []).push(cert);
    return acc;
  }, {});

  const hasAnything = experiences.length || leadership.length || volunteer.length || education.length || awards.length || certifications.length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {/* Page Hero */}
      <section className="px-4 md:px-8 pt-12 pb-10">
        <div className="max-w-5xl mx-auto flex items-end justify-between gap-6 flex-wrap">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-primary">
              <span className="w-4 h-px bg-primary" /> Experience
            </span>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground leading-tight mt-4">
              The complete <span className="text-gradient">record</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-xl text-[15px] leading-relaxed">
              Professional work, leadership, volunteering, education, awards, and certifications — everything from the paper résumé, built for scrolling instead of scanning.
            </p>
          </div>
          {resumeUrl && (
            <a href={resumeUrl} download className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-premium glow-primary">
              <Download className="w-4 h-4" /> Download PDF
            </a>
          )}
        </div>
      </section>

      {!hasAnything ? (
        <div className="px-4 md:px-8 max-w-5xl mx-auto pb-20">
          <EmptyState title="Your experience will appear here" description="Add entries under src/data/experience/, leadership/, education.js, awards/, and certifications/." />
        </div>
      ) : (
        <>
          {/* Professional Experience */}
          {experiences.length > 0 && (
            <section className="px-4 md:px-8 py-12">
              <div className="max-w-5xl mx-auto">
                <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-primary mb-6">
                  <span className="w-4 h-px bg-primary" /> Professional Experience
                </span>
                <div className="relative pl-8">
                  <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-primary to-transparent" />
                  <div className="space-y-8">
                    {experiences.map((exp, i) => (
                      <motion.div key={exp.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="relative">
                        <div className="absolute -left-8 top-1.5 w-3 h-3 rounded-full bg-background border-2 border-primary shadow-[0_0_0_4px_hsl(var(--primary)/0.14)]" />
                        <h3 className="font-display font-semibold text-lg text-foreground">
                          <Link to={`/experience/${exp.id}`} className="hover:text-primary transition-premium">{exp.role_title}</Link>
                        </h3>
                        <p className="text-sm text-primary font-mono mt-0.5">{exp.organization}{exp.location ? ` — ${exp.location}` : ''}</p>
                        <p className="text-xs font-mono text-muted-foreground mt-1">
                          {formatDate(exp.start_date)}{exp.is_current ? ' – Present' : exp.end_date ? ` – ${formatDate(exp.end_date)}` : ''}
                        </p>
                        {exp.description && <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{exp.description}</p>}
                        {exp.achievements?.length > 0 && (
                          <ul className="mt-3 space-y-1.5">
                            {exp.achievements.map((a, idx) => <li key={idx} className="flex gap-2 text-sm text-muted-foreground"><span className="text-muted-foreground/50">—</span> {a}</li>)}
                          </ul>
                        )}
                        {exp.skills?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3">{exp.skills.map((s, idx) => <span key={idx} className="skill-tag">{s}</span>)}</div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Leadership Experience — full executive-portfolio detail */}
          {leadership.length > 0 && (
            <section className="px-4 md:px-8 py-12 border-t border-border/50">
              <div className="max-w-5xl mx-auto">
                <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-primary mb-6">
                  <span className="w-4 h-px bg-primary" /> Leadership Experience
                </span>
                <div className="space-y-6">
                  {leadership.map((role, idx) => (
                    <motion.div
                      key={role.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ delay: idx * 0.04, duration: 0.5 }}
                      className="glass-card p-6 md:p-10"
                    >
                      <div className="flex items-start justify-between gap-4 flex-wrap mb-1">
                        <Link to={`/experience/${role.id}`} className="font-display font-semibold text-xl md:text-2xl text-foreground hover:text-primary transition-premium">{role.organization}</Link>
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
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Volunteer Experience */}
          <section className="px-4 md:px-8 py-12 border-t border-border/50">
            <div className="max-w-5xl mx-auto">
              <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-primary mb-6">
                <span className="w-4 h-px bg-primary" /> Volunteer Experience
              </span>
              {volunteer.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-5">
                  {volunteer.map((vol, i) => (
                    <motion.div key={vol.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="glass-card p-6">
                      <h4 className="font-display font-semibold text-lg text-foreground">{vol.organization}</h4>
                      {vol.role && <p className="text-sm text-primary font-medium mt-0.5">{vol.role}</p>}
                      {vol.description && <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{vol.description}</p>}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Additional volunteer roles beyond those already listed under Leadership Experience (e.g. Brampton Library) will appear here — add entries to <code>src/data/volunteerWork.js</code>.
                </p>
              )}
            </div>
          </section>

          {/* Executive Positions — scannable index */}
          {executivePositions.length > 0 && (
            <section className="px-4 md:px-8 py-12 border-t border-border/50">
              <div className="max-w-5xl mx-auto">
                <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-primary mb-6">
                  <span className="w-4 h-px bg-primary" /> Executive Positions
                </span>
                <div className="glass-card p-6 md:p-8">
                  <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                    {executivePositions.map((p, i) => (
                      <li key={i} className="flex gap-2 text-sm">
                        <span className="text-primary shrink-0">▹</span>
                        <span><span className="text-foreground font-medium">{p.org}</span> <span className="text-muted-foreground">— {p.title}</span></span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* Community Involvement */}
          <section className="px-4 md:px-8 py-12 border-t border-border/50">
            <div className="max-w-5xl mx-auto">
              <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-primary mb-6">
                <span className="w-4 h-px bg-primary" /> Community Involvement
              </span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {communityStats.map((stat, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass-card p-5 text-center">
                    <p className="font-display font-bold text-2xl md:text-3xl text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Education */}
          {education.length > 0 && (
            <section className="px-4 md:px-8 py-12 border-t border-border/50">
              <div className="max-w-5xl mx-auto">
                <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-primary mb-6">
                  <span className="w-4 h-px bg-primary" /> Education
                </span>
                <div className="relative pl-8">
                  <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-primary to-transparent" />
                  <div className="space-y-8">
                    {education.map((edu, i) => (
                      <motion.div key={edu.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="relative">
                        <div className="absolute -left-8 top-1.5 w-3 h-3 rounded-full bg-background border-2 border-primary shadow-[0_0_0_4px_hsl(var(--primary)/0.14)]" />
                        <h3 className="font-display font-semibold text-lg text-foreground">{edu.institution}</h3>
                        {(edu.degree || edu.field_of_study) && <p className="text-sm text-primary font-mono mt-0.5">{[edu.degree, edu.field_of_study].filter(Boolean).join(' · ')}</p>}
                        <p className="text-xs font-mono text-muted-foreground mt-1">
                          {formatDate(edu.start_date)}{edu.is_current ? ' – Present' : edu.end_date ? ` – ${formatDate(edu.end_date)}` : ''}
                          {edu.gpa ? ` · GPA: ${edu.gpa}` : ''}
                        </p>
                        {edu.description && <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{edu.description}</p>}
                        {edu.achievements?.length > 0 && (
                          <ul className="mt-3 space-y-1.5">
                            {edu.achievements.map((a, idx) => <li key={idx} className="flex gap-2 text-sm text-muted-foreground"><span className="text-muted-foreground/50">—</span> {a}</li>)}
                          </ul>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Awards */}
          {awards.length > 0 && (
            <section className="px-4 md:px-8 py-12 border-t border-border/50">
              <div className="max-w-5xl mx-auto">
                <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-primary mb-6">
                  <span className="w-4 h-px bg-primary" /> Awards
                </span>
                <div className="glass-card p-6 md:p-8">
                  {awards.map((award, i) => (
                    <motion.div key={award.id} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="flex gap-3 items-start py-3 border-b border-border last:border-0">
                      <Star className="w-4 h-4 text-amber-400 flex-shrink-0 mt-1 fill-amber-400" />
                      <div>
                        <p className="text-sm text-foreground font-medium">{award.title}</p>
                        {(award.organization || award.date) && <p className="text-xs font-mono text-muted-foreground mt-0.5">{[award.organization, award.date ? new Date(award.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : null].filter(Boolean).join(' · ')}</p>}
                        {award.description && <p className="text-sm text-muted-foreground mt-1">{award.description}</p>}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section className="px-4 md:px-8 py-12 border-t border-border/50">
              <div className="max-w-5xl mx-auto">
                <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-primary mb-6">
                  <span className="w-4 h-px bg-primary" /> Certifications
                </span>
                <div className="space-y-6">
                  {Object.entries(certGroups).map(([group, certs]) => (
                    <div key={group}>
                      <h4 className="text-xs font-mono uppercase tracking-[0.08em] text-muted-foreground mb-3">{group}</h4>
                      <div className="grid sm:grid-cols-2 gap-2.5">
                        {certs.map((cert, i) => {
                          const children = certChildren[cert.title] || [];
                          return (
                            <motion.div key={cert.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="p-3.5 rounded-xl border border-border bg-surface">
                              <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <Award className="w-4 h-4 text-primary flex-shrink-0" />
                                  <span className="text-sm text-muted-foreground truncate">{cert.title}</span>
                                </div>
                                {cert.issue_date && <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">{new Date(cert.issue_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</span>}
                              </div>
                              {children.length > 0 && (
                                <p className="text-xs text-muted-foreground/70 mt-1.5 pl-6">+{children.length} module certificate{children.length > 1 ? 's' : ''}</p>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Participated In */}
          {participatedIn.length > 0 && (
            <section className="px-4 md:px-8 py-12 border-t border-border/50">
              <div className="max-w-5xl mx-auto">
                <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-primary mb-6">
                  <span className="w-4 h-px bg-primary" /> Participated In
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {participatedIn.map((p, i) => (
                    <motion.span key={p.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="text-sm px-4 py-2 rounded-full bg-surface border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-premium cursor-default">
                      {p.organization}
                    </motion.span>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* General Membership */}
          {generalMembership.length > 0 && (
            <section className="px-4 md:px-8 py-12 border-t border-border/50 pb-20">
              <div className="max-w-5xl mx-auto">
                <SectionHeading eyebrow="General Membership" title="Everywhere else I show up" align="left" />
                <div className="flex flex-wrap gap-2.5 mt-8">
                  {generalMembership.map((mem, i) => (
                    <motion.span key={mem.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="font-mono text-[13px] px-4 py-2 rounded-full bg-surface border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-premium cursor-default">
                      {mem.organization}
                    </motion.span>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      <ContinueExploring />
    </motion.div>
  );
}
