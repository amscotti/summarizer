import { SummarySize } from "../utils/types.ts";
import { PromptTemplate } from "../../deps.ts";

const SUMMARY_TEMPLATE_LONG = `
You are tasked with writing a comprehensive summary the following text so that readers will have a full understanding of the text, without need of referencing the source material.
Your summary should reflect the length of the source material, and provide enough details, that the reader can fully understand the subject and is able to speak of it at a high-level.
You will also providing list of 3 or more brief key points from the article that may not be covered by the initial report, additional key points can be keep together under 'KEY POINTS'.

Your summary should be in paragraph form without bullet points,

{text}

Use the format,

SUMMARY:
<Summary>

KEY POINTS:
- <Key Point>
- <Key Point>
- <Key Point>
- ...
`;

const SUMMARY_TEMPLATE_MEDIUM = `
Your task is to create a concise yet informative summary of the following text, giving readers a clear understanding of the key themes and points without delving into excessive detail.
Your summary should be proportionate to the length of the source material and include essential information to enable readers to grasp the main concepts and discuss them with a reasonable degree of knowledge.
Additionally, compile a brief list of 2 or more key takeaways from the text. These should be succinct and not overlap with the content of the narrative summary.

Your summary should be composed in paragraph format and avoid the use of bullet points.

{text}

Please use the format below,

SUMMARY:
<Summary>

KEY TAKEAWAYS:
- <Key Takeaway>
- <Key Takeaway>
- ...
`;

const SUMMARY_TEMPLATE_SHORT = `
Condense the following text into a brief and clear summary suitable for quick sharing on platforms like Slack or social media. Focus on capturing the essence and most impactful point of the text in one or two sentences.
This will enable coworkers or followers to get the main idea at a glance without needing more context.

{text}

Please adhere to the following structure:

SUMMARY:
<Concise Summary>
`;

const SUMMARY_SIZE_TO_PROMPT = {
  [SummarySize.Long]: SUMMARY_TEMPLATE_LONG,
  [SummarySize.Medium]: SUMMARY_TEMPLATE_MEDIUM,
  [SummarySize.Short]: SUMMARY_TEMPLATE_SHORT,
};

/**
 * Retrieves a PromptTemplate based on the specified summary size.
 *
 * @param size - The size of the summary to be generated, which can be Long, Medium, or Short.
 * @returns A PromptTemplate instance initialized with the template corresponding to the given summary size and the required input variables.
 */
export function getPrompt(size: SummarySize) {
  return new PromptTemplate<{ text: string }>({
    template: SUMMARY_SIZE_TO_PROMPT[size],
    inputVariables: ["text"],
  });
}
