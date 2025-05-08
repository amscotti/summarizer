export const AnthropicModel = {
  Opus: "claude-3-opus-latest",
  Sonnet: "claude-3-7-sonnet-latest",
  Haiku: "claude-3-5-haiku-latest",
} as const;

export const OpenAIModel = {
  gpt41: "gpt-4.1",
  gpt41mini: "gpt-4.1-mini",
  gpt41nano: "gpt-4.1-nano",
  gpt4o: "gpt-4o",
  o3: "o3",
  o4mini: "o4-mini",
} as const;

export const GoogleModel = {
  pro: "gemini-2.5-pro-preview-05-06",
  flash: "gemini-2.5-flash-preview-04-17",
} as const;

export const SummarySize = {
  short: "short",
  medium: "medium",
  long: "long",
} as const;

export interface TextExtractor {
  extractText(): Promise<string>;
}

export type AnthropicModelType =
  (typeof AnthropicModel)[keyof typeof AnthropicModel];
export type OpenAIModelType = (typeof OpenAIModel)[keyof typeof OpenAIModel];
export type GoogleModelType = (typeof GoogleModel)[keyof typeof GoogleModel];
export type SummarySizeType = (typeof SummarySize)[keyof typeof SummarySize];

export type AnthropicOptions = {
  modelName: AnthropicModelType;
  summarySize: SummarySizeType;
  streaming: boolean;
};

export type OpenAIOptions = {
  modelName: OpenAIModelType;
  summarySize: SummarySizeType;
  streaming: boolean;
};

export type GoogleOptions = {
  modelName: GoogleModelType;
  summarySize: SummarySizeType;
  streaming: boolean;
};
