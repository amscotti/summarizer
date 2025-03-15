export const AnthropicModel = {
  Opus: "claude-3-opus-latest",
  Sonnet: "claude-3-7-sonnet-latest",
  Haiku: "claude-3-5-haiku-latest",
} as const;

export const OpenAIModel = {
  gpt45preview: "gpt-4.5-preview",
  o3mini: "o3-mini",
  gpt4o: "gpt-4o",
  gp4omini: "gpt-4o-mini",
} as const;

export const GoogleModel = {
  pro: "gemini-2.0-pro-exp-02-05",
  flash: "gemini-2.0-flash",
} as const;

export const SummarySize = {
  Short: "short",
  Medium: "medium",
  Long: "long",
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
