import { TranslatorAgent } from './translator.agent';

export class CoordinatorAgent {
  constructor(private readonly translatorAgent: TranslatorAgent) {}

  /**
   * Decide how to handle user tasks. For now, it's a simple pass-through
   * to the translator. But you could expand to parse user requests and call
   * different specialized agents as needed.
   */
  async handleTranslationRequest(englishText: string): Promise<string> {
    // For example, you might have logic here to see if the text is English,
    // or to pick a different language. We'll keep it simple.
    const result = await this.translatorAgent.translateToAlbanian(englishText);
    return result;
  }
}
