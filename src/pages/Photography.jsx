import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { photos as photosData } from '@/data/photos';
import { albumsData } from '@/data/albums';
import { photographySettings as ps } from '@/data/photographySettings';
import { assets } from '@/data/assets';

// Photos captured as part of a marketing campaign (event/behind-the-scenes shots
// tagged category: 'Photography' on their Asset record) show up here too — same
// underlying record as on the Marketing page, not a separate copy.
const campaignPhotos = assets
  .filter((a) => a.category?.includes('Photography'))
  .map((a) => ({
    id: a.id, title: a.title, category: a.collection || 'Campaign Photography',
    image_url: a.web_path, alt_text: a.alt_text, caption: `${a.organization}${a.campaign ? ` · ${a.campaign}` : ''}`,
    order: 999,
  }));

const SPORTS = /badminton|doubles|serve|smash|rally|medal|ready position|flag football|intramural|gym/i;
const HACK = /hack/i;
const CULTURE = /diwali|garba|puja|ganesh|lotus|marigold|ching|holiday|rangoli/i;

// Existing gallery photos are filed into albums by category/title. Nothing is deleted;
// every record still lives in src/data/photos/items.
function albumIdFor(p) {
  if (p.category === 'Robotics') return 'frc-robotics-competitions';
  if (p.category === 'Nature') return 'flowers-nature';
  if (p.category === 'Travel') return 'niagara-travel';
  if (p.category === 'Urban') return 'toronto-cn-tower';
  if (p.category === 'Portraits') return 'portraits';
  if (p.category === 'Friends') return 'friends-memories';
  if (p.category === 'Events') {
    if (SPORTS.test(p.title || '')) return 'badminton-sports';
    if (HACK.test(p.title || '')) return 'wolfhacks-2026';
    if (CULTURE.test(p.title || '')) return 'cultural-events-celebrations';
    return 'school-events-clubs';
  }
  return 'event-campaign-photos';
}

const EXTRA_ALBUMS = {
  'portraits': { title: 'Portraits', description: 'Portrait work.' },
  'friends-memories': { title: 'Friends & Memories', description: 'Moments with people who make it fun.' },
  'school-events-clubs': { title: 'School Events & Clubs', description: 'Clubs, shows, booths and school events.' },
  'event-campaign-photos': { title: 'Event Campaign Photos', description: 'Behind-the-scenes shots from marketing campaigns.' },
};

function buildAlbums(photos) {
  const map = new Map();
  albumsData.forEach((a) => map.set(a.id, { ...a, photos: [] }));
  Object.entries(EXTRA_ALBUMS).forEach(([id, a], i) => map.set(id, { id, ...a, order: 100 + i, photos: [] }));
  photos.forEach((p) => {
    const alb = map.get(albumIdFor(p));
    if (alb) alb.photos.push({ id: `g-${p.id}`, src: p.image_url, title: p.title, caption: p.caption });
  });
  albumsData.forEach((a) => {
    map.get(a.id).photos.push(...a.photos.map((ph) => ({ ...ph, title: undefined })));
  });
  return [...map.values()]
    .filter((a) => a.photos.length > 0)
    .map((a) => ({ ...a, cover: a.cover && !EXTRA_ALBUMS[a.id] ? a.cover : a.photos[0].src }));
}

export default function Photography() {
  // Entries without an image yet stay in src/data/photos/items but are hidden until a photo is added.
  const photos = [...photosData, ...campaignPhotos].filter((p) => p.image_url);
  const albums = buildAlbums(photos);
  const [lightbox, setLightbox] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [openAlbum, setOpenAlbum] = useState(null);
  const total = albums.reduce((n, a) => n + a.photos.length, 0);
  const step = (d) => setLightbox((l) => l && { ...l, index: (l.index + d + l.list.length) % l.list.length });
  const cur = lightbox ? lightbox.list[lightbox.index] : null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <section className="px-4 md:px-8 pt-12 pb-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeading as="h1" eyebrow="Visual Storytelling" title="Photography" subtitle="Events, portraits, nature, and the world through my lens." />
        </div>
      </section>

      {/* Albums */}
      {albums.length > 0 && (
        <section id="albums" className="px-4 md:px-8 pb-16">
          <div className="max-w-6xl mx-auto">
            <SectionHeading eyebrow="Memories" title="Albums" subtitle={`${albums.length} albums · ${total} photos`} />
            {!openAlbum ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {albums.map((album, i) => (
                  <motion.button
                    key={album.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 4) * 0.05 }}
                    onClick={() => setOpenAlbum(album)}
                    className="relative aspect-square rounded-2xl overflow-hidden glass-card group cursor-pointer text-left"
                  >
                    <img src={album.cover} alt={album.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-4">
                      <h3 className="font-display font-semibold text-foreground text-sm md:text-base">{album.title}</h3>
                      <p className="text-xs text-muted-foreground">{album.photos.length} photos</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            ) : (
              <div>
                <button onClick={() => setOpenAlbum(null)} className="mb-4 text-sm text-muted-foreground hover:text-foreground transition-premium">← All albums</button>
                <h3 className="font-display text-2xl font-semibold text-foreground">{openAlbum.title}</h3>
                <p className="text-muted-foreground mb-6">{openAlbum.description}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {openAlbum.photos.map((ph, idx) => (
                    <button key={ph.id} onClick={() => setLightbox({ list: openAlbum.photos, index: idx, album: openAlbum.title })} className="aspect-square rounded-xl overflow-hidden glass-card group cursor-pointer">
                      <img src={ph.src} alt={ph.title || openAlbum.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

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

      {lightbox && cur && (
        <div className="fixed inset-0 z-[90] bg-background/90 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-2xl" onClick={() => setLightbox(null)}>✕</button>
          {lightbox.list.length > 1 && (
            <>
              <button aria-label="Previous photo" className="absolute left-3 md:left-6 text-3xl text-muted-foreground hover:text-foreground" onClick={(e) => { e.stopPropagation(); step(-1); }}>‹</button>
              <button aria-label="Next photo" className="absolute right-3 md:right-6 text-3xl text-muted-foreground hover:text-foreground" onClick={(e) => { e.stopPropagation(); step(1); }}>›</button>
            </>
          )}
          <div className="max-w-5xl max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
            <img src={cur.src} alt={cur.title || lightbox.album} className="max-w-full max-h-[90vh] object-contain rounded-xl" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-6 rounded-b-xl">
              <h3 className="font-display font-semibold text-foreground">{cur.title || lightbox.album}</h3>
              {cur.caption && <p className="text-sm text-muted-foreground">{cur.caption}</p>}
              <p className="text-xs text-muted-foreground">{lightbox.index + 1} / {lightbox.list.length}</p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}