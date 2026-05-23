export interface AIResponse {
  reply: string;
  intent: string;
  confidence: number;
  sentiment: string;
  entities: Record<string, any>;
  shouldEscalate: boolean;
}

export interface ChatContext {
  sessionId: string;
  customerId: string;
  message: string;
  history?: string;
}
