import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TranslatorAgent } from './agents/translator.agent';
import { CodeGenAgent } from './agents/codegen.agent';
import { CoordinatorAgent } from './agents/coordinator.agent';

@Module({
  controllers: [AppController],
  providers: [
    {
      provide: TranslatorAgent,
      useFactory: () => {
        const apiKey = process.env.OPENAI_API_KEY || '';
        return new TranslatorAgent(apiKey);
      },
    },
    {
      provide: CodeGenAgent,
      useFactory: () => {
        const apiKey = process.env.OPENAI_API_KEY || '';
        return new CodeGenAgent(apiKey);
      },
    },
    {
      provide: CoordinatorAgent,
      useFactory: (translator: TranslatorAgent, codeGen: CodeGenAgent) => {
        return new CoordinatorAgent(translator, codeGen);
      },
      inject: [TranslatorAgent, CodeGenAgent],
    },
  ],
})
export class AppModule { }
