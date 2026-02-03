'use client';

import { useEffect } from 'react';

interface CalendlyEmbedProps {
  url: string;
}

export default function CalendlyEmbed({ url }: CalendlyEmbedProps) {
  useEffect(() => {
    // Load Calendly script if not already loaded
    if (!document.querySelector('script[src*="calendly"]')) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="my-2 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
      <div
        className="calendly-inline-widget"
        data-url={url}
        style={{ minWidth: '320px', height: '630px' }}
      />
    </div>
  );
}
