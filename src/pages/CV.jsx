import { motion } from 'framer-motion';
import { Printer, FileDown } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { education } from '@/data/education';
import { experience } from '@/data/experience';
import { leadership } from '@/data/leadership';
import { awards } from '@/data/awards';
import { certifications } from '@/data/certifications';
import { skills } from '@/data/skills';
import { resumeFiles } from '@/data/resume';

export default function CV() {
  const { settings } = useSiteSettings();
  const skillsByCategory = skills.reduce((acc, s) => {
    (acc[s.category] ||= []).push(s.name);
    return acc;
  }, {});

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <section className="px-4 md:px-8 pt-12 pb-20 print:pt-0">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8 print:hidden">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">Curriculum Vitae</h1>
              <p className="text-muted-foreground text-sm mt-1">A single-page summary — printable, or grab the full PDF resume.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => window.print()} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold glass hover:border-primary/30 transition-premium">
                <Printer className="w-4 h-4" /> Print
              </button>
              {resumeFiles?.active?.url && (
                <a href={resumeFiles.active.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-premium">
                  <FileDown className="w-4 h-4" /> PDF
                </a>
              )}
            </div>
          </div>

          <div className="glass-card p-8 md:p-10 print:bg-white print:shadow-none print:border-none space-y-10">
            <header className="text-center border-b border-border pb-6">
              <h2 className="font-display text-2xl font-bold text-foreground">{settings?.site_name}</h2>
              <p className="text-muted-foreground text-sm mt-1">{settings?.tagline}</p>
            </header>

            {experience.length > 0 && (
              <CVSection title="Experience">
                {experience.map((e) => (
                  <CVEntry key={e.id} title={e.role_title} org={e.organization} date={formatRange(e.start_date, e.end_date, e.is_current)}>
                    {e.description}
                  </CVEntry>
                ))}
              </CVSection>
            )}

            {leadership.length > 0 && (
              <CVSection title="Leadership">
                {leadership.map((l) => (
                  <CVEntry key={l.id} title={l.position} org={l.organization} date={formatRange(l.start_date, l.end_date, l.is_current)}>
                    {l.description}
                  </CVEntry>
                ))}
              </CVSection>
            )}

            {education.length > 0 && (
              <CVSection title="Education">
                {education.map((e) => (
                  <CVEntry key={e.id} title={e.degree} org={e.institution} date={formatRange(e.start_date, e.end_date, e.is_current)}>
                    {e.field_of_study}
                  </CVEntry>
                ))}
              </CVSection>
            )}

            {Object.keys(skillsByCategory).length > 0 && (
              <CVSection title="Skills">
                <div className="space-y-2">
                  {Object.entries(skillsByCategory).map(([cat, names]) => (
                    <p key={cat} className="text-sm"><span className="font-semibold text-foreground">{cat}: </span><span className="text-muted-foreground">{names.join(', ')}</span></p>
                  ))}
                </div>
              </CVSection>
            )}

            {certifications.length > 0 && (
              <CVSection title="Certifications">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {certifications.map((c) => c.title).join(' · ')}
                </p>
              </CVSection>
            )}

            {awards.length > 0 && (
              <CVSection title="Awards & Recognition">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {awards.map((a) => a.title).join(' · ')}
                </p>
              </CVSection>
            )}
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function formatRange(start, end, isCurrent) {
  const fmt = (d) => d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '';
  const s = fmt(start);
  const e = isCurrent ? 'Present' : fmt(end);
  return [s, e].filter(Boolean).join(' – ');
}

function CVSection({ title, children }) {
  return (
    <div>
      <h3 className="text-xs font-mono uppercase tracking-[0.14em] text-primary mb-4">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function CVEntry({ title, org, date, children }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        <p className="font-semibold text-foreground text-sm">{title} {org && <span className="font-normal text-muted-foreground">· {org}</span>}</p>
        {date && <span className="text-xs text-muted-foreground shrink-0">{date}</span>}
      </div>
      {children && <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{children}</p>}
    </div>
  );
}
