import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoordinatorAgent } from './agents/coordinator.agent';
import { TranslatorAgent } from './agents/translator.agent';

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
      provide: CoordinatorAgent,
      useFactory: (translator: TranslatorAgent) => {
        return new CoordinatorAgent(translator);
      },
      inject: [TranslatorAgent],
    },
  ],
})
export class AppModule { }
