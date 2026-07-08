import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Users, Camera, TrendingUp, FileDown } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import ResumeDownload from '@/components/ResumeDownload';
import ContinueExploring from '@/components/ContinueExploring';
import EmptyState from '@/components/EmptyState';

const iconMap = { Search, Users, Camera, TrendingUp };

export default function About() {
  const { settings } = useSiteSettings();
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [edu, sk, mem] = await Promise.all([
          base44.entities.Education.filter({ status: 'published' }, 'order', 50).catch(() => []),
          base44.entities.Skill.filter({ status: 'published' }, 'order', 100).catch(() => []),
          base44.entities.GeneralMembership.filter({ status: 'published' }, 'order', 50).catch(() => []),
        ]);
        setEducation(edu);
        setSkills(sk);
        setMemberships(mem);
      } catch (e) { console.error(e); }
      setLoading(false);
    })();
  }, []);

  const bio = settings?.about_bio || '';
  const bioParagraphs = bio ? bio.split('\n\n').filter(Boolean) : [];
  const quickFacts = settings?.quick_facts || [];
  const principles = settings?.principles || [];
  const portrait = settings?.hero_image_url;

  const skillGroups = skills.reduce((acc, skill) => {
    const cat = skill.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  const formatDate = (dateStr) => dateStr ? new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {/* Editorial Hero */}
      <section className="px-4 md:px-8 pt-16 pb-12">
        <div className="max-w-6xl mx-auto">
          <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-primary">
            <span className="w-4 h-px bg-primary" /> About
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="font-display font-bold text-4xl md:text-6xl text-foreground leading-[1.05] tracking-tight mt-5 max-w-3xl">
            The story behind the <span className="text-gradient">résumé</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-muted-foreground mt-6 max-w-xl text-base md:text-lg leading-relaxed">
            {settings?.about_hero_subtitle || 'A closer look at how a robotics pit, a marketing deck, and a code editor all somehow became the same job.'}
          </motion.p>
        </div>
      </section>

      {/* Bio + Portrait with layered quick facts card */}
      <section className="px-4 md:px-8 py-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-start">
          {/* Bio — editorial left column */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            {bioParagraphs.length > 0 ? (
              <div className="space-y-5">
                {bioParagraphs.map((p, i) => (
                  <p key={i} className={`leading-[1.8] text-foreground ${i === 0 ? 'text-lg md:text-xl font-medium' : 'text-[15px] text-muted-foreground'}`}>{p}</p>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-[15px] leading-relaxed">Your biography will appear here once you add it in Admin → Settings → About Page.</p>
            )}
            <div className="mt-8">
              <ResumeDownload variant="outline" label="Download Résumé" />
            </div>
          </motion.div>

          {/* Portrait + overlapping quick facts card */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
            {portrait ? (
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-border shadow-soft">
                <img src={portrait} alt={settings?.site_name || 'Portrait'} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            ) : (
              <div className="relative aspect-[4/5] rounded-3xl bg-gradient-soft border border-border flex items-center justify-center">
                <span className="font-display font-bold text-6xl text-gradient">{(settings?.site_name || 'JP').split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase()}</span>
              </div>
            )}
            {/* Overlapping quick facts card */}
            {quickFacts.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.5 }} className="absolute -bottom-6 -left-6 md:-left-12 glass-strong rounded-2xl p-5 md:p-6 max-w-[280px] shadow-card">
                <h4 className="text-xs font-mono uppercase tracking-[0.08em] text-muted-foreground mb-4">Quick Facts</h4>
                <div className="space-y-3">
                  {quickFacts.slice(0, 4).map((fact, i) => (
                    <div key={i}>
                      <div className="text-[10px] font-mono text-muted-foreground/70 uppercase tracking-wide mb-0.5">{fact.label}</div>
                      <div className="text-sm text-foreground leading-snug">{fact.value}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Pull Quote */}
      {bioParagraphs.length > 0 && (
        <section className="px-4 md:px-8 py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto text-center">
            <div className="text-6xl text-primary/15 font-display leading-none mb-2">&ldquo;</div>
            <p className="font-display text-2xl md:text-3xl text-foreground leading-tight italic">
              {settings?.about_hero_subtitle || 'Figure out how to make something complicated legible to the people who actually have to use it.'}
            </p>
          </motion.div>
        </section>
      )}

      {/* My Journey — Education Timeline */}
      <section className="px-4 md:px-8 py-16 border-t border-border/50">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-10">
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-primary">
              <span className="w-4 h-px bg-primary" /> My Journey
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mt-3">Four schools. One habit of getting involved.</h2>
          </motion.div>
          {loading ? (
            <div className="space-y-4">{[...Array(4)].map((_, i) => <div key={i} className="h-24 rounded-2xl shimmer" />)}</div>
          ) : education.length > 0 ? (
            <div className="relative pl-8">
              <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-primary to-transparent" />
              <div className="space-y-10">
                {education.map((edu, i) => (
                  <motion.div key={edu.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.5 }} className="relative">
                    <div className="absolute -left-8 top-1.5 w-3 h-3 rounded-full bg-background border-2 border-primary shadow-[0_0_0_4px_hsl(var(--primary)/0.14)]" />
                    <h3 className="font-display font-semibold text-lg text-foreground">{edu.institution}</h3>
                    {(edu.degree || edu.field_of_study) && <p className="text-sm text-primary font-mono mt-0.5">{[edu.degree, edu.field_of_study].filter(Boolean).join(' · ')}</p>}
                    <p className="text-xs font-mono text-muted-foreground mt-1">{formatDate(edu.start_date)}{edu.is_current ? ' – Present' : edu.end_date ? ` – ${formatDate(edu.end_date)}` : ''}</p>
                    {edu.description && <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-2xl">{edu.description}</p>}
                    {edu.achievements?.length > 0 && (
                      <ul className="mt-2 space-y-1">{edu.achievements.map((a, idx) => <li key={idx} className="flex gap-2 text-sm text-muted-foreground"><span className="text-muted-foreground/50">—</span> {a}</li>)}</ul>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <EmptyState title="Your education journey will appear here" description="Add education entries from the admin dashboard." />
          )}
        </div>
      </section>

      {/* How I Work — Principles */}
      {principles.length > 0 && (
        <section className="px-4 md:px-8 py-16 border-t border-border/50">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-10">
              <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-primary"><span className="w-4 h-px bg-primary" /> How I Work</span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mt-3">A few principles I keep coming back to</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {principles.map((p, i) => {
                const Icon = iconMap[p.icon] || Search;
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5 }} className="glass-card p-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4"><Icon className="w-5 h-5 text-primary" /></div>
                    <h3 className="font-display font-semibold text-sm text-foreground mb-2">{p.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{p.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Skills */}
      {!loading && skills.length > 0 && (
        <section className="px-4 md:px-8 py-16 border-t border-border/50">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-10">
              <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-primary"><span className="w-4 h-px bg-primary" /> Skills</span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mt-3">What I actually use</h2>
            </motion.div>
            <div className="glass-card p-6 md:p-8 space-y-6">
              {Object.entries(skillGroups).map(([category, items]) => (
                <div key={category}>
                  <h4 className="text-xs font-mono uppercase tracking-[0.08em] text-muted-foreground mb-3">{category}</h4>
                  <div className="flex flex-wrap gap-2">{items.map((skill, i) => <span key={skill.id || i} className="skill-tag">{skill.name}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Beyond The Résumé */}
      {!loading && memberships.length > 0 && (
        <section className="px-4 md:px-8 py-16 border-t border-border/50">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-10">
              <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-primary"><span className="w-4 h-px bg-primary" /> Beyond The Résumé</span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mt-3">A few things that don't fit in a bullet point</h2>
            </motion.div>
            <div className="flex flex-wrap gap-2.5">
              {memberships.map((mem, i) => (
                <motion.span key={mem.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="font-mono text-[13px] px-4 py-2 rounded-full bg-surface border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-premium cursor-default">{mem.organization}</motion.span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-4 md:px-8 py-16 border-t border-border/50">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="glass-card p-8 md:p-12 text-center">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">Want the full breakdown?</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-6 text-sm">Complete work history, education, awards, and certifications live on the Experience page.</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link to="/experience" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-premium group glow-primary">View Full Experience <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm glass text-foreground hover:border-primary/30 transition-premium">Get In Touch</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <ContinueExploring />
    </motion.div>
  );
}