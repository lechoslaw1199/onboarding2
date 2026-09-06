import { useState, useEffect } from 'react';

/**
 * Hook to preload images and return loading status.
 * @param {string|string[]} srcs - Image source(s) to preload.
 * @returns {boolean} - True when all images are loaded or failed.
 */
export function useImagePreload(srcs) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const sources = Array.isArray(srcs) ? srcs : [srcs];
    const filteredSources = sources.filter(src => typeof src === 'string' && src.length > 0);

    if (filteredSources.length === 0) {
      setIsReady(true);
      return;
    }

    let loadedCount = 0;
    const total = filteredSources.length;

    const handleLoad = () => {
      loadedCount++;
      if (loadedCount === total) {
        setIsReady(true);
      }
    };

    filteredSources.forEach(src => {
      const img = new Image();
      img.src = src;
      if (img.complete) {
        handleLoad();
      } else {
        img.onload = handleLoad;
        img.onerror = handleLoad; // Don't block if image fails to load
      }
    });

    // Cleanup
    return () => {
      filteredSources.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [srcs]);

  return isReady;
}
