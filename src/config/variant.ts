const buildVariant = (() => {
  try {
    return import.meta.env?.VITE_VARIANT || 'full';
  } catch {
    return 'full';
  }
})();

export const SITE_VARIANT: string = (() => {
  if (typeof window === 'undefined') return buildVariant;

  const isTauri = '__TAURI_INTERNALS__' in window || '__TAURI__' in window;

  // Check URL param ?v=macro (or any known variant) — highest priority for sharing
  const urlParams = new URLSearchParams(location.search);
  const v = urlParams.get('v') || urlParams.get('variant');
  if (v && ['tech', 'full', 'finance', 'happy', 'commodity', 'energy', 'macro'].includes(v)) return v;

  if (isTauri) {
    const stored = localStorage.getItem('worldmonitor-variant');
    if (stored === 'tech' || stored === 'full' || stored === 'finance' || stored === 'happy' || stored === 'commodity' || stored === 'energy' || stored === 'macro') return stored;
    return buildVariant;
  }

  const h = location.hostname;
  if (h.startsWith('tech.')) return 'tech';
  if (h.startsWith('finance.')) return 'finance';
  if (h.startsWith('happy.')) return 'happy';
  if (h.startsWith('commodity.')) return 'commodity';
  if (h.startsWith('energy.')) return 'energy';
  if (h.startsWith('macro.')) return 'macro';

  if (h === 'localhost' || h === '127.0.0.1') {
    const stored = localStorage.getItem('worldmonitor-variant');
    if (stored === 'tech' || stored === 'full' || stored === 'finance' || stored === 'happy' || stored === 'commodity' || stored === 'energy' || stored === 'macro') return stored;
    return buildVariant;
  }

  return 'full';
})();