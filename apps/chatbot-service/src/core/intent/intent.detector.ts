import { DetectedIntent } from './intent.types';

export class IntentDetector {
  public async detect(text: string): Promise<DetectedIntent> {
    const formatted = text.toLowerCase();
    if (formatted.includes('agent') || formatted.includes('human') || formatted.includes('representative')) {
      return 'escalate_agent';
    }
    if (formatted.includes('hours') || formatted.includes('time') || formatted.includes('open')) {
      return 'inquire_hours';
    }
    if (formatted.includes('order') || formatted.includes('buy') || formatted.includes('refund')) {
      return 'order_issue';
    }
    return 'general';
  }
}
