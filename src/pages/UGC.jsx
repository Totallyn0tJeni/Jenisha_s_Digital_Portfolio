import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, ChevronDown, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import { ugcSettings } from '@/data/ugcSettings';
import { ugc as ugcData } from '@/data/ugc';

export default function UGC() {
  const s = ugcSettings;
  const items = ugcData;
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {/* Hero */}
      <section className="px-4 md:px-8 pt-12 pb-16 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-primary">
            <span className="w-4 h-px bg-primary" /> UGC Creator
          </span>
          <h1 className="font-display font-bold text-4xl md:text-6xl text-foreground leading-tight mt-4">
            {s.hero_title}
          </h1>
          <p className="text-muted-foreground mt-5 text-lg leading-relaxed max-w-2xl mx-auto">{s.hero_subtitle}</p>
          <Link to="/contact" className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-premium glow-primary">
            Interested in collaborating? <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* About */}
      {s.about && (
        <section className="px-4 md:px-8 pb-16">
          <div className="max-w-3xl mx-auto glass-card p-8 text-center">
            <p className="text-muted-foreground leading-relaxed">{s.about}</p>
          </div>
        </section>
      )}

      {/* Niches */}
      {s.niches?.length > 0 && (
        <section className="px-4 md:px-8 pb-16">
          <div className="max-w-5xl mx-auto">
            <SectionHeading eyebrow="Focus Areas" title="Niches" align="left" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
              {s.niches.map((n, i) => (
                <motion.div key={n.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass-card p-5 text-center">
                  <p className="font-medium text-foreground text-sm">{n.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services */}
      {s.services?.length > 0 && (
        <section className="px-4 md:px-8 pb-16">
          <div className="max-w-5xl mx-auto">
            <SectionHeading eyebrow="What I Offer" title="Services" align="left" />
            <div className="grid md:grid-cols-2 gap-5 mt-8">
              {s.services.map((svc, i) => (
                <motion.div key={svc.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass-card p-6">
                  <h3 className="font-display font-semibold text-foreground">{svc.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{svc.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Portfolio Placeholder */}
      <section className="px-4 md:px-8 pb-16 border-t border-border/50 pt-16">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Previous Work" title="Portfolio" align="left" />
          {items.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
              {items.map((item) => (
                <div key={item.id} className="aspect-[9/16] rounded-2xl overflow-hidden glass-card">
                  {item.cover_image ? <img src={item.cover_image} alt={item.title} className="w-full h-full object-cover" /> : <ImagePlaceholder label={item.title || 'Portfolio Media Coming Soon'} aspect="tall" className="border-0 rounded-none h-full" />}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {[...Array(4)].map((_, i) => <ImagePlaceholder key={i} label="Portfolio Media Coming Soon" aspect="tall" />)}
            </div>
          )}
        </div>
      </section>

      {/* Content Types */}
      {s.content_types?.length > 0 && (
        <section className="px-4 md:px-8 pb-16">
          <div className="max-w-5xl mx-auto">
            <SectionHeading eyebrow="Formats" title="Content types" align="left" />
            <div className="flex flex-wrap gap-2.5 mt-8">
              {s.content_types.map((c) => (
                <span key={c} className="text-sm px-4 py-2 rounded-full bg-surface border border-border text-muted-foreground">{c}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Packages */}
      {s.packages?.length > 0 && (
        <section className="px-4 md:px-8 pb-16 border-t border-border/50 pt-16">
          <div className="max-w-5xl mx-auto">
            <SectionHeading eyebrow="Pricing" title="Packages" align="left" />
            <div className="grid md:grid-cols-3 gap-5 mt-8">
              {s.packages.map((pkg, i) => (
                <motion.div key={pkg.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass-card p-6 flex flex-col">
                  <h3 className="font-display font-bold text-lg text-foreground">{pkg.name}</h3>
                  <p className="text-2xl font-display font-bold text-primary mt-1">{pkg.price || 'Custom quote'}</p>
                  <ul className="mt-4 space-y-2 flex-1">
                    {pkg.features.map((f, idx) => (
                      <li key={idx} className="flex gap-2 text-sm text-muted-foreground"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {f}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Monthly Retainers */}
      {s.retainers?.length > 0 && (
        <section className="px-4 md:px-8 pb-16">
          <div className="max-w-5xl mx-auto">
            <SectionHeading eyebrow="Ongoing" title="Monthly retainers" align="left" />
            <div className="grid sm:grid-cols-2 gap-5 mt-8">
              {s.retainers.map((r) => (
                <div key={r.name} className="glass-card p-6">
                  <h3 className="font-display font-bold text-lg text-foreground">{r.name}</h3>
                  <p className="text-xl font-display font-bold text-primary mt-1">{r.price || 'Custom quote'}</p>
                  <ul className="mt-4 space-y-2">
                    {r.features.map((f, idx) => <li key={idx} className="flex gap-2 text-sm text-muted-foreground"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {f}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Add-ons */}
      {s.addons?.length > 0 && (
        <section className="px-4 md:px-8 pb-16">
          <div className="max-w-5xl mx-auto">
            <SectionHeading eyebrow="Extras" title="Add-ons" align="left" />
            <div className="grid sm:grid-cols-2 gap-3 mt-8">
              {s.addons.map((a) => (
                <div key={a.name} className="glass-card p-4 flex items-center justify-between gap-3">
                  <span className="text-sm text-foreground">{a.name}</span>
                  <span className="text-sm text-primary font-mono">{a.price || 'Quote'}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Usage Rights & Turnaround */}
      {(s.usage_rights || s.turnaround_time) && (
        <section className="px-4 md:px-8 pb-16 border-t border-border/50 pt-16">
          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-5">
            {s.usage_rights && (
              <div className="glass-card p-6">
                <h3 className="font-display font-semibold text-foreground mb-2">Usage Rights</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.usage_rights}</p>
              </div>
            )}
            {s.turnaround_time && (
              <div className="glass-card p-6">
                <h3 className="font-display font-semibold text-foreground mb-2">Turnaround Time</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.turnaround_time}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* FAQ */}
      {s.faq?.length > 0 && (
        <section className="px-4 md:px-8 pb-16">
          <div className="max-w-3xl mx-auto">
            <SectionHeading eyebrow="Questions" title="FAQ" align="left" />
            <div className="mt-8 space-y-2">
              {s.faq.map((item, i) => (
                <div key={i} className="glass-card overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between gap-4 p-5 text-left">
                    <span className="font-medium text-foreground text-sm">{item.question}</span>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{item.answer}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="px-4 md:px-8 pb-20">
        <div className="max-w-3xl mx-auto glass-card p-10 text-center">
          <h2 className="font-display font-bold text-2xl text-foreground">Interested in collaborating?</h2>
          <p className="text-muted-foreground mt-2">Let's talk about your brand and what content would work best.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-premium">
            Get in Touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </motion.div>
  );
}
