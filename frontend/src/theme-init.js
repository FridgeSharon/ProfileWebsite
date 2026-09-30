// Apply the saved appearance before the stylesheet paints. No cookies or network calls.
(() => {
  let theme = 'light';
  let motion = 'full';
  try {
    if (localStorage.getItem('portfolio-theme') === 'dark') theme = 'dark';
    if (localStorage.getItem('portfolio-motion') === 'paused') motion = 'paused';
  } catch { /* Storage can be blocked; use the default appearance. */ }
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.dataset.motionPreference = motion;
  root.dataset.motion = motion === 'paused' || matchMedia('(prefers-reduced-motion: reduce)').matches ? 'reduced' : 'full';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#101c18' : '#f6f5f0');
  document.querySelector('meta[name="color-scheme"]')?.setAttribute('content', theme);
})();
