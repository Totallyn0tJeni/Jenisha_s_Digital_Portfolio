import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import { photos as photosData } from '@/data/photos';
import { photographySettings as ps } from '@/data/photographySettings';

export default function Photography() {
  const photos = photosData;
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const categories = ['All', ...new Set(photos.map((p) => p.category).filter(Boolean))];
  const filtered = filter === 'All' ? photos : photos.filter((p) => p.category === filter);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <section className="px-4 md:px-8 pt-12 pb-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="Visual Storytelling" title="Photography" subtitle="Events, portraits, nature, and the world through my lens." />
        </div>
      </section>

      <section className="px-4 md:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {photos.length > 0 && (
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 mb-8">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-premium ${filter === cat ? 'bg-primary text-primary-foreground' : 'glass text-muted-foreground hover:text-foreground'}`}>
                  {cat}
                </button>
              ))}
            </div>
          )}

          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((photo, i) => (
                <motion.button
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => photo.image_url && setLightbox(photo)}
                  className="aspect-square rounded-2xl overflow-hidden glass-card group cursor-pointer"
                >
                  {photo.image_url ? (
                    <img src={photo.image_url} alt={photo.alt_text || photo.title || ''} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <ImagePlaceholder label={photo.title || 'Portfolio Media Coming Soon'} aspect="square" className="border-0 rounded-none h-full" />
                  )}
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => <ImagePlaceholder key={i} label="Portfolio Media Coming Soon" aspect="square" />)}
            </div>
          )}
        </div>
      </section>

      {/* Services */}
      {ps.services?.length > 0 && (
        <section className="px-4 md:px-8 pb-16 border-t border-border/50 pt-16">
          <div className="max-w-5xl mx-auto">
            <SectionHeading eyebrow="What I Offer" title="Services" align="left" />
            <div className="grid md:grid-cols-2 gap-5 mt-8">
              {ps.services.map((svc, i) => (
                <motion.div key={svc.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass-card p-6">
                  <h3 className="font-display font-semibold text-foreground">{svc.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{svc.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Equipment & Editing Process */}
      {(ps.equipment?.length > 0 || ps.editing_process?.length > 0) && (
        <section className="px-4 md:px-8 pb-16">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            {ps.equipment?.length > 0 && (
              <div>
                <SectionHeading eyebrow="Kit" title="Equipment" align="left" />
                <ul className="mt-6 space-y-2">
                  {ps.equipment.map((e, i) => <li key={i} className="text-sm text-muted-foreground flex gap-2"><span className="text-primary">—</span> {e}</li>)}
                </ul>
              </div>
            )}
            {ps.editing_process?.length > 0 && (
              <div>
                <SectionHeading eyebrow="Process" title="Editing" align="left" />
                <div className="mt-6 space-y-4">
                  {ps.editing_process.map((step) => (
                    <div key={step.step}>
                      <p className="text-sm font-semibold text-foreground">{step.step}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Pricing */}
      {ps.packages?.length > 0 && (
        <section className="px-4 md:px-8 pb-16 border-t border-border/50 pt-16">
          <div className="max-w-5xl mx-auto">
            <SectionHeading eyebrow="Pricing" title="Packages" align="left" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {ps.packages.map((pkg, i) => (
                <motion.div key={pkg.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="glass-card p-5">
                  <h3 className="font-display font-semibold text-foreground">{pkg.name}</h3>
                  <p className="text-lg font-display font-bold text-primary mt-1">{pkg.price || 'Custom quote'}</p>
                  <p className="text-xs text-muted-foreground mt-2">{pkg.details}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Booking & Availability */}
      {(ps.booking_info || ps.availability) && (
        <section className="px-4 md:px-8 pb-16">
          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-5">
            {ps.booking_info && (
              <div className="glass-card p-6">
                <h3 className="font-display font-semibold text-foreground mb-2">Booking</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{ps.booking_info}</p>
              </div>
            )}
            {ps.availability && (
              <div className="glass-card p-6">
                <h3 className="font-display font-semibold text-foreground mb-2">Availability</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{ps.availability}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* FAQ */}
      {ps.faq?.length > 0 && (
        <section className="px-4 md:px-8 pb-16">
          <div className="max-w-3xl mx-auto">
            <SectionHeading eyebrow="Questions" title="FAQ" align="left" />
            <div className="mt-8 space-y-2">
              {ps.faq.map((item, i) => (
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

      {/* Booking CTA */}
      <section className="px-4 md:px-8 pb-20">
        <div className="max-w-3xl mx-auto glass-card p-10 text-center">
          <h2 className="font-display font-bold text-2xl text-foreground">Book a Photography Session</h2>
          <p className="text-muted-foreground mt-2">Reach out with your date and what you need covered.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-premium">
            Book Photography Session <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {lightbox && (
        <div className="fixed inset-0 z-[90] bg-background/90 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-2xl" onClick={() => setLightbox(null)}>✕</button>
          <div className="max-w-5xl max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.image_url} alt={lightbox.alt_text || ''} className="max-w-full max-h-[90vh] object-contain rounded-xl" />
            {(lightbox.title || lightbox.caption) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-6 rounded-b-xl">
                {lightbox.title && <h3 className="font-display font-semibold text-foreground">{lightbox.title}</h3>}
                {lightbox.caption && <p className="text-sm text-muted-foreground">{lightbox.caption}</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}