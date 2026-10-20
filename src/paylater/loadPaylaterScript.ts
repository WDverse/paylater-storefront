let loadPromise: Promise<void> | null = null;

export function loadPaylaterScript(): Promise<void> {
  if (loadPromise) return loadPromise; // already loading/loaded — StrictMode's double effect invocation, or multiple components, share this instead of injecting twice

  loadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[src="/paylater.js"]');
    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = '/paylater.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load paylater.js'));
    document.body.appendChild(script);
  });

  return loadPromise;
}
