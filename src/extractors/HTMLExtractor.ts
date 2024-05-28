import { convert } from "html-to-text";
import { HEADERS } from "../utils/constants.ts";

import type { TextExtractor } from "../utils/types.ts";

export class HTMLExtractor implements TextExtractor {
  private readonly url: string;

  constructor(url: string) {
    this.url = url;
  }

  public async extractText(): Promise<string> {
    const html = await fetch(this.url, { headers: HEADERS }).then((res) =>
      res.text(),
    );
    return convert(html, { wordwrap: 130 });
  }
}
