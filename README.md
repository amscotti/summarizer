<p align="center">
    <img src="images/wizard_riding.jpg" alt="A wizard riding a dinosaur - Leonardo AI" width="500">
</p>

Summarizer is a command-line tool that generates comprehensive summaries of articles and other text-based content. It utilizes the powerful language models from Anthropic, Google, or OpenAI to create concise and informative summaries, helping users quickly grasp the key points of lengthy texts.

[![asciicast](https://asciinema.org/a/55ZOBNgyqfGtHdWMDk6pTrIwC.svg)](https://asciinema.org/a/55ZOBNgyqfGtHdWMDk6pTrIwC)

## Motivation

This is a port of a
[python application](https://github.com/amscotti/page-summarizer) to Bun, this
is to better learn and understand developing with [Bun](https://bun.sh/) but
also to take advantage of Bun's ability to [compile](https://bun.sh/docs/bundler/executables) to an executable,
with the ability to
[cross compile](https://bun.sh/docs/bundler/executables#cross-compile-to-other-platforms) to other platforms. This should make it easier for others to use this
application and more convenient than a Python. Currently, this application is
not full featured like the Python version, but does have some additional
functionality.

NOTE: with the latest features that have been added compiling to an executable seems to no longer work properly, I will test with later versions of Bun.

## TODO

- [X] Add logic for summarizing PDF urls
- [ ] Create Docker image

## Features

- Summarize articles and content from provided URLs
- Summarize text piped directly into the app
- Adjust the summary size (short, medium, or long) to fit your needs
- Choose from different models from different providers for summarization
- Stream the summary output in real-time

## Installation

1. Ensure you have Bun installed on your system. If not, you can install it
   from the official Bun website: [https://bun.sh/](https://bun.sh/)

2. Clone this repository to your local machine:

   ```shell
   git clone https://github.com/amscotti/summarizer.git
   ```

3. Navigate to the project directory:

   ```shell
   cd summarizer
   ```

4. Set up the required environment variables:
   - `ANTHROPIC_API_KEY`: Your Anthropic API key for using the Claude models
   - `GOOGLE_API_KEY`: Your Google API key for using the Gemini models
   - `OPENAI_API_KEY`: Your OpenAI API key for using the GPT models

## Usage

To use the Summarizer, you have two options:

1. Provide a URL as a command-line argument:

   ```shell
   bun run src/cli.ts google "https://example.com/article"
   ```

2. Pipe text directly into the app:
   ```shell
   cat article.txt | bun run src/cli.ts google
   ```

### Options

- `-m, --model-name <name>`: Specify the Claude model to use for summarization.
  Available options are:

  - `claude-3-opus-20240229` (default)
  - `claude-3-sonnet-20240229`
  - `claude-3-haiku-20240307`

- `-s, --summary-size <size>`: Specify the desired size of the summary.
  Available options are:

  - `short`
  - `medium`
  - `long` (default)

- `--no-streaming`: Disable real-time streaming of the summary output.

## Examples

Summarize an article from a URL using the default model and summary size:

```shell
bun run src/cli.ts anthropic "https://example.com/article"
```

Summarize piped text using a specific model and summary size:

```shell
cat article.txt | bun run src/cli.ts -s medium anthropic -m claude-3-haiku-20240307
```

## Compiling

You can compile this application into an executable using the following command,

```shell
bun build src/cli.ts --compile --outfile summarizer
```

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports,
please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
