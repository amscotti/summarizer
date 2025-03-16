import type { TextExtractor } from "../utils/types.ts";
import { HTMLExtractor } from "./HTMLExtractor.ts";
import { PDFExtractor } from "./PDFExtractor.ts";
import { YoutubeExtractor } from "./YoutubeExtractor.ts";

interface Extractor {
  test: (url: string) => boolean;
  extractor: (url: string) => TextExtractor;
}

const YOUTUBE_REGEX: RegExp =
  /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//;

const PDF_REGEX: RegExp = /\.pdf(\?.*)?$/i;

const extractors: Extractor[] = [
  {
    test: (url: string) => YOUTUBE_REGEX.test(url),
    extractor: (url: string) => new YoutubeExtractor(url),
  },
  {
    test: (url: string) => PDF_REGEX.test(url),
    extractor: (url: string) => new PDFExtractor(url),
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
