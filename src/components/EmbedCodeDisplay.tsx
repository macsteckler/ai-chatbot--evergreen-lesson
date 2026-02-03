'use client';

import { useState } from 'react';

interface EmbedCodeDisplayProps {
  appUrl?: string;
}

export default function EmbedCodeDisplay({ appUrl = 'https://your-app.vercel.app' }: EmbedCodeDisplayProps) {
  const [copied, setCopied] = useState(false);

  const embedCode = `<!-- AI Chatbot Widget -->
<script src="${appUrl}/embed.js"></script>
<script>
  window.initAIChatbot({
    primaryColor: '#0066cc',
    position: 'bottom-right',
    greeting: 'Hello! How can I help you today?',
    businessName: 'ABC Real Estate'
  });
</script>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
          <span className="text-sm text-gray-300 font-mono">embed.html</span>
          <button
            onClick={handleCopy}
            className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
          >
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>
        <pre className="p-4 overflow-x-auto">
          <code className="text-sm text-gray-100 font-mono">{embedCode}</code>
        </pre>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p className="mb-2">
          <strong>Quick Start:</strong> Copy the code above and paste it before the closing{' '}
          <code className="bg-gray-100 px-1 rounded">&lt;/body&gt;</code> tag on your website.
        </p>
      </div>
    </div>
  );
}
