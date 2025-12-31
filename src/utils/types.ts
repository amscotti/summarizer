export const SummarySize = {
  short: "short",
  medium: "medium",
  long: "long",
} as const;

export const DEFAULT_SUMMARY_SIZE = SummarySize.long;

export interface TextExtractor {
  extractText(): Promise<string>;
}

export type SummarySizeType = (typeof SummarySize)[keyof typeof SummarySize];
