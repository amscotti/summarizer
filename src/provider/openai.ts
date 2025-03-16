import { ChatOpenAI } from "@langchain/openai";
import type { OpenAIModelType } from "../utils/types.ts";

const encoder = new TextEncoder();

/**
 * Creates an instance of ChatOpenAI with the specified model name and streaming option.
 */
export function gpt(model: OpenAIModelType, streaming: boolean): ChatOpenAI {
  return new ChatOpenAI({
    model,
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
