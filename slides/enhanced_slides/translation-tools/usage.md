# Translation Tool Usage Guide

## Setup

1. Install dependencies:

```bash
npm install
```

2. Make sure you have an OpenAI API key ready.

## Workflow

### Step 1: Extract Texts to Translate

This step is only needed if you're adding new slides or updating existing ones:

```bash
node extract_untranslated.js
```

This will scan all HTML slides and the index page, extracting text that needs translation and creating a `texts_to_translate.json` file.

### Step 2: Translate Texts

Run the translation script with your OpenAI API key:

```bash
node translate.js YOUR_OPENAI_API_KEY
```

Or set it as an environment variable and run:

```bash
export OPENAI_API_KEY=your_api_key
node translate.js
```

Alternatively, use the npm script:

```bash
npm run translate
```

This will:
- Read texts from `texts_to_translate.json`
- Translate them using the ChatGPT API
- Save translations to `complete_translations.json`

The script processes in batches and handles large volumes of text efficiently.

### Step 3: Apply Translations to HTML Files

After translations are complete, apply them to the HTML files:

```bash
node apply_translations.js
```

Or use the npm script:

```bash
npm run apply
```

This will:
- Create Thai versions of all slides with `_th.html` suffix
- Create a Thai version of the index page (`index_th.html`)
- Add a language switcher to both English and Thai versions

## Tips for Best Results

1. **Provide Context**: When adding new slides or content, consider updating the context in the `translate.js` script to ensure accurate translations.

2. **Check Translations**: After running the translation process, review the translations for accuracy, especially for technical terms.

3. **Manual Edits**: You can manually edit the `complete_translations.json` file if you need to fix specific translations before applying them.

4. **Incremental Updates**: You only need to extract and translate new or changed content. The script will preserve existing translations.

## Troubleshooting

- If you encounter rate limiting from the OpenAI API, the script will pause and retry. You can adjust the delay in the script if needed.
- If translations appear cut off, try reducing the batch size in the script to process fewer items at once.
- For any HTML parsing issues, you may need to adjust the selectors in `extract_untranslated.js`.