import React from 'react';
import { ChatMessage as ChatMessageType } from '@/types/chat';
import CalendlyEmbed from './CalendlyEmbed';

interface ChatMessageProps {
  message: ChatMessageType;
  primaryColor?: string;
}

export default function ChatMessage({ message, primaryColor = '#0066cc' }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const time = new Date(message.timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  // Check if message contains Calendly marker
  const calendlyMatch = message.content.match(/\[CALENDLY:(https:\/\/calendly\.com\/[^\]]+)\]/);
  const hasCalendly = calendlyMatch !== null;
  const calendlyUrl = calendlyMatch ? calendlyMatch[1] : '';
  const messageContent = message.content.replace(/\[CALENDLY:[^\]]+\]/g, '').trim();

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in`}
    >
      <div className={`flex flex-col ${isUser ? 'max-w-[80%] items-end' : 'w-full items-start'}`}>
        {messageContent && (
          <div
            className={`rounded-2xl px-4 py-2 shadow-sm ${
              isUser
                ? 'rounded-br-none'
                : 'rounded-bl-none bg-gray-100'
            }`}
            style={isUser ? { backgroundColor: primaryColor, color: '#ffffff' } : {}}
          >
            <p className="text-sm whitespace-pre-wrap break-words">{messageContent}</p>
          </div>
        )}
        {hasCalendly && !isUser && (
          <div className="mt-2 w-full max-w-[380px]">
            <CalendlyEmbed url={calendlyUrl} />
          </div>
        )}
        <span className="text-xs text-gray-400 mt-1 px-2">{time}</span>
      </div>
    </div>
  );
}
