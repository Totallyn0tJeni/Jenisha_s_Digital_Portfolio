import { Sun, Moon, Monitor } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/lib/ThemeContext';

/**
 * Theme toggle — cycles between light, dark, and system.
 * Shows current mode icon with a dropdown for explicit selection.
 */
export default function ThemeToggle({ variant = 'icon' }) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (variant === 'icon') {
    return (
      <button
        onClick={toggleTheme}
        className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/8 transition-premium"
        aria-label="Toggle theme"
      >
        {resolvedTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-full text-sm text-muted-foreground hover:text-foreground hover:bg-primary/8 transition-premium"
      >
        {resolvedTheme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        <span className="capitalize">{theme}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-36 rounded-xl glass-strong shadow-soft p-1.5 z-50">
          {[
            { mode: 'light', label: 'Light', icon: Sun },
            { mode: 'dark', label: 'Dark', icon: Moon },
            { mode: 'system', label: 'System', icon: Monitor },
          ].map(({ mode, label, icon: Icon }) => (
            <button
              key={mode}
              onClick={() => { setTheme(mode); setOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-premium ${
                theme === mode ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-primary/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}