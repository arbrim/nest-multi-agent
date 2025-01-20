import { Controller, Post, Body } from '@nestjs/common';
import { CoordinatorAgent } from './agents/coordinator.agent';

@Controller()
export class AppController {
  constructor(private readonly coordinatorAgent: CoordinatorAgent) {}

  @Post('translate')
  async translate(@Body('text') text: string) {
    // Return empty translation if user didn't pass any text
    if (!text || !text.trim()) {
      return { translation: '' };
    }

    // Delegate translation to your multi-agent system
    const translation = await this.coordinatorAgent.handleTranslationRequest(text);
    return { translation };
  }
}
