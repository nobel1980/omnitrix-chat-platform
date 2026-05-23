export class EscalationService {
  public async escalate(sessionId: string) {
    return { status: 'ESCALATED' };
  }
}
