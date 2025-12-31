import { YoutubeTranscript } from "youtube-transcript";
import type { TextExtractor } from "../utils/types";

interface TranscriptItem {
  text: string;
  offset: number;
  duration: number;
}

export class YoutubeExtractor implements TextExtractor {
  private readonly url: string;

  constructor(url: string) {
    this.url = url;
  }

  private formatText(title: string, transcript: string): string {
    return `
## YouTube Video: ${title}

## Transcript:
${transcript}
`.trim();
  }

  private extractVideoId(url: string): string {
    // Regular expressions to extract YouTube video ID from different URL formats
    const regexPatterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/i,
      /youtube\.com\/embed\/([^/?]+)/i,
      /youtube\.com\/v\/([^/?]+)/i,
      /youtube\.com\/shorts\/([^/?]+)/i,
    ];

    for (const pattern of regexPatterns) {
      const match = url.match(pattern);
      if (match?.[1]) {
        return match[1];
      }
    }

    throw new Error("Could not extract video ID from URL");
  }

  private extractTitleFromURL(url: string): string {
    try {
      const urlObj = new URL(url);
      // Try to extract title from YouTube URL if it has a title parameter
      if (urlObj.searchParams.has("title")) {
        return urlObj.searchParams.get("title") || "YouTube Video";
      }

      // If no title in URL, use video ID as fallback
      const videoId = this.extractVideoId(url);
      return videoId || "YouTube Video";
    } catch {
      return "YouTube Video";
    }
  }

  public async extractText(): Promise<string> {
    try {
      const videoId = this.extractVideoId(this.url);
      const title = this.extractTitleFromURL(this.url);

      // Get transcript using youtube-transcript
      const transcriptResponse =
        await YoutubeTranscript.fetchTranscript(videoId);

      // Join segments with paragraph breaks
      const transcriptText = transcriptResponse.map((t) => t.text).join("\n\n");

      return this.formatText(title, transcriptText);
    } catch (error) {
      console.error("Error extracting YouTube content:", error);
      throw new Error(
        `Error extracting YouTube content: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }
}
