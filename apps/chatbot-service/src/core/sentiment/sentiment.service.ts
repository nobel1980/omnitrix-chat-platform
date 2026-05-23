export class SentimentService {
  public async analyze(text: string): Promise<string> {
    const angryWords = ['angry', 'mad', 'hate', 'terrible', 'worst'];
    if (angryWords.some(word => text.toLowerCase().includes(word))) {
      return 'very_angry';
    }
    return 'neutral';
  }
}
