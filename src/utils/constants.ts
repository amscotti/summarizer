import { AnthropicModel, SummarySize } from "./types.ts";

export const DEFAULT_MODEL = AnthropicModel.Sonnet;
export const DEFAULT_SUMMARY_SIZE = SummarySize.Long;

export const HEADERS = new Headers({
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
});
