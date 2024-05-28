import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import type { TextExtractor } from "../utils/types";

export class YoutubeExtractor implements TextExtractor {
  private readonly url: string;

  constructor(url: string) {
    this.url = url;
  }

  private formatText(
    metadata: Record<string, any>,
    transcript: string,
  ): string {
    const title = metadata.title || "Unknown title";
    const author = metadata.author || "Unknown author";
    const description = metadata.description;

    return `
  ## Video Metadata:
  Title: ${title}
  Author: ${author}

  ## Description:
  ${description}

  ## Transcript:
  ${transcript}
  `;
  }

  public async extractText(): Promise<string> {
    const loader = YoutubeLoader.createFromUrl(this.url, {
      language: "en",
      addVideoInfo: true,
    });

    const docs = await loader.load();
    const { pageContent: content, metadata } = docs[0];

    return this.formatText(metadata, content);
  }
}
