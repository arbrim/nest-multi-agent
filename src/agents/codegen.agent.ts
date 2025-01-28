// src/agents/codegen.agent.ts

import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';

export class CodeGenAgent {
  private openai: OpenAI;

  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }

  /**
   * Generate multiple Nest + TypeORM files based on user instructions,
   * then write them to `src/<...>` subfolders automatically.
   */
  async generateNestTypeORMCode(requestText: string): Promise<string> {
    // src/agents/codegen.agent.ts (excerpt)
    // v1
    //     const systemPrompt = `
    // You are a code-generation agent for NestJS + TypeORM.
    // The user wants to generate an entity, repository, service, and controller
    // with real CRUD (Create/Read/Update/Delete) logic.

    // Constraints:
    //   - Use @InjectRepository, Repository from '@nestjs/typeorm' and 'typeorm'.
    //   - The service should have methods: create(data), findAll(), findOne(id), update(id, data), remove(id).
    //   - The controller should expose typical endpoints, e.g. POST /, GET /, GET /:id, PATCH /:id, DELETE /:id 
    //     using Nest's decorators: @Post, @Get, @Patch, @Delete, etc.
    //   - The repository can be a custom repository or a standard TypeORM approach.
    //   - Output code in the format:
    //       === src/entity/employee.entity.ts ===
    //       \`\`\`typescript
    //       // ...
    //       \`\`\`
    //       (and so on)

    // DO NOT just add placeholder comments. Insert real code for each CRUD method.
    // Return only code blocks, no commentary.
    // `;

    const systemPrompt = `
      You are a code-generation agent for NestJS + TypeORM.
      The user wants an entity, repository, service, and controller with strict
      TypeScript null checks enabled ("strictNullChecks": true in tsconfig).
      
      - If a method might return null, reflect that in the return type (e.g. "Promise<Employee | null>").
      - Or if you need a guaranteed non-null, use findOneOrFail() or throw an error if findOne() returns null.
      - Code must compile without TS errors.

      Example fix:
        async findOne(id: number): Promise<Employee | null> {
          return this.employeeRepository.findOne({ where: { id } });
        }

        // or throw if not found:
        async findOneStrict(id: number): Promise<Employee> {
          const result = await this.employeeRepository.findOne({ where: { id } });
          if (!result) {
            throw new Error('Employee not found');
          }
          return result;
        }

      Return only code, no extra commentary or placeholders.
    `;



    // 1. Call the LLM
    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // or 'gpt-4'
      messages: [
        { role: 'system', content: systemPrompt.trim() },
        { role: 'user', content: requestText.trim() },
      ],
    });

    const fullOutput = response.choices[0].message?.content ?? '';

    // 2. Parse out the code blocks and write them to disk
    const filesWritten = this.parseAndWriteFiles(fullOutput);

    // Return a summary string
    return `Generated code. Files created:\n${filesWritten.join('\n')}`;
  }

  /**
   * Scans the LLM output for sections in the format:
   *    === src/path/to/file.ts ===
   *    ```typescript
   *    (code)
   *    ```
   * Then writes each file to the specified path under project root.
   */
  private parseAndWriteFiles(llmOutput: string): string[] {
    // We'll split on lines that start with "===" to find file blocks
    // Example chunk:
    // "=== src/entity/employee.entity.ts ===\n```typescript\n ...code...\n```"
    //
    // For robust extraction, we'll use a regex approach.

    // We'll store results in an array of { filename, content }
    const fileBlocks: Array<{ filename: string; content: string }> = [];

    // This regex captures:
    // (1) a line that starts with "===" (then spaces) then a path, then "==="
    // (2) everything up until the next "===" or the end of string
    //
    // We'll do a global match, capturing groups:
    //   group(1) => filename
    //   group(2) => code block text
    const regex = /===\s*([^\n]+?)\s*===([\s\S]*?)(?===|$)/g;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(llmOutput)) !== null) {
      // match[1] => "src/entity/employee.entity.ts"
      // match[2] => the block containing "```typescript ... ```"
      const filename = match[1].trim();
      let fileContent = match[2].trim();

      // Remove any triple-backtick fences
      fileContent = fileContent
        .replace(/```typescript/g, '')
        .replace(/```ts/g, '')
        .replace(/```/g, '')
        .trim();

      fileBlocks.push({ filename, content: fileContent });
    }

    // Now we actually write these to the filesystem
    const writtenFiles: string[] = [];
    for (const block of fileBlocks) {
      const outPath = path.join(process.cwd(), block.filename);
      // Ensure the directory exists
      fs.mkdirSync(path.dirname(outPath), { recursive: true });

      fs.writeFileSync(outPath, block.content, 'utf-8');
      writtenFiles.push(block.filename);
    }

    return writtenFiles;
  }
}
