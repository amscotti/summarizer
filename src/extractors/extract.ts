import { HTMLExtractor } from "./HTMLExtractor.ts";
import { YoutubeExtractor } from "./YoutubeExtractor.ts";
import { TextExtractor } from "../utils/types.ts";

interface Extractor {
  test: (url: string) => boolean;
  extractor: (url: string) => TextExtractor;
}

const YOUTUBE_REGEX: RegExp =
  /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//;

const extractors: Extractor[] = [
  {
    test: (url: string) => YOUTUBE_REGEX.test(url),
    extractor: (url: string) => new YoutubeExtractor(url),
  },
];

/**
 * Retrieves the appropriate extractor for a given URL.
 *
 * @param {string} url - The URL to extract text from.
 * @returns {TextExtractor} An instance of TextExtractor suitable for the URL.
 */
export function getExtractor(url: string): TextExtractor {
  const extractor = extractors.find((ext) => ext.test(url));
  return extractor ? extractor.extractor(url) : new HTMLExtractor(url);
}
