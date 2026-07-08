import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import SectionHeading from '../SectionHeading';

export default function FAQSection({ config = {}, section }) {
  const items = config.items || [];
  const [open, setOpen] = useState(0);

  return (
    <section className="py-20 md:py-28 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        {section?.title && <SectionHeading title={section.title} />}
        {items.length > 0 ? (
          <div className="space-y-3">
            {items.map((item, i) => (
              <div key={i} className="glass-card overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-display font-semibold text-foreground">{item.question}</span>
                  {open === i ? <Minus className="w-4 h-4 text-primary shrink-0" /> : <Plus className="w-4 h-4 text-primary shrink-0" />}
                </button>
                {open === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="px-5 pb-5 text-muted-foreground leading-relaxed"
                  >
                    {item.answer}
                  </motion.p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground/50 italic py-12">FAQ items will appear here once added in the CMS.</p>
        )}
      </div>
    </section>
  );
}