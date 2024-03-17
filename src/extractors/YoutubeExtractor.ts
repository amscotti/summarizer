import { Innertube, YoutubeTranscript } from "../../deps.ts";
import { TextExtractor } from "../utils/types.ts";

type VideoMetadata = {
  title: string | undefined;
  duration: number | undefined;
  short_description: string | undefined;
  author: string | undefined;
  category: string | null;
  published: string | undefined;
};

export class YoutubeExtractor implements TextExtractor {
  private readonly videoId: string;

  constructor(url: string) {
    let videoId: string | null;
    const urlObj = new URL(url);

    if (urlObj.hostname === "youtu.be") {
      videoId = urlObj.pathname.split("/")[1];
    } else {
      const urlParams = new URLSearchParams(urlObj.search);
      videoId = urlParams.get("v");
    }

    if (!videoId) {
      throw new Error("Invalid YouTube URL: Video ID not found.");
    }

    this.videoId = videoId;
  }

  private async getVideoMetadata(videoId: string): Promise<VideoMetadata> {
    const youtube = await Innertube.create();
    const video = await youtube.getInfo(videoId);

    const { title, duration, short_description, author, category } =
      video.basic_info;
    const published = video.primary_info?.published?.text;

    return { title, duration, short_description, author, category, published };
  }

  private async getVideoTranscript(videoId: string): Promise<string> {
    const transcriptChunks = await YoutubeTranscript.fetchTranscript(videoId);
    return transcriptChunks.reduce((acc, { text }) => `${acc} ${text}`, "");
  }

  private formatText(metadata: VideoMetadata, transcript: string): string {
    const title = metadata.title || "Unknown title";
    const author = metadata.author || "Unknown author";
    const published = metadata.published || "Unknown published date";
    const category = metadata.category || "Unknown category";
    const duration = metadata.duration !== undefined
      ? `${metadata.duration} seconds`
      : "Unknown duration";
    const shortDescription = metadata.short_description ||
      "Short description unavailable";

    return `
  ## Video Metadata:
  Title: ${title}
  Author: ${author}
  Published: ${published}
  Category: ${category}
  Duration: ${duration}

  ## Short Description:
  ${shortDescription}

  ## Transcript:
  ${transcript}
  `;
  }

  public async extractText(): Promise<string> {
    const [metadata, transcript] = await Promise.all([
      this.getVideoMetadata(this.videoId),
      this.getVideoTranscript(this.videoId),
    ]);

    return this.formatText(metadata, transcript);
  }
}
