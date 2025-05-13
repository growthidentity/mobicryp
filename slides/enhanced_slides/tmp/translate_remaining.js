// Script to translate all remaining slides
const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');

// API key will be set from environment variable or command line argument
const apiKey = process.env.OPENAI_API_KEY || process.argv[2];

if (!apiKey) {
  console.error('Error: OpenAI API key is required. Please provide it as the first argument.');
  process.exit(1);
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: apiKey
});

// File paths
const textsToTranslatePath = path.join(__dirname, 'more_texts_to_translate.json');
const translationsPath = path.join(__dirname, 'translations.json');
const completeTranslationsPath = path.join(__dirname, 'complete_translations.json');

// Read the files
let textsToTranslate;
let translations;

try {
  textsToTranslate = JSON.parse(fs.readFileSync(textsToTranslatePath, 'utf8'));
  translations = JSON.parse(fs.readFileSync(translationsPath, 'utf8'));
} catch (error) {
  console.error('Error reading files:', error);
  process.exit(1);
}

// Ensure slides object exists in translations
if (!translations.slides) {
  translations.slides = {};
}

// Get a list of all slide IDs that need translation
const slideIds = Object.keys(textsToTranslate).sort((a, b) => {
  // Sort numerically
  return parseInt(a) - parseInt(b);
});

// Arrays to track progress
const translatedSlides = [];
const failedSlides = [];

// Function to translate a single slide
async function translateSlide(slideId) {
  // Skip if slide doesn't exist
  if (!textsToTranslate[slideId]) {
    console.log(`Slide ${slideId} not found in texts_to_translate.json. Skipping.`);
    return false;
  }

  // Ensure slide object exists in translations
  if (!translations.slides[slideId]) {
    translations.slides[slideId] = {};
  }

  // Get content to translate
  const slideContent = textsToTranslate[slideId];
  const textEntries = Object.entries(slideContent);

  // Skip if no texts to translate
  if (textEntries.length === 0) {
    console.log(`No texts to translate for slide ${slideId}. Skipping.`);
    return false;
  }

  console.log(`Processing slide ${slideId}...`);

  // Build context for better translation
  const context = `
You are translating text for a cryptocurrency and financial platform called MobiCryp.
The text is from a presentation slide (Slide ${slideId}).
Please translate the following English text to Thai. Maintain the formal tone and technical accuracy.
For cryptocurrency terms, use transliteration when appropriate.
Provide only the translations without any additional comments or explanations.
`;

  try {
    // Process in batches to avoid exceeding token limits
    const batchSize = 5;
    for (let i = 0; i < textEntries.length; i += batchSize) {
      const batch = textEntries.slice(i, i + batchSize);

      // Skip empty batches
      if (batch.length === 0) continue;

      // Create prompt for this batch
      const prompt = batch.map(([text, _]) => text).join('\n\n');

      // Call ChatGPT API
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: context },
          { role: "user", content: prompt }
        ],
        temperature: 0.3,
      });

      // Get the response
      const response = completion.choices[0].message.content;

      // Split the response into separate translations
      const translationLines = response.split('\n\n');

      // Update translations for each item in the batch
      for (let j = 0; j < Math.min(batch.length, translationLines.length); j++) {
        const [text, _] = batch[j];
        let translation = translationLines[j];

        // Clean up the translation (remove any "Thai: " prefixes etc.)
        translation = translation.replace(/^(Thai|Translation): /, '');

        // Update the translations object
        translations.slides[slideId][text] = translation;

        // Also update the original object for tracking
        textsToTranslate[slideId][text] = translation;
      }

      console.log(`Translated ${batch.length} items from slide ${slideId}`);

      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Save after each slide for safety
    fs.writeFileSync(completeTranslationsPath, JSON.stringify(translations, null, 2), 'utf8');
    fs.writeFileSync(textsToTranslatePath, JSON.stringify(textsToTranslate, null, 2), 'utf8');

    return true;
  } catch (error) {
    console.error(`Error translating slide ${slideId}:`, error);
    return false;
  }
}

// Main function to translate all slides
async function translateAllSlides() {
  console.log(`Starting translation for ${slideIds.length} slides...`);

  for (const slideId of slideIds) {
    // Skip slides 01-06 that we've already translated
    if (['01', '02', '03', '04', '05', '06'].includes(slideId)) {
      console.log(`Skipping slide ${slideId} (already translated)`);
      continue;
    }

    const success = await translateSlide(slideId);
    if (success) {
      translatedSlides.push(slideId);
    } else {
      failedSlides.push(slideId);
    }
  }

  console.log('\nTranslation summary:');
  console.log(`Slides translated: ${translatedSlides.length} (${translatedSlides.join(', ')})`);
  if (failedSlides.length > 0) {
    console.log(`Slides failed: ${failedSlides.length} (${failedSlides.join(', ')})`);
  }
  console.log('Translation complete! Results saved to complete_translations.json');
}

// Run the translation process
translateAllSlides().catch(error => {
  console.error('Error in translation process:', error);
  process.exit(1);
});