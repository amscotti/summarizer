import { Command, CommanderError } from "commander";
import { fromStdin, fromURL, summarize } from "./main.ts";
import {
  DEFAULT_SUMMARY_SIZE,
  SummarySize,
  type SummarySizeType,
} from "./utils/types.ts";

interface Options {
  summarySize: SummarySizeType;
  streaming: boolean;
}

function parseSummarySize(value: string): SummarySizeType {
  const validSizes = Object.values(SummarySize) as string[];
  if (!validSizes.includes(value)) {
    throw new CommanderError(
      1,
      "commander.invalidArgument",
      `Invalid summary size: ${value}. Valid options: ${validSizes.join(", ")}`,
    );
  }
  return value as SummarySizeType;
}

async function getText(url: string | undefined): Promise<string | null> {
  if (url) {
    return fromURL(url);
  }
  if (process.stdin.isTTY === undefined) {
    return fromStdin();
  }
  return null;
}

const program = new Command();

program
  .name("summarizer")
  .description("Summarize articles and other content using AI")
  .argument("[url]", "URL to summarize (or pipe text via stdin)")
  .option(
    "-s, --summary-size <size>",
    "Summary size: short, medium, long (default: long)",
    parseSummarySize,
    DEFAULT_SUMMARY_SIZE,
  )
  .option("--no-streaming", "Disable streaming output")
  .action(async (url: string | undefined, options: Options) => {
    const text = await getText(url);
    if (!text) {
      program.help();
      return;
    }
    await summarize(text, options.summarySize, options.streaming);
  });

program.parse();
