import pdfParse from "@cyber2024/pdf-parse-fixed";
import type { TextExtractor } from "../utils/types";

interface PDFData {
  text: string;
  numpages: number;
  info: {
    Title?: string;
    Author?: string;
    [key: string]: unknown;
  };
  metadata: Record<string, unknown>;
  version: string;
}

/**
 * PDF Extractor that uses pdf-parse library to extract text from PDFs
 */
export class PDFExtractor implements TextExtractor {
  private readonly url: string;

  constructor(url: string) {
    this.url = url;
  }

  public async extractText(): Promise<string> {
    try {
      // Fetch the PDF file
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.statusText}`);
      }

      // Get PDF data as ArrayBuffer and convert to Buffer
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Extract text using pdf-parse
      const pdfData = (await pdfParse(buffer)) as PDFData;

      return this.formatText(pdfData);
    } catch (error) {
      console.error("Error extracting PDF text:", error);
      throw new Error(
        `Error extracting PDF text: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  private formatText(pdfData: PDFData): string {
    const title = pdfData.info.Title || "Untitled PDF";
    const author = pdfData.info.Author || "Unknown Author";

    // Format the extracted text with metadata
    return `
## PDF Metadata:
Title: ${title}
Author: ${author}
Pages: ${pdfData.numpages}
Version: ${pdfData.version || "Unknown"}

## Content:
${pdfData.text}
    `.trim();
  }
}
