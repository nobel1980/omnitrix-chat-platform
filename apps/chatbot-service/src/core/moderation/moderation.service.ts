export class ModerationService {
  public async isSafe(text: string): Promise<boolean> {
    const profanities = ['abuse_word_placeholder1', 'abuse_word_placeholder2'];
    return !profanities.some(word => text.toLowerCase().includes(word));
  }
}
