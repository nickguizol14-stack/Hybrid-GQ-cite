/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // GQ Law Custom Colors - Lighter browns
        gq: {
          dark: '#2d2418',
          'dark-warm': '#3d3220',
          light: '#FAF6F0',
          'light-warm': '#F0E8DC',
          gold: '#C5A869', /* Refined Champagne Gold */
          'gold-light': '#E6D3A3',
          'gold-dark': '#8E733E',
          burgundy: '#9B2D3D',
          'burgundy-light': '#B03A4A',
          'burgundy-dark': '#7A232F',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        'gold': '0 0 20px rgba(196, 153, 59, 0.3), 0 0 40px rgba(196, 153, 59, 0.1)',
        'burgundy': '0 0 20px rgba(139, 35, 50, 0.3), 0 0 40px rgba(139, 35, 50, 0.1)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "gold-shimmer": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(10px)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(196, 153, 59, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(196, 153, 59, 0.5)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "gold-shimmer": "gold-shimmer 8s ease infinite",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
      },
      backgroundImage: {
        'gq-dark-gradient': 'linear-gradient(180deg, #2d2418 0%, #3d3220 100%)',
        'gq-light-gradient': 'linear-gradient(180deg, #FAF6F0 0%, #F0E8DC 100%)',
        'gq-gold-gradient': 'linear-gradient(135deg, #8E733E 0%, #C5A869 50%, #E6D3A3 100%)',
        'gq-burgundy-gradient': 'linear-gradient(135deg, #7A232F 0%, #9B2D3D 50%, #B03A4A 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
