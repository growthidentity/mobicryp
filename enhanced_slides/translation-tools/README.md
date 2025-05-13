# MobiCryp Presentation Translation Tools

This directory contains a set of tools for translating the MobiCryp presentation slides from English to Thai. The translation process leverages the ChatGPT API to provide high-quality translations with accurate handling of technical cryptocurrency terminology.

## Tools Overview

### Main Scripts

- `extract_untranslated.js` - Extracts untranslated text from HTML slides
- `translate.js` - Batch translates all texts using ChatGPT API
- `translate_slide.js` - Translates a single slide at a time
- `apply_translations_updated.js` - Applies translations to HTML files
- `finalize_thai_slides.js` - Sets up language selector and organizes files

### Helper Scripts

- `update_translations.js` - Updates translation database with new translations
- `translate_batch.js` - Processes translations in batches
- `translate_small_batch.js` - Processes smaller batches for better reliability
- `finalize_translations.js` - Consolidates all translations

## Translation Process

The translation workflow follows these steps:

1. **Extract text** from HTML slides using `extract_untranslated.js`
2. **Translate text** using ChatGPT API with `translate.js` or `translate_slide.js`
3. **Apply translations** to HTML files with `apply_translations_updated.js`
4. **Finalize** by creating language switcher and organizing files with `finalize_thai_slides.js`

## Usage

1. Install dependencies:
   ```
   npm install
   ```

2. Set up your OpenAI API key:
   ```
   export OPENAI_API_KEY=your_key_here
   ```

3. Extract text to translate:
   ```
   node extract_untranslated.js
   ```

4. Translate a specific slide:
   ```
   node translate_slide.js YOUR_API_KEY 01
   ```

5. Apply translations:
   ```
   node apply_translations_updated.js
   ```

6. Finalize the project:
   ```
   node finalize_thai_slides.js
   ```

For more detailed instructions, see the `usage.md` file.

## Translation Database

All translations are stored in:
- `translations.json` - Current translations
- `complete_translations.json` - All translations (including previously translated content)

## Notes

- Technical terms are transliterated where appropriate
- The scripts use batch processing to avoid token limits
- All functions handle error cases gracefully
- Progress is saved after each batch to prevent data loss

## Requirements

- Node.js 14+
- OpenAI API key with access to GPT-4
- JSDOM for HTML parsing
EOF < /dev/null