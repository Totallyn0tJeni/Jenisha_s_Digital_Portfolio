import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, CheckCircle2, FileDown, Star } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import SocialIcons from '@/components/SocialIcons';
import ResumeDownload from '@/components/ResumeDownload';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { testimonials } from '@/data/testimonials';

export default function Contact() {
  const { settings } = useSiteSettings();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  // No backend to store messages — this opens the visitor's email client with the
  // form pre-filled, addressed to `contact_email` in src/data/siteSettings.js.
  // Swap this for a form service (Formspree, EmailJS, etc.) if you'd rather
  // receive submissions without the visitor needing their own mail client.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    const to = settings?.contact_email;
    const subject = encodeURIComponent(form.subject || `Message from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  const socialLinks = settings?.social_links || [];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <section className="px-4 md:px-8 pt-12 pb-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Contact" title="Let's connect" subtitle="Have a question, opportunity, or just want to say hello? I'd love to hear from you." />

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="space-y-6">
              <div className="glass-card p-6 md:p-8">
                <h3 className="font-display font-bold text-xl text-foreground mb-6">Get In Touch</h3>
                {settings?.contact_email && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <a href={`mailto:${settings.contact_email}`} className="text-sm text-foreground hover:text-primary transition-premium">{settings.contact_email}</a>
                    </div>
                  </div>
                )}

                {settings?.contact_phone && (
                  <div className="flex items-center gap-3 mt-4">
                    <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <a href={`tel:${settings.contact_phone.replace(/[^\d+]/g, '')}`} className="text-sm text-foreground hover:text-primary transition-premium">{settings.contact_phone}</a>
                    </div>
                  </div>
                )}

                {socialLinks.length > 0 && (
                  <div className="mt-8">
                    <SocialIcons settings={settings} size="md" />
                  </div>
                )}
              </div>

              {settings?.resume_pdf_url && (
                <div className="glass-card p-6 md:p-8 flex items-center gap-5">
                  <div className="w-16 h-20 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/15">
                    <FileDown className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-foreground mb-1">My Resume</h3>
                    <p className="text-sm text-muted-foreground mb-3">Download my full resume for a detailed summary.</p>
                    <ResumeDownload label="Download PDF" />
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="glass-card p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-sm text-muted-foreground block mb-2">Name *</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-premium" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground block mb-2">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-premium" placeholder="you@email.com" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground block mb-2">Subject</label>
                  <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-premium" placeholder="What's this about?" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground block mb-2">Message *</label>
                  <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-premium resize-none" placeholder="Your message..." />
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <button type="submit" className="w-full py-3.5 rounded-xl font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-premium flex items-center justify-center gap-2">
                  {sent ? <><CheckCircle2 className="w-5 h-5" /> Opening your email app...</> : <><Send className="w-4 h-4" /> Send Message</>}
                </button>

                {sent && <p className="text-sm text-success text-center">This opens your email app with the message pre-filled — send it from there to reach me.</p>}
              </form>
            </motion.div>
          </div>

          {/* Testimonials */}
          {testimonials.length > 0 && (
            <div className="mt-20">
              <SectionHeading eyebrow="Testimonials" title="What People Say" align="left" />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
                {testimonials.slice(0, 3).map((t, i) => (
                  <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="glass-card p-6">
                    <div className="flex gap-1 mb-3">{[...Array(5)].map((_, idx) => <Star key={idx} className={`w-3.5 h-3.5 ${idx < (t.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`} />)}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">&ldquo;{t.content}&rdquo;</p>
                    <p className="text-sm font-semibold text-foreground">{t.author_name}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
