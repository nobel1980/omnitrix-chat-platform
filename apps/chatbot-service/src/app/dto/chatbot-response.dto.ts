export interface ChatbotResponseDto {
  messageId: string;
  sessionId: string;
  reply: string;
  intent?: string;
  sentiment?: string;
  escalate: boolean;
}
