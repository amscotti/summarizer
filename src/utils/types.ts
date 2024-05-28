export enum AnthropicModel {
  Opus = "claude-3-opus-20240229",
  Sonnet = "claude-3-sonnet-20240229",
  Haiku = "claude-3-haiku-20240307",
}

export enum OpenAIModel {
  gpt4o = "gpt-4o",
  gpt4turbo = "gpt-4-turbo",
  gpt35turbo = "gpt-3.5-turbo",
}

export enum GoogleModel {
  gemini15pro = "gemini-1.5-pro",
  gemini15flash = "gemini-1.5-flash",
  gemini10pro = "gemini-1.0-pro",
}

export enum SummarySize {
  Short = "short",
  Medium = "medium",
  Long = "long",
}

export interface TextExtractor {
  extractText(): Promise<string>;
}

export type AnthropicOptions = {
  modelName: AnthropicModel;
  summarySize: SummarySize;
  streaming: boolean;
};

export type OpenAIOptions = {
  modelName: OpenAIModel;
  summarySize: SummarySize;
  streaming: boolean;
};

export type GoogleOptions = {
  modelName: GoogleModel;
  summarySize: SummarySize;
  streaming: boolean;
};

export interface TextExtractor {
  extractText(): Promise<string>;
}
