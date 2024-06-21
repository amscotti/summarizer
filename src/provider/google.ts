import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { GoogleModel } from "../utils/types.ts";

const encoder = new TextEncoder();

/**
 * Creates an instance of ChatGoogleGenerativeAI with specified model and settings.
 */
export function gemini(
  modelName: GoogleModel,
  streaming: boolean,
): ChatGoogleGenerativeAI {
  return new ChatGoogleGenerativeAI({
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
