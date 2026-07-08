import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Star, Award } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import EmptyState from '@/components/EmptyState';
import ContinueExploring from '@/components/ContinueExploring';

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [awards, setAwards] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { settings } = useSiteSettings();

  useEffect(() => {
    (async () => {
      try {
        const [exp, edu, awd, cert] = await Promise.all([
          base44.entities.Experience.filter({ status: 'published', type: 'Work' }, 'order', 100).catch(() => []),
          base44.entities.Education.filter({ status: 'published' }, 'order', 100).catch(() => []),
          base44.entities.Award.filter({ status: 'published' }, 'order', 100).catch(() => []),
          base44.entities.Certification.filter({ status: 'published' }, 'order', 100).catch(() => []),
        ]);
        setExperiences(exp);
        setEducation(edu);
        setAwards(awd);
        setCertifications(cert);
      } catch (e) { console.error(e); }
      setLoading(false);
    })();
  }, []);

  const formatDate = (dateStr) => dateStr ? new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '';

  const resumeUrl = settings?.resume_pdf_url;

  // Group certifications by issuer
  const certGroups = certifications.reduce((acc, cert) => {
    const group = cert.issuer || 'Other';
    if (!acc[group]) acc[group] = [];
    acc[group].push(cert);
    return acc;
  }, {});

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
              The digital <span className="text-gradient">résumé</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-xl text-[15px] leading-relaxed">
              Work history, education, awards, and certifications — everything from the paper version, built for scrolling instead of scanning.
            </p>
          </div>
          {resumeUrl && (
            <a href={resumeUrl} download className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-premium glow-primary">
              <Download className="w-4 h-4" /> Download PDF
            </a>
          )}
        </div>
      </section>

      {loading ? (
        <div className="px-4 md:px-8 max-w-5xl mx-auto space-y-4 pb-20">
          {[...Array(4)].map((_, i) => <div key={i} className="h-40 rounded-2xl shimmer" />)}
        </div>
      ) : (
        <>
          {/* Work Experience Timeline */}
          {experiences.length > 0 && (
            <section className="px-4 md:px-8 py-12">
              <div className="max-w-5xl mx-auto">
                <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-primary mb-6">
                  <span className="w-4 h-px bg-primary" /> Work Experience
                </span>
                <div className="relative pl-8">
                  <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-primary to-transparent" />
                  <div className="space-y-8">
                    {experiences.map((exp, i) => (
                      <motion.div key={exp.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="relative">
                        <div className="absolute -left-8 top-1.5 w-3 h-3 rounded-full bg-background border-2 border-primary shadow-[0_0_0_4px_hsl(var(--primary)/0.14)]" />
                        <h3 className="font-display font-semibold text-lg text-foreground">{exp.role_title}</h3>
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

          {/* Education Timeline */}
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
            <section className="px-4 md:px-8 py-12 border-t border-border/50 pb-20">
              <div className="max-w-5xl mx-auto">
                <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-primary mb-6">
                  <span className="w-4 h-px bg-primary" /> Certifications
                </span>
                <div className="space-y-6">
                  {Object.entries(certGroups).map(([group, certs]) => (
                    <div key={group}>
                      <h4 className="text-xs font-mono uppercase tracking-[0.08em] text-muted-foreground mb-3">{group}</h4>
                      <div className="grid sm:grid-cols-2 gap-2.5">
                        {certs.map((cert, i) => (
                          <motion.div key={cert.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-border bg-surface">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <Award className="w-4 h-4 text-primary flex-shrink-0" />
                              <span className="text-sm text-muted-foreground truncate">{cert.title}</span>
                            </div>
                            {cert.issue_date && <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">{new Date(cert.issue_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</span>}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {experiences.length === 0 && education.length === 0 && awards.length === 0 && certifications.length === 0 && (
            <div className="px-4 md:px-8 max-w-5xl mx-auto pb-20">
              <EmptyState title="Your experience will appear here" description="Add work experience, education, awards, and certifications from the admin dashboard." />
            </div>
          )}
        </>
      )}

      <ContinueExploring />
    </motion.div>
  );
}