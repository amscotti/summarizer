import { getExtractor } from "./extractors/extract.ts";
import { DEFAULT_MODEL, DEFAULT_SUMMARY_SIZE } from "./utils/constants.ts";
import { AnthropicModel, SummarySize } from "./utils/types.ts";
import { claude } from "./provider/anthropic.ts";
import { getPrompt } from "./prompts/summaryPrompt.ts";
import { readAllSync } from "../deps.ts";

type Options = {
  modelName?: AnthropicModel;
  summarySize?: SummarySize;
  streaming?: boolean;
};

export async function fromURL(options: Options, url: string) {
  try {
    const extractor = getExtractor(url);
    const text = await extractor.extractText();
    await main(options, text);
  } catch (_error) {
    console.error("Error: Unable to extract text from the provided URL.");
    Deno.exit(1);
  }
}

export async function fromStdin(options: Options) {
  const decoder = new TextDecoder();
  const rawInput = readAllSync(Deno.stdin);
  const text = decoder.decode(rawInput);

  await main(options, text);
}

async function main(
  {
    modelName = DEFAULT_MODEL,
    summarySize = DEFAULT_SUMMARY_SIZE,
    streaming = false,
  }: Options,
  text: string,
) {
  if (!Deno.env.has("ANTHROPIC_API_KEY")) {
    console.error("Error: ANTHROPIC_API_KEY environment variable is not set.");
    Deno.exit(1);
  }

  const llmChain = getPrompt(summarySize).pipe(claude(modelName, streaming));

  const results = await llmChain.invoke({ text });
  if (!streaming) {
    await Deno.stdout.write(
      new TextEncoder().encode(results.content.toString()),
    );
  }

  Deno.exit(0);
}
