import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Wrap ALL imports in async try-catch to surface module-level errors
async function boot() {
  try {
    const [
      { default: App },
      { initAnalytics },
      { HelmetProvider },
      _css,
    ] = await Promise.all([
      import('./App.tsx'),
      import('./lib/analytics'),
      import('react-helmet-async'),
      import('./index.css') as Promise<any>,
    ]);
    void _css;

    initAnalytics();

    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </StrictMode>,
    );
  } catch (err: any) {
    // Show the error visibly on screen
    document.body.style.background = '#111';
    document.body.style.color = '#fff';
    document.body.style.padding = '2rem';
    document.body.style.fontFamily = 'monospace';
    document.body.innerHTML = `
      <h1 style="color:#f44">Boot Error</h1>
      <pre style="white-space:pre-wrap;margin-top:1rem">${err?.message}</pre>
      <pre style="white-space:pre-wrap;margin-top:1rem;opacity:0.6;font-size:0.8rem">${err?.stack}</pre>
    `;
    console.error('Boot error:', err);
  }
}

boot();
