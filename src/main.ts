import { generateText, streamText } from "ai";
import { getExtractor } from "./extractors/extract.ts";
import { buildPrompt } from "./prompts/summaryPrompt.ts";
import { getAvailableProvider } from "./provider/models.ts";
import type { SummarySizeType } from "./utils/types.ts";

export async function fromURL(url: string): Promise<string> {
  const extractor = getExtractor(url);
  return await extractor.extractText();
}

export async function fromStdin(): Promise<string> {
  return await Bun.stdin.text();
}

export async function summarize(
  text: string,
  summarySize: SummarySizeType,
  streaming: boolean,
): Promise<void> {
  const provider = getAvailableProvider();
  const { system, prompt } = buildPrompt(summarySize, text);

  if (streaming) {
    const result = streamText({
      model: provider.model,
      system,
      prompt,
    });

    for await (const chunk of result.textStream) {
      await Bun.write(Bun.stdout, new TextEncoder().encode(chunk));
    }
  } else {
    const { text: output } = await generateText({
      model: provider.model,
      system,
      prompt,
    });
    await Bun.write(Bun.stdout, new TextEncoder().encode(output));
  }

  process.exit(0);
}
