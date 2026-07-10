import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

/**
 * Empty state component for collections.
 * Shows an elegant message when no content exists yet.
 *
 * Props:
 * - title: headline (e.g., "Your first project will appear here")
 * - description: supporting text
 * - action: optional button { label, onClick }
 */
export default function EmptyState({ title, description, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center text-center py-16 px-6 max-w-md mx-auto"
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary/40 mb-5">
        <Sparkles className="w-7 h-7" strokeWidth={1.5} />
      </div>
      <h3 className="font-display font-semibold text-xl text-foreground mb-2">{title}</h3>
      {description && <p className="text-muted-foreground text-sm leading-relaxed mb-6">{description}</p>}
      {action && (
        <button
          onClick={action.onClick}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-premium"
        >
          {action.label}
        </button>
      )}
    </motion.div>
  );
}