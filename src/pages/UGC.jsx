import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Play, TrendingUp, Mail, FileDown, Star, ArrowRight } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import SectionHeading from '@/components/SectionHeading';
import EmptyState from '@/components/EmptyState';
import ContinueExploring from '@/components/ContinueExploring';
import { ugc as ugcData } from '@/data/ugc';
import { testimonials as testimonialsData } from '@/data/testimonials';

const categories = ['All', 'Brand Partnership', 'Creator Campaign', 'TikTok', 'Instagram', 'Reels', 'Product Photography', 'UGC', 'Other'];

export default function UGC() {
  const items = ugcData;
  const testimonials = testimonialsData;
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const { settings } = useSiteSettings();

  const filtered = filter === 'All' ? items : items.filter((i) => i.category === filter);

  // Aggregate analytics
  const allMetrics = items.flatMap((i) => i.metrics || []);
  const totalCampaigns = items.length;
  const featuredCount = items.filter((i) => i.featured).length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {/* Hero */}
      <section className="px-4 md:px-8 pt-12 pb-10">
        <div className="max-w-7xl mx-auto">
          <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-primary">
            <span className="w-4 h-px bg-primary" /> Creator Portfolio
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="font-display font-bold text-4xl md:text-6xl text-foreground leading-tight mt-4 max-w-3xl">
            UGC & Brand <span className="text-gradient">Campaigns</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-muted-foreground mt-4 max-w-xl text-[15px] leading-relaxed">
            Brand partnerships, creator campaigns, and content across TikTok, Instagram, and beyond. Authentic storytelling that converts.
          </motion.p>
        </div>
      </section>

      {/* Analytics Overview */}
      {items.length > 0 && (
        <section className="px-4 md:px-8 pb-10">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-5 text-center">
              <p className="text-3xl font-display font-bold text-gradient">{totalCampaigns}</p>
              <p className="text-xs text-muted-foreground mt-1">Total Campaigns</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="glass-card p-5 text-center">
              <p className="text-3xl font-display font-bold text-gradient">{featuredCount}</p>
              <p className="text-xs text-muted-foreground mt-1">Featured</p>
            </motion.div>
            {allMetrics.slice(0, 2).map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.05 }} className="glass-card p-5 text-center">
                <p className="text-3xl font-display font-bold text-gradient">{m.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Campaign Grid */}
      <section className="px-4 md:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {items.length > 0 && (
            <div className="flex gap-2 mb-10 overflow-x-auto scrollbar-hide pb-2">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-premium ${filter === cat ? 'bg-primary text-primary-foreground' : 'glass text-muted-foreground hover:text-foreground'}`}>{cat}</button>
              ))}
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="py-12"><EmptyState title="Your first campaign will appear here" description="Add entries to src/data/ugc.js to showcase brand partnerships and creator campaigns." /></div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item, i) => (
                <motion.button key={item.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: i * 0.06 }} onClick={() => setLightbox(item)} className="glass-card overflow-hidden text-left group">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    {item.cover_image ? (
                      <img src={item.cover_image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full bg-gradient-soft flex items-center justify-center text-muted-foreground/30"><Play className="w-10 h-10" /></div>
                    )}
                    {item.video_url && <div className="absolute top-3 right-3 w-9 h-9 rounded-full glass-strong flex items-center justify-center text-foreground"><Play className="w-4 h-4" /></div>}
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium glass-strong text-foreground">{item.category}</span>
                      {item.platform && <span className="px-2.5 py-1 rounded-full text-xs font-medium glass-strong text-foreground">{item.platform}</span>}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-premium">{item.title}</h3>
                    {(item.brand || item.campaign) && <p className="text-sm text-muted-foreground">{[item.brand, item.campaign].filter(Boolean).join(' · ')}</p>}
                    {item.metrics && item.metrics.length > 0 && (
                      <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-border">
                        {item.metrics.slice(0, 3).map((m, idx) => (
                          <div key={idx}><p className="text-sm font-bold text-foreground">{m.value}</p><p className="text-xs text-muted-foreground">{m.label}</p></div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="px-4 md:px-8 py-16 border-t border-border/50">
          <div className="max-w-7xl mx-auto">
            <SectionHeading eyebrow="Testimonials" title="What brands say" align="left" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
              {testimonials.map((t, i) => (
                <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="glass-card p-6">
                  <div className="flex gap-1 mb-3">{[...Array(5)].map((_, idx) => <Star key={idx} className={`w-3.5 h-3.5 ${idx < (t.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`} />)}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">&ldquo;{t.content}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    {t.avatar_url && <img src={t.avatar_url} alt={t.author_name} className="w-8 h-8 rounded-full object-cover" />}
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.author_name}</p>
                      {(t.author_role || t.author_organization) && <p className="text-xs text-muted-foreground">{[t.author_role, t.author_organization].filter(Boolean).join(' · ')}</p>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Media Kit + Rate Card + Contact CTA */}
      <section className="px-4 md:px-8 py-16 border-t border-border/50">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="glass-card p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">Let's work together</h2>
              <p className="text-muted-foreground max-w-md mx-auto text-sm">Interested in collaborating? Download my media kit for audience demographics, past performance, and partnership options.</p>
            </div>
            <div className="flex gap-3 justify-center flex-wrap">
              {settings?.resume_pdf_url && (
                <a href={settings.resume_pdf_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm glass text-foreground hover:border-primary/30 transition-premium">
                  <FileDown className="w-4 h-4" /> Media Kit
                </a>
              )}
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-premium group glow-primary">
                Get In Touch <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md" onClick={() => setLightbox(null)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-surface-elevated rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide border border-border shadow-soft" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              {lightbox.cover_image && <img src={lightbox.cover_image} alt={lightbox.title} className="w-full max-h-[50vh] object-cover rounded-t-2xl" />}
              <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 w-9 h-9 rounded-full glass-strong flex items-center justify-center text-foreground hover:text-primary transition-premium">✕</button>
            </div>
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/15 text-primary">{lightbox.category}</span>
                {lightbox.platform && <span className="px-3 py-1 rounded-full text-xs font-medium glass text-muted-foreground">{lightbox.platform}</span>}
              </div>
              <h2 className="font-display font-bold text-2xl text-foreground mb-2">{lightbox.title}</h2>
              {(lightbox.brand || lightbox.campaign) && <p className="text-sm text-muted-foreground mb-4">{[lightbox.brand, lightbox.campaign].filter(Boolean).join(' · ')}</p>}
              {lightbox.description && <p className="text-muted-foreground leading-relaxed mb-6 whitespace-pre-wrap">{lightbox.description}</p>}
              {lightbox.deliverables && lightbox.deliverables.length > 0 && (
                <div className="mb-6"><p className="text-sm font-semibold text-foreground mb-2">Deliverables</p><div className="flex flex-wrap gap-2">{lightbox.deliverables.map((d, i) => <span key={i} className="skill-tag">{d}</span>)}</div></div>
              )}
              {lightbox.metrics && lightbox.metrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  {lightbox.metrics.map((m, i) => (
                    <div key={i} className="text-center p-4 rounded-xl glass"><p className="text-2xl font-display font-bold text-gradient">{m.value}</p><p className="text-xs text-muted-foreground mt-1">{m.label}</p></div>
                  ))}
                </div>
              )}
              {lightbox.video_url && (
                <a href={lightbox.video_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-premium"><Play className="w-4 h-4" /> Watch Video</a>
              )}
              {lightbox.gallery && lightbox.gallery.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">{lightbox.gallery.map((img, i) => <img key={i} src={img} alt="" className="w-full aspect-square object-cover rounded-xl" />)}</div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      <ContinueExploring />
    </motion.div>
  );
}