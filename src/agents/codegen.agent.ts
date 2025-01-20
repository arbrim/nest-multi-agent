// src/agents/codegen.agent.ts
import OpenAI from 'openai';

export class CodeGenAgent {
  private openai: OpenAI;

  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }

  /**
   * Generate multiple Nest + TypeORM files based on user instructions.
   * For example, "I want an Employee entity with attributes: id, firstName, lastName, salary."
   */
  async generateNestTypeORMCode(requestText: string): Promise<string> {
    // The system prompt sets the agent's role: produce valid Nest/TypeORM code
    const systemPrompt = `
      You are a code-generation agent for NestJS + TypeORM.
      The user wants to generate an entity, repository, service, and controller.
      Output only the final TypeScript code. No additional commentary or explanation.
      
      Make sure to use standard NestJS + TypeORM imports:
        - @Entity, @Column, @PrimaryGeneratedColumn from 'typeorm'
        - @Injectable for service
        - @Controller for controller
        - Provide standard CRUD methods: create, findAll, findOne, remove (or similar).
      
      You may return multiple files if needed, separated by clear headers, e.g.:
      === employee.entity.ts ===
      <code>
      === employee.repository.ts ===
      <code>
      === employee.service.ts ===
      <code>
      === employee.controller.ts ===
      <code>
    `;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt.trim() },
        { role: 'user', content: requestText.trim() },
      ],
    });

    // Return the code as a string, which we’ll pass back to the CoordinatorAgent
    return response.choices[0].message?.content?.trim() || '';
  }
}
