import { assertInstanceOf } from "../../dev_deps.ts";
import { getExtractor } from "./extract.ts";
import { YoutubeExtractor } from "./YoutubeExtractor.ts";
import { HTMLExtractor } from "./HTMLExtractor.ts";

Deno.test(
  "getExtractor should return the proper extractor for a YouTube URL",
  () => {
    const youtubeUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    const extractor = getExtractor(youtubeUrl);
    assertInstanceOf(extractor, YoutubeExtractor);
  },
);

Deno.test(
  "getExtractor should return the proper extractor for a YouTube short URL",
  () => {
    const youtubeShortUrl = "https://youtu.be/dQw4w9WgXcQ";
    const extractor = getExtractor(youtubeShortUrl);
    assertInstanceOf(extractor, YoutubeExtractor);
  },
);

Deno.test(
  "getExtractor should return the default extractor for pulling text from a HTML page",
  () => {
    const genericUrl = "https://128bit.io/posts/taste-of-clojure/";
    const extractor = getExtractor(genericUrl);
    assertInstanceOf(extractor, HTMLExtractor);
  },
);
