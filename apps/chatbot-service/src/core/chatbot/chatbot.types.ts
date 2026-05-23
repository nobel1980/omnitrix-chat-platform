export interface MessageContext {
  sessionId: string;
  customerId: string;
  rawText: string;
  timestamp: Date;
}

export interface EngineResult {
  reply: string;
  intent?: string;
  sentiment?: string;
  escalate: boolean;
}
