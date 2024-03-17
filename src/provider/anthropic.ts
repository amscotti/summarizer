import { ChatAnthropic } from "../../deps.ts";
import { AnthropicModel } from "../utils/types.ts";

const encoder = new TextEncoder();

export function claude(modelName: AnthropicModel, streaming: boolean) {
  return new ChatAnthropic({
    modelName,
    temperature: 0.5,
    streaming,
    callbacks: [
      {
        async handleLLMNewToken(token: string) {
          await Deno.stdout.write(encoder.encode(token));
        },
      },
    ],
  });
}
