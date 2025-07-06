import type { AIMessage } from "@langchain/core/messages";
import type { StringPromptValueInterface } from "@langchain/core/prompt_values";
import type { RunnableLike } from "@langchain/core/runnables";
import { getExtractor } from "./extractors/extract.ts";
import { getPrompt } from "./prompts/summaryPrompt.ts";
import { claude } from "./provider/anthropic.ts";
import { gemini } from "./provider/google.ts";
import { gpt } from "./provider/openai.ts";
import type {
  AnthropicOptions,
  GoogleOptions,
  OpenAIOptions,
} from "./utils/types.ts";
import {
  mapAnthropicModel,
  mapGoogleModel,
  mapOpenAIModel,
} from "./utils/types.ts";

// Suppress or override tiktoken-related console warnings
// This overrides console.warn to filter out the specific tiktoken error messages
const originalWarn = console.warn;
console.warn = function filteredWarn(...args) {
  // Skip tiktoken-related warnings
  if (
    args.length > 0 &&
    typeof args[0] === "string" &&
    (args[0].includes("Failed to calculate number of tokens") ||
      args[0].includes("tiktoken") ||
      args[0].includes("Unknown model"))
  ) {
    // Silently ignore these warnings
    return;
  }

  // Pass through all other warnings
  originalWarn.apply(console, args);
};

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
    claude(
      mapAnthropicModel(options.modelName),
      options.streaming,
    ) as RunnableLike<StringPromptValueInterface, AIMessage>,
  );

  const results: AIMessage = await llmChain.invoke({ text });
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
    gpt(mapOpenAIModel(options.modelName), options.streaming) as RunnableLike<
      StringPromptValueInterface,
      AIMessage
    >,
  );

  const results: AIMessage = await llmChain.invoke({ text });
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

  const llmChain = getPrompt(options.summarySize).pipe(
    gemini(
      mapGoogleModel(options.modelName),
      options.streaming,
    ) as RunnableLike<StringPromptValueInterface, AIMessage>,
  );

  await llmChain.invoke({ text });
  process.exit(0);
}
