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
  // ─── ONYX & GOLD ────────────────────────────────────────────────
  // Classic black-tie luxury. Pure blacks with warm gold.
  onyx: {
    name: 'Onyx & Gold',
    isDark: true,
    colors: {
      primary: '#080808',
      accent: '#D4AF37',
      accentRgb: '212, 175, 55',
      text: '#f5f5f0',
      textMuted: '#b5b0a5',
      cardBg: 'rgba(24, 24, 22, 0.75)',
      cardBorder: 'rgba(212, 175, 55, 0.22)',
      gold: '#D4AF37',
      goldRgb: '212, 175, 55',
      overlay: 'rgba(8, 8, 8, 0.88)',
      sectionBg: '#0c0c0b',
      sectionAlt: '#161614',
      inputBg: 'rgba(30, 30, 28, 0.6)',
      gradientFrom: '#D4AF37',
      gradientVia: '#C5A052',
      gradientTo: '#E8D5A0',
    },
  },

  // ─── ROYAL CRIMSON ──────────────────────────────────────────────
  // Old-world authority. Deep wine backgrounds, crimson accents, warm gold.
  // Evokes mahogany, velvet, power.
  royal: {
    name: 'Royal Crimson',
    isDark: true,
    colors: {
      primary: '#0a0608',
      accent: '#9B2335',
      accentRgb: '155, 35, 53',
      text: '#f5f0f0',
      textMuted: '#c0a8ad',
      cardBg: 'rgba(28, 16, 20, 0.75)',
      cardBorder: 'rgba(212, 175, 55, 0.22)',
      gold: '#D4AF37',
      goldRgb: '212, 175, 55',
      overlay: 'rgba(10, 6, 8, 0.88)',
      sectionBg: '#0e080a',
      sectionAlt: '#1a1014',
      inputBg: 'rgba(35, 18, 24, 0.6)',
      gradientFrom: '#9B2335',
      gradientVia: '#7a1a28',
      gradientTo: '#D4AF37',
    },
  },

  // ─── PLATINUM ───────────────────────────────────────────────────
  // Modern corporate trust. Cool slate-navy backgrounds, silver accents.
  // Evokes steel, glass towers, precision.
  platinum: {
    name: 'Platinum',
    isDark: true,
    colors: {
      primary: '#080a10',
      accent: '#3B6EA8',
      accentRgb: '59, 110, 168',
      text: '#eef1f5',
      textMuted: '#94a3b8',
      cardBg: 'rgba(16, 22, 36, 0.75)',
      cardBorder: 'rgba(148, 163, 184, 0.22)',
      gold: '#CBD5E1',
      goldRgb: '203, 213, 225',
      overlay: 'rgba(8, 10, 16, 0.88)',
      sectionBg: '#0b0e16',
      sectionAlt: '#141a28',
      inputBg: 'rgba(20, 28, 48, 0.6)',
      gradientFrom: '#3B6EA8',
      gradientVia: '#2d5580',
      gradientTo: '#CBD5E1',
    },
  },

  // ─── HARVEST ────────────────────────────────────────────────────
  // Oklahoma earth. Warm browns, sage green accent, burnished copper.
  // Evokes red earth, wheat fields, dependability.
  harvest: {
    name: 'Harvest',
    isDark: true,
    colors: {
      primary: '#0a0906',
      accent: '#7A8B3C',
      accentRgb: '122, 139, 60',
      text: '#f2ede4',
      textMuted: '#b8ad98',
      cardBg: 'rgba(26, 22, 14, 0.75)',
      cardBorder: 'rgba(196, 160, 40, 0.22)',
      gold: '#C4A028',
      goldRgb: '196, 160, 40',
      overlay: 'rgba(10, 9, 6, 0.88)',
      sectionBg: '#0e0c08',
      sectionAlt: '#1a1610',
      inputBg: 'rgba(34, 28, 16, 0.6)',
      gradientFrom: '#7A8B3C',
      gradientVia: '#5e6b2e',
      gradientTo: '#C4A028',
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
