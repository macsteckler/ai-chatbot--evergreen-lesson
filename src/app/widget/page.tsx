'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ChatBubble from '@/components/ChatBubble';
import ChatWindow from '@/components/ChatWindow';
import { WidgetConfig } from '@/types/chat';

function WidgetContent() {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<WidgetConfig>({
    primaryColor: '#0066cc',
    position: 'bottom-right',
    greeting: 'Hello! How can I help you today?',
    businessName: 'ABC Real Estate',
  });

  useEffect(() => {
    // Read configuration from URL parameters
    const primaryColor = searchParams.get('primaryColor');
    const position = searchParams.get('position') as WidgetConfig['position'];
    const greeting = searchParams.get('greeting');
    const businessName = searchParams.get('businessName');

    setConfig({
      primaryColor: primaryColor ? `#${primaryColor}` : '#0066cc',
      position: position || 'bottom-right',
      greeting: greeting || 'Hello! How can I help you today?',
      businessName: businessName || 'ABC Real Estate',
    });
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-transparent">
      <ChatBubble
        onClick={() => setIsOpen(true)}
        primaryColor={config.primaryColor}
        position={config.position}
        isOpen={isOpen}
      />
      <ChatWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        primaryColor={config.primaryColor}
        position={config.position}
        businessName={config.businessName}
        greeting={config.greeting}
      />
    </div>
  );
}

export default function WidgetPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-transparent" />}>
      <WidgetContent />
    </Suspense>
  );
}
