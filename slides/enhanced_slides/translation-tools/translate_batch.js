// Script to translate a specific batch of slides
const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');

// API key will be set from environment variable or command line argument
const apiKey = process.env.OPENAI_API_KEY || process.argv[2];
const startSlide = process.argv[3];
const endSlide = process.argv[4];

if (!apiKey) {
  console.error('Error: OpenAI API key is required. Please provide it as the first argument.');
  process.exit(1);
}

if (!startSlide || !endSlide) {
  console.error('Error: Start and end slide IDs are required. Please provide them as arguments.');
  process.exit(1);
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: apiKey
});

// File paths
const textsToTranslatePath = path.join(__dirname, 'more_texts_to_translate.json');
const translationsPath = path.join(__dirname, 'complete_translations.json');

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

// Process a range of slides
async function translateSlideRange() {
  for (let i = parseInt(startSlide); i <= parseInt(endSlide); i++) {
    // Format slide ID with leading zero if needed
    const slideId = i < 10 ? `0${i}` : `${i}`;
    
    // Skip if slide doesn't exist
    if (!textsToTranslate[slideId]) {
      console.log(`Slide ${slideId} not found in texts_to_translate.json. Skipping.`);
      continue;
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
      continue;
    }

    console.log(`Processing slide ${slideId}...`);
    await translateSlide(slideId, textEntries);
  }

  console.log('Batch translation complete! Results saved to complete_translations.json');
}

// Function to translate a single slide
async function translateSlide(slideId, textEntries) {
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

      // Skip if the text is empty or already translated
      if (!prompt.trim()) continue;

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

      // Save after each batch for safety
      fs.writeFileSync(translationsPath, JSON.stringify(translations, null, 2), 'utf8');
      fs.writeFileSync(textsToTranslatePath, JSON.stringify(textsToTranslate, null, 2), 'utf8');

      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return true;
  } catch (error) {
    console.error(`Error translating slide ${slideId}:`, error);
    return false;
  }
}

// Run the translation process
translateSlideRange().catch(error => {
  console.error('Error in translation process:', error);
  process.exit(1);
});