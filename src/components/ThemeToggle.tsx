import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof document !== 'undefined') {
      const current = document.documentElement.dataset.theme as 'light' | 'dark';
      if (current === 'light' || current === 'dark') return current;
      try {
        const stored = localStorage.getItem('lununeth-theme');
        if (stored === 'light' || stored === 'dark') return stored;
      } catch {
        // ignore storage errors
      }
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'lununeth-theme' && (e.newValue === 'light' || e.newValue === 'dark')) {
        setTheme(e.newValue);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    try {
      localStorage.setItem('lununeth-theme', nextTheme);
    } catch {
      // ignore storage errors
    }
  };

  return (
    <button
      type="button"
      className="theme-toggle-btn"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 theme-icon-sun" aria-hidden="true" />
      ) : (
        <Moon className="w-5 h-5 theme-icon-moon" aria-hidden="true" />
      )}
    </button>
  );
}
