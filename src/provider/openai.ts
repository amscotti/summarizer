import { ChatOpenAI } from "@langchain/openai";
import { OpenAIModel } from "../utils/types.ts";

const encoder = new TextEncoder();

/**
 * Creates an instance of ChatOpenAI with the specified model name and streaming option.
 */
export function gpt(modelName: OpenAIModel, streaming: boolean) {
  return new ChatOpenAI({
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
