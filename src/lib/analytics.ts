// src/lib/analytics.ts

const GA_ID = import.meta.env.VITE_GA4_ID;

// Load gtag.js async
export function initAnalytics() {
  if (!GA_ID) return;

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', GA_ID, { send_page_view: false }); // we'll send manually on route change
  window.gtag = gtag;
}

export function trackPageView(path: string) {
  if (!window.gtag) return;
  window.gtag('event', 'page_view', { page_path: path });
}

export function trackEvent(name: string, params?: Record<string, string | number>) {
  if (!window.gtag) return;
  window.gtag('event', name, params);
}

// Extend Window type
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}
