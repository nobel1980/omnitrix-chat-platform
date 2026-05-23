import { env } from '../../config/env.config';
import { logger } from '../../infrastructure/logger/logger';
import OpenAI from "openai";

export class AIProvider {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  async chat(systemPrompt: string, userPrompt: string) {
    const response = await this.client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.4
    });

    return response.choices[0]?.message?.content || "";
  }
}

export class AiGateway {
  public async generate(prompt: string): Promise<string> {
    logger.debug(`Generating LLM response for: ${prompt.substring(0, 30)}...`);
    // Placeholder - returns simple bot answer in absence of OpenAI credentials
    if (!env.OPENAI_API_KEY || env.OPENAI_API_KEY === 'your-openai-api-key') {
      return `[Mock AI Response] Thank you for your message: "${prompt}". How else can I assist you?`;
    }
    return `[Mock AI Response] OpenAI integration active.`;
  }
}
