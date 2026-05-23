import OpenAI from 'openai';
import { env } from '../../config/env.config';

export class OpenAiProvider {
  private client: OpenAI | null = null;

  constructor() {
    if (env.OPENAI_API_KEY && env.OPENAI_API_KEY !== 'your-openai-api-key') {
      this.client = new OpenAI({ apiKey: env.OPENAI_API_KEY });
    }
  }

  public async complete(prompt: string): Promise<string> {
    if (!this.client) {
      return 'OpenAI client not configured.';
    }
    const response = await this.client.chat.completions.create({
      model: env.AI_MODEL,
      messages: [{ role: 'user', content: prompt }],
    });
    return response.choices[0]?.message?.content || '';
  }
}
