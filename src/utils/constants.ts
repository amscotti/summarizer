import {
  AnthropicModel,
  GoogleModel,
  OpenAIModel,
  SummarySize,
} from "./types.ts";

export const DEFAULT_ANTHROPIC_MODEL = AnthropicModel.sonnet;
export const DEFAULT_OPENAI_MODEL = OpenAIModel.gpt41mini;
export const DEFAULT_GOOGLE_MODEL = GoogleModel.flash;
export const DEFAULT_SUMMARY_SIZE = SummarySize.long;

export const HEADERS = new Headers({
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
});
