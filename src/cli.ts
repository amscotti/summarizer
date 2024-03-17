import { Command, EnumType } from "../deps.ts";
import { DEFAULT_MODEL, DEFAULT_SUMMARY_SIZE } from "./utils/constants.ts";
import { AnthropicModel, SummarySize } from "./utils/types.ts";

import { fromStdin, fromURL } from "./main.ts";

const isPipedInput = !Deno.stdin.isTerminal();

const AnthropicModelType = new EnumType(AnthropicModel);
const SummarySizeType = new EnumType(SummarySize);

const command = new Command()
  .name("Summarizer")
  .description("Command line tool to summarize articles and other content")
  .type("AnthropicModel", AnthropicModelType)
  .option("-m, --model-name <name:AnthropicModel>", "The Claude model name", {
    default: DEFAULT_MODEL,
  })
  .type("SummarySize", SummarySizeType)
  .option("-s, --summary-size <size:SummarySize>", "Desired size for summary", {
    default: DEFAULT_SUMMARY_SIZE,
  })
  .option("--no-streaming", "Disable streaming of summary")
  .arguments("[url:string]")
  .action(async (options, url: string | undefined) => {
    if (url) {
      await fromURL(options, url);
    } else if (isPipedInput) {
      await fromStdin(options);
    } else {
      command.showHelp();
      Deno.exit(1);
    }
  });

await command.parse(Deno.args);
