import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeType = 'royal' | 'platinum' | 'harvest' | 'onyx';

interface ThemeConfig {
  name: string;
  isDark: boolean;
  colors: {
    primary: string;
    accent: string;
    accentRgb: string;
    text: string;
    textMuted: string;
    cardBg: string;
    cardBorder: string;
    gold: string;
    goldRgb: string;
    overlay: string;
    sectionBg: string;
    sectionAlt: string;
    inputBg: string;
    gradientFrom: string;
    gradientVia: string;
    gradientTo: string;
  };
}

const themes: Record<ThemeType, ThemeConfig> = {
  royal: {
    name: 'Royal Elegance',
    isDark: true,
    colors: {
      primary: '#0a0a0f',
      accent: '#8B0000',
      accentRgb: '139, 0, 0',
      text: '#f5f5f5',
      textMuted: '#a0a0a0',
      cardBg: 'rgba(20, 20, 30, 0.6)',
      cardBorder: 'rgba(212, 175, 55, 0.25)',
      gold: '#D4AF37',
      goldRgb: '212, 175, 55',
      overlay: 'rgba(10, 10, 15, 0.85)',
      sectionBg: 'rgba(12, 12, 20, 0.95)',
      sectionAlt: 'rgba(18, 18, 28, 0.95)',
      inputBg: 'rgba(30, 30, 45, 0.5)',
      gradientFrom: '#8B0000',
      gradientVia: '#A52A2A',
      gradientTo: '#D4AF37',
    },
  },
  platinum: {
    name: 'Platinum Trust',
    isDark: true,
    colors: {
      primary: '#0a0f14',
      accent: '#1e3a5f',
      accentRgb: '30, 58, 95',
      text: '#f0f4f8',
      textMuted: '#8899aa',
      cardBg: 'rgba(15, 22, 35, 0.6)',
      cardBorder: 'rgba(192, 192, 192, 0.25)',
      gold: '#C0C0C0',
      goldRgb: '192, 192, 192',
      overlay: 'rgba(10, 15, 20, 0.85)',
      sectionBg: 'rgba(10, 15, 25, 0.95)',
      sectionAlt: 'rgba(15, 22, 35, 0.95)',
      inputBg: 'rgba(20, 30, 50, 0.5)',
      gradientFrom: '#1e3a5f',
      gradientVia: '#2a5a8f',
      gradientTo: '#C0C0C0',
    },
  },
  harvest: {
    name: 'Golden Harvest',
    isDark: true,
    colors: {
      primary: '#0f0d08',
      accent: '#6B8E23',
      accentRgb: '107, 142, 35',
      text: '#f0ebe0',
      textMuted: '#9a9080',
      cardBg: 'rgba(20, 18, 12, 0.6)',
      cardBorder: 'rgba(184, 134, 11, 0.25)',
      gold: '#B8860B',
      goldRgb: '184, 134, 11',
      overlay: 'rgba(15, 13, 8, 0.85)',
      sectionBg: 'rgba(15, 13, 8, 0.95)',
      sectionAlt: 'rgba(22, 20, 14, 0.95)',
      inputBg: 'rgba(30, 25, 15, 0.5)',
      gradientFrom: '#6B8E23',
      gradientVia: '#8B9E33',
      gradientTo: '#B8860B',
    },
  },
  onyx: {
    name: 'Onyx & Gold',
    isDark: true,
    colors: {
      primary: '#0a0a0a',
      accent: '#D4AF37',
      accentRgb: '212, 175, 55',
      text: '#f5f5f5',
      textMuted: '#a0a0a0',
      cardBg: 'rgba(18, 18, 18, 0.6)',
      cardBorder: 'rgba(212, 175, 55, 0.2)',
      gold: '#D4AF37',
      goldRgb: '212, 175, 55',
      overlay: 'rgba(10, 10, 10, 0.85)',
      sectionBg: 'rgba(10, 10, 10, 0.95)',
      sectionAlt: 'rgba(18, 18, 18, 0.95)',
      inputBg: 'rgba(25, 25, 25, 0.5)',
      gradientFrom: '#D4AF37',
      gradientVia: '#C5A869',
      gradientTo: '#E6D3A3',
    },
  },
};

interface ThemeContextType {
  currentTheme: ThemeType;
  themeConfig: ThemeConfig;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('onyx');

  const setTheme = (theme: ThemeType) => {
    setCurrentTheme(theme);
    localStorage.setItem('gary-quinnett-theme', theme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('gary-quinnett-theme') as ThemeType;
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Apply CSS custom properties for the active theme
  useEffect(() => {
    const config = themes[currentTheme];
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', config.colors.primary);
    root.style.setProperty('--theme-accent', config.colors.accent);
    root.style.setProperty('--theme-accent-rgb', config.colors.accentRgb);
    root.style.setProperty('--theme-text', config.colors.text);
    root.style.setProperty('--theme-text-muted', config.colors.textMuted);
    root.style.setProperty('--theme-card-bg', config.colors.cardBg);
    root.style.setProperty('--theme-card-border', config.colors.cardBorder);
    root.style.setProperty('--theme-gold', config.colors.gold);
    root.style.setProperty('--theme-gold-rgb', config.colors.goldRgb);
    root.style.setProperty('--theme-overlay', config.colors.overlay);
    root.style.setProperty('--theme-section-bg', config.colors.sectionBg);
    root.style.setProperty('--theme-section-alt', config.colors.sectionAlt);
    root.style.setProperty('--theme-input-bg', config.colors.inputBg);
    root.style.setProperty('--theme-gradient-from', config.colors.gradientFrom);
    root.style.setProperty('--theme-gradient-via', config.colors.gradientVia);
    root.style.setProperty('--theme-gradient-to', config.colors.gradientTo);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        themeConfig: themes[currentTheme],
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
