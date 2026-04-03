import { useState } from 'react';
import { useTheme, type ThemeType } from '@/context/ThemeContext';
import { Crown, Shield, Leaf, Gem, Palette } from 'lucide-react';

const themes: { id: ThemeType; label: string; icon: React.ElementType; swatch: string }[] = [
  { id: 'royal', label: 'Royal', icon: Crown, swatch: '#D4AF37' },
  { id: 'platinum', label: 'Platinum', icon: Shield, swatch: '#C0C0C0' },
  { id: 'harvest', label: 'Harvest', icon: Leaf, swatch: '#B8860B' },
  { id: 'onyx', label: 'Onyx', icon: Gem, swatch: '#D4AF37' },
];

export default function ThemeSwitcher() {
  const { currentTheme, setTheme, themeConfig } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
      {/* Theme options - expand upward */}
      <div
        className={`flex flex-col gap-2 transition-all duration-300 origin-bottom ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
        }`}
      >
        {themes.map((theme) => {
          const Icon = theme.icon;
          const isActive = currentTheme === theme.id;
          return (
            <button
              key={theme.id}
              onClick={() => {
                setTheme(theme.id);
                setIsOpen(false);
              }}
              className={`
                flex items-center gap-3 pl-4 pr-5 py-2.5 rounded-full text-sm font-medium
                transition-all duration-200 backdrop-blur-xl whitespace-nowrap
                ${isActive
                  ? 'shadow-lg scale-100'
                  : 'hover:scale-105 hover:shadow-md'
                }
              `}
              style={{
                backgroundColor: isActive
                  ? themeConfig.colors.gold
                  : 'rgba(20, 20, 20, 0.9)',
                color: isActive
                  ? '#1a1a1a'
                  : themeConfig.colors.text,
                border: `1px solid ${isActive ? 'transparent' : themeConfig.colors.cardBorder}`,
              }}
            >
              <Icon className="w-4 h-4" />
              <span>{theme.label}</span>
            </button>
          );
        })}
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          p-3.5 rounded-full shadow-lg backdrop-blur-xl
          transition-all duration-300 hover:scale-110
          ${isOpen ? 'rotate-45' : 'rotate-0'}
        `}
        style={{
          backgroundColor: 'rgba(20, 20, 20, 0.9)',
          border: `1px solid ${themeConfig.colors.cardBorder}`,
          color: themeConfig.colors.gold,
        }}
        aria-label="Switch theme"
      >
        <Palette className="w-5 h-5" />
      </button>
    </div>
  );
}
