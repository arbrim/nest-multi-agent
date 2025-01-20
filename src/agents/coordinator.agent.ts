// src/agents/coordinator.agent.ts
import { TranslatorAgent } from './translator.agent';
import { CodeGenAgent } from './codegen.agent';

export class CoordinatorAgent {
  constructor(
    private readonly translatorAgent: TranslatorAgent,
    private readonly codeGenAgent: CodeGenAgent,
  ) {}

  async handleUserRequest(requestText: string): Promise<string> {
    // Naive approach: decide which agent to use based on certain keywords:
    const lower = requestText.toLowerCase();

    // If the request mentions "translate", we assume we want translation:
    if (lower.includes('translate') || lower.includes('albanian')) {
      return this.translatorAgent.translateToAlbanian(requestText);
    }

    // If the request mentions "entity", "repository", or "service" etc., we assume code generation:
    if (
      lower.includes('entity') ||
      lower.includes('repository') ||
      lower.includes('controller') ||
      lower.includes('service')
    ) {
      return this.codeGenAgent.generateNestTypeORMCode(requestText);
    }

    // Otherwise, default to a message that we can't handle it:
    return `Sorry, I'm not sure how to handle this request yet. Try including "translate" or "entity/repository/service/controller".`;
  }
}
