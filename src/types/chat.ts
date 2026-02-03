export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface WidgetConfig {
  primaryColor?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  greeting?: string;
  businessName?: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
  config?: WidgetConfig;
}

export interface ChatResponse {
  message: string;
  error?: string;
}
