import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle2, FileDown } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import SectionHeading from '@/components/SectionHeading';
import SocialIcons from '@/components/SocialIcons';
import ResumeDownload from '@/components/ResumeDownload';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import { useSiteSettings } from '@/hooks/useSiteSettings';

export default function Contact() {
  const { settings } = useSiteSettings();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await base44.entities.ContactMessage.create(form);
      setSuccess(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (e) {
      setError('Something went wrong. Please try again.');
    }
    setSubmitting(false);
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
                <div className="space-y-4">
                  {(settings?.social_links || []).filter((s) => s.platform === 'Email' || s.icon === 'Mail').map((s, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Email</p>
                        <a href={s.url} className="text-sm text-foreground hover:text-primary transition-premium">{s.url?.replace('mailto:', '')}</a>
                      </div>
                    </div>
                  ))}
                </div>

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

                <button type="submit" disabled={submitting} className="w-full py-3.5 rounded-xl font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-premium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {submitting ? <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : success ? <><CheckCircle2 className="w-5 h-5" /> Message Sent!</> : <><Send className="w-4 h-4" /> Send Message</>}
                </button>

                {success && <p className="text-sm text-success text-center">Thank you for reaching out! I'll get back to you soon.</p>}
              </form>
            </motion.div>
          </div>

          {/* Testimonials */}
          <div className="mt-20">
            <TestimonialsSection section={{ title: 'What People Say' }} config={{ count: 3 }} />
          </div>
        </div>
      </section>
    </motion.div>
  );
}