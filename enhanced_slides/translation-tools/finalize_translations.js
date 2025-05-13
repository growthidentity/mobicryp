// Script to finalize translations and create complete_translations.json
const fs = require('fs');
const path = require('path');

// File paths
const translationsPath = path.join(__dirname, 'translations.json');
const completeTranslationsPath = path.join(__dirname, 'complete_translations.json');

// Read the translations
try {
  const translations = JSON.parse(fs.readFileSync(translationsPath, 'utf8'));

  // Write to complete_translations.json
  fs.writeFileSync(completeTranslationsPath, JSON.stringify(translations, null, 2), 'utf8');
  console.log(`Successfully created complete_translations.json with all translations.`);
} catch (error) {
  console.error(`Error finalizing translations:`, error);
  process.exit(1);
}