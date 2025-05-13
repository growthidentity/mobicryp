// Script to update the main translations file with a single slide's translations
const fs = require('fs');
const path = require('path');

// Get slide ID from command line argument
const slideId = process.argv[2];

if (!slideId) {
  console.error('Error: Slide ID is required. Please provide it as an argument.');
  process.exit(1);
}

// File paths
const slideTranslationsPath = path.join(__dirname, `slide_${slideId}_translations.json`);
const mainTranslationsPath = path.join(__dirname, 'translations.json');
const textsToTranslatePath = path.join(__dirname, 'texts_to_translate.json');

// Read the files
try {
  const slideTranslations = JSON.parse(fs.readFileSync(slideTranslationsPath, 'utf8'));
  const mainTranslations = JSON.parse(fs.readFileSync(mainTranslationsPath, 'utf8'));
  const textsToTranslate = JSON.parse(fs.readFileSync(textsToTranslatePath, 'utf8'));

  // Ensure slides object exists in main translations
  if (!mainTranslations.slides) {
    mainTranslations.slides = {};
  }

  // Ensure slide object exists in main translations
  if (!mainTranslations.slides[slideId]) {
    mainTranslations.slides[slideId] = {};
  }

  // Update the main translations file with the slide translations
  for (const [english, thai] of Object.entries(slideTranslations)) {
    mainTranslations.slides[slideId][english] = thai;
    
    // Also update the texts_to_translate file to mark as translated
    if (textsToTranslate[slideId] && english in textsToTranslate[slideId]) {
      textsToTranslate[slideId][english] = thai;
    }
  }

  // Write the updated translations back to files
  fs.writeFileSync(mainTranslationsPath, JSON.stringify(mainTranslations, null, 2), 'utf8');
  fs.writeFileSync(textsToTranslatePath, JSON.stringify(textsToTranslate, null, 2), 'utf8');

  console.log(`Successfully updated main translations with slide ${slideId} translations.`);
} catch (error) {
  console.error(`Error updating translations:`, error);
  process.exit(1);
}