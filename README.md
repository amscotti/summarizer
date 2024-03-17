# Summarizer

<p align="center">
    <img src="images/wizard_riding.jpg" alt="A wizard riding a dinosaur - Leonardo AI" width="500">
</p>

Summarizer is a command-line tool that generates comprehensive summaries of
articles and other text-based content. It utilizes the powerful language models
from Anthropic to create concise and informative summaries, helping users
quickly grasp the key points of lengthy texts.

[![asciicast](https://asciinema.org/a/55ZOBNgyqfGtHdWMDk6pTrIwC.svg)](https://asciinema.org/a/55ZOBNgyqfGtHdWMDk6pTrIwC)

## Motivation

This is a port of a
[python application](https://github.com/amscotti/page-summarizer) to Deno, this
is to better learn and understand developing with [Deno](https://deno.com/) but
also to take advantage of Deno's ability to
[compile](https://docs.deno.com/runtime/manual/tools/compiler) to an executable,
with the ability to
[cross compile](https://docs.deno.com/runtime/manual/tools/compiler#cross-compilation)
to other platforms. This should make it easier for others to use this
application and more convenient than a Python. Currently, this application is
not full featured like the Python version, but does have some additional
functionality.

## TODO

- [ ] Add logic for summarizing PDF urls
- [ ] Add additional providers, like OpenAI and Ollama
- [ ] Create Docker image

## Features

- Summarize articles and content from provided URLs
- Summarize text piped directly into the app
- Adjust the summary size (short, medium, or long) to fit your needs
- Choose from different Claude models for summarization
- Stream the summary output in real-time

## Installation

1. Ensure you have Deno installed on your system. If not, you can install it
   from the official Deno website: [https://deno.land/](https://deno.land/)

2. Clone this repository to your local machine:

   ```shell
   git clone https://github.com/amscotti/summarizer.git
   ```

3. Navigate to the project directory:

   ```shell
   cd summarizer
   ```

4. Set up the required environment variables:
   - `ANTHROPIC_API_KEY`: Your Anthropic API key. You can obtain one by signing
     up on the Anthropic website.

## Usage

To use the Summarizer, you have two options:

1. Provide a URL as a command-line argument:

   ```shell
   deno run --allow-net --allow-env src/cli.ts -m claude-3-haiku-20240307 "https://example.com/article"
   ```

2. Pipe text directly into the app:
   ```shell
   cat article.txt | deno run --allow-net --allow-env src/cli.ts -m claude-3-haiku-20240307
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
deno run --allow-net --allow-env src/cli.ts "https://example.com/article"
```

Summarize piped text using a specific model and summary size:

```shell
cat article.txt | deno run --allow-net --allow-env src/cli.ts -m claude-3-haiku-20240307 -s medium
```

## Compiling

You can compile this application into an executable using the following command,

```shell
deno compile --output summarizer --allow-net --allow-env src/cli.ts
```

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports,
please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
