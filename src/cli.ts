import { Command, CommanderError } from "commander";
import {
  DEFAULT_ANTHROPIC_MODEL,
  DEFAULT_OPENAI_MODEL,
  DEFAULT_GOOGLE_MODEL,
  DEFAULT_SUMMARY_SIZE,
} from "./utils/constants";
import {
  anthropicCall,
  fromStdin,
  fromURL,
  openaiCall,
  googleCall,
} from "./main";
import {
  SummarySize,
  OpenAIModel,
  AnthropicModel,
  GoogleModel,
} from "./utils/types";
import type {
  AnthropicOptions,
  OpenAIOptions,
  GoogleOptions,
} from "./utils/types";

const isPipedInput = process.stdin.isTTY === undefined;

const convertToEnum = (values: string[]) => (value: string) => {
  if (!values.includes(value)) {
    throw new CommanderError(
      1,
      "commander.invalidArgument",
      `Invalid value: ${value}`,
    );
  }
  return value;
};

class MyRootCommand extends Command {
  createCommand(name: string) {
    const cmd = new Command(name);
    cmd
      .description("Command line tool to summarize articles and other content")
      .option(
        "-s, --summary-size <size>",
        "Desired size for summary",
        convertToEnum([
          SummarySize.Short,
          SummarySize.Medium,
          SummarySize.Long,
        ]),
        DEFAULT_SUMMARY_SIZE,
      )
      .option("--no-streaming", "Disable streaming of summary");
    return cmd;
  }
}

const program = new MyRootCommand();

program
  .command("anthropic")
  .arguments("[url]")
  .option(
    "-m, --model-name <name>",
    "The Anthropic model name",
    convertToEnum([
      AnthropicModel.Haiku,
      AnthropicModel.Sonnet,
      AnthropicModel.Opus,
    ]),
    DEFAULT_ANTHROPIC_MODEL,
  )
  .description("Using Anthropic models")
  .action(async (url: string | undefined, options: AnthropicOptions) => {
    if (url) {
      const text = await fromURL(url);
      await anthropicCall(options, text);
    } else if (isPipedInput) {
      await anthropicCall(options, await fromStdin());
    } else {
      program.help();
      process.exit(1);
    }
  });

program
  .command("openai")
  .arguments("[url]")
  .option(
    "-m, --model-name <name>",
    "The OpenAI model name",
    convertToEnum([
      OpenAIModel.gpt35turbo,
      OpenAIModel.gpt4turbo,
      OpenAIModel.gpt4o,
    ]),
    DEFAULT_OPENAI_MODEL,
  )
  .description("Using OpenAI models")
  .action(async (url: string | undefined, options: OpenAIOptions) => {
    if (url) {
      const text = await fromURL(url);
      await openaiCall(options, text);
    } else if (isPipedInput) {
      await openaiCall(options, await fromStdin());
    } else {
      program.help();
      process.exit(1);
    }
  });

program
  .command("google")
  .arguments("[url]")
  .option(
    "-m, --model-name <name>",
    "The Google model name",
    convertToEnum([GoogleModel.gemini15flash, GoogleModel.gemini15pro]),
    DEFAULT_GOOGLE_MODEL,
  )
  .description("Using Google models")
  .action(async (url: string | undefined, options: GoogleOptions) => {
    if (url) {
      const text = await fromURL(url);
      await googleCall(options, text);
    } else if (isPipedInput) {
      await googleCall(options, await fromStdin());
    } else {
      program.help();
      process.exit(1);
    }
  });

program.parse(process.argv);
