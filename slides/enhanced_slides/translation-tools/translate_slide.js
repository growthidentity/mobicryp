// Script to translate a single slide
const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');

// API key will be set from environment variable or command line argument
const apiKey = process.env.OPENAI_API_KEY || process.argv[2];
const slideId = process.argv[3];

if (!apiKey) {
  console.error('Error: OpenAI API key is required. Please provide it as the first argument.');
  process.exit(1);
}

if (!slideId) {
  console.error('Error: Slide ID is required. Please provide it as the second argument.');
  process.exit(1);
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: apiKey
});

// File paths
const textsToTranslatePath = path.join(__dirname, 'texts_to_translate.json');
const translationsPath = path.join(__dirname, 'translations.json');
const tempOutputPath = path.join(__dirname, `slide_${slideId}_translations.json`);

// Read the files
const textsToTranslate = JSON.parse(fs.readFileSync(textsToTranslatePath, 'utf8'));
const translations = JSON.parse(fs.readFileSync(translationsPath, 'utf8'));

// Ensure slides object exists in translations
if (!translations.slides) {
  translations.slides = {};
}

// Check if the slide exists
if (!textsToTranslate[slideId]) {
  console.error(`Error: Slide ${slideId} not found in texts_to_translate.json`);
  process.exit(1);
}

// Ensure slide object exists in translations
if (!translations.slides[slideId]) {
  translations.slides[slideId] = {};
}

async function translateSlide() {
  const slideContent = textsToTranslate[slideId];
  const textEntries = Object.entries(slideContent);
  
  // Skip if no texts to translate
  if (textEntries.length === 0) {
    console.log(`No texts to translate for slide ${slideId}`);
    return;
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
  
  // Create prompt with all text from the slide
  const prompt = textEntries.map(([text, _]) => text).join('\n\n');
  
  try {
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
    
    const result = {};
    
    // Update translations for each item
    for (let i = 0; i < Math.min(textEntries.length, translationLines.length); i++) {
      const [text, _] = textEntries[i];
      let translation = translationLines[i];
      
      // Clean up the translation (remove any "Thai: " prefixes etc.)
      translation = translation.replace(/^(Thai|Translation): /, '');
      
      // Add to result
      result[text] = translation;
    }
    
    // Write the translations to a temporary file
    fs.writeFileSync(tempOutputPath, JSON.stringify(result, null, 2), 'utf8');
    console.log(`Translations for slide ${slideId} saved to ${tempOutputPath}`);
    
  } catch (error) {
    console.error(`Error translating slide ${slideId}:`, error);
  }
}

// Run the translation process
translateSlide().catch(error => {
  console.error('Error in translation process:', error);
  process.exit(1);
});