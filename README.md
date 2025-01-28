# nest-multi-agent


# NestJS Multi-Agent Translation Example

## Just haning around with AI using nestjs...

A simple multi-agent demonstration using NestJS and the OpenAI API to translate English text to Albanian.  
It has two agents:
- **TranslatorAgent:** Responsible for making OpenAI API calls and translating from English to Albanian.
- **CoordinatorAgent:** Could coordinate multiple agents, but here it mainly just calls the TranslatorAgent.

## Usage

1. **Clone this repository** (or copy the files).
2. **Install dependencies**:

```bash
npm install
```

Create a .env file in the project root (based on .env.example):

```bash
cp .env.example .env
```

Add your own OpenAI API key:

```bash
OPENAI_API_KEY=sk-xxxx-your-api-key
```

Start the server
```bash
npm run start
```




