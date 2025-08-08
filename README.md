<p align="center">
    <img src="images/wizard_summarizing.png" alt="A wizard summarizing knowledge" width="500">
</p>

Summarizer is a command-line tool that generates comprehensive summaries of articles and other text-based content. It utilizes the powerful language models from Anthropic, Google, or OpenAI to create concise and informative summaries, helping users quickly grasp the key points of lengthy texts.

[![asciicast](https://asciinema.org/a/55ZOBNgyqfGtHdWMDk6pTrIwC.svg)](https://asciinema.org/a/55ZOBNgyqfGtHdWMDk6pTrIwC)

## Motivation

This is a port of a [Python application](https://github.com/amscotti/page-summarizer) to Bun. The goals are to learn developing with [Bun](https://bun.sh/) and to leverage Bun’s ability to [compile](https://bun.sh/docs/bundler/executables) to a single executable, with support for [cross‑compilation](https://bun.sh/docs/bundler/executables#cross-compile-to-other-platforms). This should make it easier for others to use, and more convenient than a Python script. Currently, this application is not as full‑featured as the Python version, but it has some additional functionality.
Note: local compilation may vary by platform. The provided Dockerfile reliably builds a Linux (musl) executable in a multi‑stage Alpine image.

## TODO

- [X] Add logic for summarizing PDF URLs
- [X] Create Docker image

## Features

- Summarize articles and content from provided URLs
- Summarize PDFs from URLs
- Summarize YouTube videos using transcripts
- Summarize text piped directly into the app
- Adjust the summary size (short, medium, or long) to fit your needs
- Choose from different models from different providers for summarization
- Stream the summary output in real-time

## Installation

1. Ensure you have Bun installed on your system. If not, you can install it from the official Bun website: [https://bun.sh/](https://bun.sh/)

2. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/amscotti/summarizer.git
   ```

3. Navigate to the project directory:

   ```bash
   cd summarizer
   ```

4. Set up the required environment variables:
   - `ANTHROPIC_API_KEY`: Your Anthropic API key for using the Claude models
   - `GOOGLE_API_KEY`: Your Google API key for using the Gemini models
   - `OPENAI_API_KEY`: Your OpenAI API key for using the GPT models

## Usage

To use the Summarizer, you have two options:

1. Provide a URL as a command-line argument:

   ```bash
   bun run src/cli.ts google "https://example.com/article"
   ```

2. Pipe text directly into the app:
   ```bash
   cat article.txt | bun run src/cli.ts google
   ```

If you compiled the binary or use the Docker image, replace `bun run src/cli.ts` with `summarizer` (or just pass args after the Docker image since it uses `summarizer` as ENTRYPOINT).

### Options

- `-m, --model-name <name>`: Specify the model to use for summarization.
  Available options are:

  **Anthropic:**
  - `opus` (Claude Opus 4.1)
  - `sonnet` (Claude Sonnet 4) - default
  - `haiku` (Claude 3.5 Haiku)

  **OpenAI:**
  - `gpt5` (GPT-5)
  - `gpt5mini` (GPT-5 Mini) - default
  - `gpt5nano` (GPT-5 Nano)

  **Google:**
  - `pro` (Gemini 2.5 Pro) - default
  - `flash` (Gemini 2.5 Flash)

- `-s, --summary-size <size>`: Specify the desired size of the summary.
  Available options are:

  - `short`
  - `medium`
  - `long` (default)

- `--no-streaming`: Disable real-time streaming of the summary output.

## Examples

Summarize an article from a URL using the default model and summary size:

```bash
bun run src/cli.ts anthropic "https://example.com/article"
```

Summarize piped text using a specific model and summary size:

```bash
cat article.txt | bun run src/cli.ts anthropic -s medium -m haiku
```

## Compiling

You can compile this application into an executable using the following command,

```bash
bun build src/cli.ts --compile --outfile summarizer
```

## Docker

Build the image (Alpine, multi-stage with Bun compile):

```bash
docker build -t summarizer .
```

Run with environment variables already set in your shell (passed through):

- OpenAI

```bash
docker run --rm --env OPENAI_API_KEY summarizer openai "https://example.com/article"
```

- Anthropic (uses Claude Opus 4.1 when `-m opus`)

```bash
docker run --rm --env ANTHROPIC_API_KEY summarizer anthropic -m opus "https://example.com/article"
```

- Google

```bash
docker run --rm --env GOOGLE_API_KEY summarizer google "https://example.com/article"
```

Pipe from stdin:

```bash
echo "Some long text..." | docker run --rm -i --env OPENAI_API_KEY summarizer openai -s short
```

Use a .env file instead of passing individual vars:

```bash
docker run --rm --env-file .env summarizer openai "https://example.com/article"
```

Notes
- ENTRYPOINT is `summarizer`, so pass a provider subcommand (openai|anthropic|google) and any flags.
- Required env vars by provider:
  - OpenAI: `OPENAI_API_KEY`
  - Anthropic: `ANTHROPIC_API_KEY`
  - Google: `GOOGLE_API_KEY`
- Defaults: OpenAI uses GPT‑5 Mini; Anthropic `opus` maps to Claude Opus 4.1.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports,
please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
