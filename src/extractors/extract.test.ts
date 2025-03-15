import { expect, test } from "bun:test";
import { HTMLExtractor } from "./HTMLExtractor.ts";
import { PDFExtractor } from "./PDFExtractor.ts";
import { YoutubeExtractor } from "./YoutubeExtractor.ts";
import { getExtractor } from "./extract.ts";

test("getExtractor should return the proper extractor for a YouTube URL", () => {
  const youtubeUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  const extractor = getExtractor(youtubeUrl);
  expect(extractor).toBeInstanceOf(YoutubeExtractor);
});

test("getExtractor should return the proper extractor for a YouTube short URL", () => {
  const youtubeShortUrl = "https://youtu.be/dQw4w9WgXcQ";
  const extractor = getExtractor(youtubeShortUrl);
  expect(extractor).toBeInstanceOf(YoutubeExtractor);
});

test("getExtractor should return PDFExtractor for a PDF URL", () => {
  const pdfUrl = "https://example.com/document.pdf";
  const extractor = getExtractor(pdfUrl);
  expect(extractor).toBeInstanceOf(PDFExtractor);
});

test("getExtractor should return PDFExtractor for a PDF URL with query parameters", () => {
  const pdfUrl = "https://example.com/document.pdf?id=123&token=abc";
  const extractor = getExtractor(pdfUrl);
  expect(extractor).toBeInstanceOf(PDFExtractor);
});

test("getExtractor should return the default extractor for pulling text from a HTML page", () => {
  const genericUrl = "https://128bit.io/posts/taste-of-clojure/";
  const extractor = getExtractor(genericUrl);
  expect(extractor).toBeInstanceOf(HTMLExtractor);
});
