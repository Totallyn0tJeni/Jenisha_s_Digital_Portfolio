import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

/**
 * Logo placeholder — displays an outlined square with "+" icon.
 * Automatically renders the uploaded logo (logoUrl) when provided.
 * When no logo exists, shows "Jenisha Patel" name elegantly.
 */
export default function LogoPlaceholder({ logoUrl, siteName = 'Jenisha Patel', size = 'md', to = '/' }) {
  const dimensions = {
    sm: { box: 'w-7 h-7', icon: 'w-3.5 h-3.5', text: 'text-lg', img: 'h-7' },
    md: { box: 'w-9 h-9', icon: 'w-4 h-4', text: 'text-xl', img: 'h-9' },
    lg: { box: 'w-12 h-12', icon: 'w-5 h-5', text: 'text-2xl', img: 'h-12' },
  }[size];

  const content = logoUrl ? (
    <img
      src={logoUrl}
      alt={siteName}
      className={`${dimensions.img} w-auto object-contain`}
    />
  ) : (
    <span className="font-display font-bold tracking-tight text-foreground">
      {siteName.split(' ').map((word, i) => (
        <span key={i}>
          {i > 0 && ' '}
          <span className={i === 0 ? '' : 'text-primary'}>{word}</span>
        </span>
      ))}
    </span>
  );

  if (to) {
    return (
      <Link to={to} className="flex items-center gap-2 group transition-premium" aria-label={siteName}>
        {content}
      </Link>
    );
  }
  return <div className="flex items-center gap-2">{content}</div>;
}

/**
 * Admin logo uploader placeholder — the outlined square with "+".
 * Shown in admin settings until a logo is uploaded.
 */
export function LogoUploadPlaceholder({ onClick, size = 'md' }) {
  const dimensions = {
    sm: { box: 'w-8 h-8', icon: 'w-4 h-4' },
    md: { box: 'w-10 h-10', icon: 'w-5 h-5' },
    lg: { box: 'w-16 h-16', icon: 'w-7 h-7' },
  }[size];

  return (
    <button
      onClick={onClick}
      className={`${dimensions.box} rounded-xl border-2 border-dashed border-primary/40 flex items-center justify-center text-primary/50 hover:border-primary hover:text-primary hover:bg-primary/5 transition-premium group`}
      aria-label="Upload logo"
    >
      <Plus className={`${dimensions.icon} group-hover:scale-110 transition-transform`} strokeWidth={1.5} />
    </button>
  );
}