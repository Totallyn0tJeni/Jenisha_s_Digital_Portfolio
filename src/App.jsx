import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import SectionHeading from '../SectionHeading';

export default function NewsletterSection({ config = {}, section }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-20 md:py-28 px-4 md:px-8">
      <div className="max-w-2xl mx-auto text-center">
        {section?.title && <SectionHeading title={section.title} />}
        <div className="glass-card p-8 md:p-10">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-5">
            <Mail className="w-7 h-7" strokeWidth={1.5} />
          </div>
          {config.description && <p className="text-muted-foreground mb-6">{config.description}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-full bg-surface border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/50"
            />
            <button type="submit" className="px-6 py-3 rounded-full font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-premium">
              {submitted ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}