export const AnthropicModel = {
  opus: "claude-opus-4-20250514",
  sonnet: "claude-sonnet-4-20250514",
  haiku: "claude-3-5-haiku-latest",
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
  pro: "gemini-2.5-pro",
  flash: "gemini-2.5-flash",
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

export type AnthropicModelKey = keyof typeof AnthropicModel;
export type OpenAIModelKey = keyof typeof OpenAIModel;
export type GoogleModelKey = keyof typeof GoogleModel;

export const DEFAULT_ANTHROPIC_MODEL_KEY: AnthropicModelKey = "sonnet";
export const DEFAULT_OPENAI_MODEL_KEY: OpenAIModelKey = "gpt41";
export const DEFAULT_GOOGLE_MODEL_KEY: GoogleModelKey = "pro";

export function mapAnthropicModel(key: AnthropicModelKey): AnthropicModelType {
  return AnthropicModel[key];
}

export function mapOpenAIModel(key: OpenAIModelKey): OpenAIModelType {
  return OpenAIModel[key];
}

export function mapGoogleModel(key: GoogleModelKey): GoogleModelType {
  return GoogleModel[key];
}

export type AnthropicOptions = {
  modelName: AnthropicModelKey;
  summarySize: SummarySizeType;
  streaming: boolean;
};

export type OpenAIOptions = {
  modelName: OpenAIModelKey;
  summarySize: SummarySizeType;
  streaming: boolean;
};

export type GoogleOptions = {
  modelName: GoogleModelKey;
  summarySize: SummarySizeType;
  streaming: boolean;
};
