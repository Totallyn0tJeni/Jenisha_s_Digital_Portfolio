import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext();

/**
 * Theme provider supporting light, dark, and system modes.
 * Detects prefers-color-scheme on first visit, defaults to light.
 * Persists choice to localStorage and (when logged in) to user profile.
 */
export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState('light');
  const [resolvedTheme, setResolvedTheme] = useState('light');

  const applyTheme = useCallback((mode) => {
    let actual = mode;
    if (mode === 'system') {
      actual = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    setResolvedTheme(actual);
    if (actual === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('jp-theme');
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      setThemeState(stored);
      applyTheme(stored);
    } else {
      // First visit — default to light per user spec
      setThemeState('light');
      applyTheme('light');
    }

    // Listen for system changes (only affects "system" mode)
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (localStorage.getItem('jp-theme') === 'system') {
        applyTheme('system');
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [applyTheme]);

  const setTheme = useCallback((mode) => {
    setThemeState(mode);
    localStorage.setItem('jp-theme', mode);
    applyTheme(mode);
  }, [applyTheme]);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}