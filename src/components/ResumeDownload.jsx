import { FileDown } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';

export default function ResumeDownload({ variant = 'primary', label = 'Download Résumé', className = '' }) {
  const { settings } = useSiteSettings();
  const url = settings?.resume_pdf_url;
  if (!url) return null;

  const base = 'inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-premium';
  const styles = {
    primary: `${base} bg-primary text-primary-foreground hover:bg-primary/90 glow-primary`,
    outline: `${base} glass text-foreground hover:border-primary/30`,
    block: `${base} w-full justify-center bg-primary text-primary-foreground hover:bg-primary/90`,
  };

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={`${styles[variant] || styles.primary} ${className}`}>
      <FileDown className="w-4 h-4" /> {label}
    </a>
  );
}