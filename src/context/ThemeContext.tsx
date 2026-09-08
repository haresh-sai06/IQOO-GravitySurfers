import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeId = 'blue' | 'violet' | 'emerald' | 'amber';

export interface ColorTheme {
  id: ThemeId;
  name: string;
  description: string;
  primary: string; // e.g. #004ac6
  primaryHover: string;
  light: string; // e.g. #e2e7ff
  subtle: string; // e.g. #f2f3ff
  border: string; // e.g. #dae2fd
  badgeText: string;
  previewGradient: string;
}

export const THEMES: Record<ThemeId, ColorTheme> = {
  blue: {
    id: 'blue',
    name: 'Live Blue',
    description: 'Default holographic cobalt palette',
    primary: '#004ac6',
    primaryHover: '#2563eb',
    light: '#e2e7ff',
    subtle: '#f2f3ff',
    border: '#dae2fd',
    badgeText: '#004ac6',
    previewGradient: 'from-blue-600 to-indigo-600',
  },
  violet: {
    id: 'violet',
    name: 'Holo Violet',
    description: 'Cybernetic neon amethyst palette',
    primary: '#7c3aed',
    primaryHover: '#6d28d9',
    light: '#ede9fe',
    subtle: '#f5f3ff',
    border: '#ddd6fe',
    badgeText: '#6d28d9',
    previewGradient: 'from-violet-600 to-purple-600',
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Matrix',
    description: 'Biometric green precision palette',
    primary: '#059669',
    primaryHover: '#047857',
    light: '#d1fae5',
    subtle: '#ecfdf5',
    border: '#a7f3d0',
    badgeText: '#047857',
    previewGradient: 'from-emerald-600 to-teal-600',
  },
  amber: {
    id: 'amber',
    name: 'Solar Amber',
    description: 'High-contrast warm photon palette',
    primary: '#d97706',
    primaryHover: '#b45309',
    light: '#fef3c7',
    subtle: '#fffbeb',
    border: '#fde68a',
    badgeText: '#b45309',
    previewGradient: 'from-amber-500 to-orange-600',
  },
};

interface ThemeContextType {
  themeId: ThemeId;
  theme: ColorTheme;
  setThemeId: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  themeId: 'blue',
  theme: THEMES.blue,
  setThemeId: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeId, setThemeIdState] = useState<ThemeId>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('livevolume_theme');
      if (saved && (saved === 'blue' || saved === 'violet' || saved === 'emerald' || saved === 'amber')) {
        return saved;
      }
    }
    return 'blue';
  });

  const setThemeId = (id: ThemeId) => {
    setThemeIdState(id);
    if (typeof window !== 'undefined') {
      localStorage.setItem('livevolume_theme', id);
    }
  };

  const currentTheme = THEMES[themeId] || THEMES.blue;

  // Apply CSS custom properties dynamically on document root & container
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', currentTheme.primary);
    root.style.setProperty('--color-primary-hover', currentTheme.primaryHover);
    root.style.setProperty('--color-primary-light', currentTheme.light);
    root.style.setProperty('--color-primary-subtle', currentTheme.subtle);
    root.style.setProperty('--color-primary-border', currentTheme.border);
    root.style.setProperty('--color-badge-text', currentTheme.badgeText);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ themeId, theme: currentTheme, setThemeId }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
