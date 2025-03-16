import { ChatAnthropic } from "@langchain/anthropic";
import type { AnthropicModelType } from "../utils/types.ts";

const encoder = new TextEncoder();

/**
 * Creates an instance of ChatAnthropic with specified model and settings.
 */
export function claude(
  model: AnthropicModelType,
  streaming: boolean,
): ChatAnthropic {
  return new ChatAnthropic({
    model,
    temperature: 0.5,
    streaming,
    callbacks: [
      {
        async handleLLMNewToken(token: string) {
          await Bun.write(Bun.stdout, encoder.encode(token));
        },
      },
    ],
  });
}
