import { getExtractor } from "./extractors/extract.ts";
import type {
  AnthropicOptions,
  OpenAIOptions,
  GoogleOptions,
} from "./utils/types.ts";
import { claude } from "./provider/anthropic.ts";
import { gpt } from "./provider/openai.ts";
import { gemini } from "./provider/google.ts";
import { getPrompt } from "./prompts/summaryPrompt.ts";

export async function fromURL(url: string): Promise<string> {
  const extractor = getExtractor(url);
  return await extractor.extractText();
}

export async function fromStdin(): Promise<string> {
  return await Bun.stdin.text();
}

export async function anthropicCall(
  options: AnthropicOptions,
  text: string,
): Promise<void> {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("Error: ANTHROPIC_API_KEY environment variable is not set.");
    process.exit(1);
  }

  const llmChain = getPrompt(options.summarySize).pipe(
    claude(options.modelName, options.streaming),
  );

  const results = await llmChain.invoke({ text });
  if (!options.streaming) {
    await Bun.write(
      Bun.stdout,
      new TextEncoder().encode(results.content.toString()),
    );
  }

  process.exit(0);
}

export async function openaiCall(
  options: OpenAIOptions,
  text: string,
): Promise<void> {
  if (!process.env.OPENAI_API_KEY) {
    console.error("Error: OPENAI_API_KEY environment variable is not set.");
    process.exit(1);
  }

  const llmChain = getPrompt(options.summarySize).pipe(
    gpt(options.modelName, options.streaming),
  );

  const results = await llmChain.invoke({ text });
  if (!options.streaming) {
    await Bun.write(
      Bun.stdout,
      new TextEncoder().encode(results.content.toString()),
    );
  }

  process.exit(0);
}

export async function googleCall(
  options: GoogleOptions,
  text: string,
): Promise<void> {
  if (!process.env.GOOGLE_API_KEY) {
    console.error("Error: GOOGLE_API_KEY environment variable is not set.");
    process.exit(1);
  }

  // Disable streaming for Google
  options.streaming = false;

  const llmChain = getPrompt(options.summarySize).pipe(
    gemini(options.modelName, options.streaming),
  );

  const results = await llmChain.invoke({ text });
  if (!options.streaming) {
    await Bun.write(
      Bun.stdout,
      new TextEncoder().encode(results.content.toString()),
    );
  }

  process.exit(0);
}
