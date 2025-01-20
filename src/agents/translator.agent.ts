// translator.agent.ts
import OpenAI from 'openai';

export class TranslatorAgent {
  private openai: OpenAI;

  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }

  async translateToAlbanian(englishText: string): Promise<string> {
    const systemPrompt = `
      You are a literal translator from English to Albanian.
      Translate the user's text word-for-word to Albanian if possible.
      Do not omit or add extra words, and do not change the meaning.
      Respond ONLY with the translated text, no commentary.
    `;


    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt.trim() },
        { role: 'user', content: englishText.trim() },
      ],
    });

    return response.choices[0].message?.content?.trim() || '';
  }
}
