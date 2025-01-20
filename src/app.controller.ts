// src/app.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { CoordinatorAgent } from './agents/coordinator.agent';

@Controller()
export class AppController {
  constructor(private readonly coordinatorAgent: CoordinatorAgent) { }

  @Post('agent')
  async handleRequest(@Body('text') text: string) {
    if (!text || !text.trim()) {
      return { result: '' };
    }

    // Let the coordinator decide which agent to call
    const result = await this.coordinatorAgent.handleUserRequest(text);
    return { result };
  }
}
