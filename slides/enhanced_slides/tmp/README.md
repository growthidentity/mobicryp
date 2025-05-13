# Slide Translation Tool

This tool automates the translation of presentation slides from English to Thai using the ChatGPT API.

## Prerequisites

- Node.js installed
- OpenAI API key

## Installation

1. Clone this repository or download the files
2. Install dependencies:

```bash
npm install openai
```

## Usage

Run the translation script with your OpenAI API key:

```bash
node translate.js YOUR_OPENAI_API_KEY
```

Alternatively, you can set the API key as an environment variable:

```bash
export OPENAI_API_KEY=your_api_key
node translate.js
```

## Files

- `texts_to_translate.json`: Contains the untranslated text organized by slide
- `translations.json`: Existing translations
- `complete_translations.json`: Output file with all translations combined
- `translate.js`: The translation script

## How It Works

1. The script reads texts that need translation from `texts_to_translate.json`
2. It reads existing translations from `translations.json`
3. It sends untranslated text to the ChatGPT API with context about the project
4. Translations are saved to `complete_translations.json`

The script processes slides in batches to avoid exceeding API token limits and includes error handling with automatic saving after each batch.

## Notes

- The script uses GPT-4 for high-quality translations
- It preserves technical cryptocurrency terms through transliteration when appropriate
- Maintains a formal tone suitable for a professional presentation