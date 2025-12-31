import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { xai } from "@ai-sdk/xai";
import type { LanguageModel } from "ai";

export interface ProviderConfig {
  name: string;
  model: LanguageModel;
  envKey: string;
}

const PROVIDERS: ProviderConfig[] = [
  {
    name: "Anthropic",
    model: anthropic("claude-haiku-4-5"),
    envKey: "ANTHROPIC_API_KEY",
  },
  {
    name: "Google",
    model: google("gemini-3-flash-preview"),
    envKey: "GOOGLE_API_KEY",
  },
  {
    name: "xAI",
    model: xai("grok-4-1-fast-non-reasoning"),
    envKey: "XAI_API_KEY",
  },
  {
    name: "OpenAI",
    model: openai("gpt-5-mini"),
    envKey: "OPENAI_API_KEY",
  },
];

export function getAvailableProvider(): ProviderConfig {
  const provider = PROVIDERS.find((p) => process.env[p.envKey]);
  if (!provider) {
    console.error("Error: No AI provider API key found.");
    console.error(
      "Set one of: ANTHROPIC_API_KEY, GOOGLE_API_KEY, XAI_API_KEY, OPENAI_API_KEY",
    );
    process.exit(1);
  }
  return provider;
}
