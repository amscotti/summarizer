import { ChatAnthropic } from "@langchain/anthropic";
import { AnthropicModel } from "../utils/types.ts";

const encoder = new TextEncoder();

/**
 * Creates an instance of ChatAnthropic with specified model and settings.
 */
export function claude(modelName: AnthropicModel, streaming: boolean) {
  return new ChatAnthropic({
    modelName,
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
