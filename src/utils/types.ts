export enum AnthropicModel {
  Opus = "claude-3-opus-20240229",
  Sonnet = "claude-3-sonnet-20240229",
  Haiku = "claude-3-haiku-20240307",
}

export enum SummarySize {
  Short = "short",
  Medium = "medium",
  Long = "long",
}

export interface TextExtractor {
  extractText(): Promise<string>;
}
