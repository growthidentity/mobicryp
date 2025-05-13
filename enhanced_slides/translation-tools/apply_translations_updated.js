// Script to apply translations to HTML slides
const fs = require('fs');
const path = require('path');

// File paths
const translationsPath = path.join(__dirname, 'complete_translations.json');
const slidesDirectory = path.join(__dirname, '..');  // Parent directory contains the slides

// Read the translations
let translations;
try {
  translations = JSON.parse(fs.readFileSync(translationsPath, 'utf8'));
} catch (error) {
  console.error('Error reading translations file:', error);
  process.exit(1);
}

// Function to apply translations to a single HTML file
function applyTranslationsToFile(filePath, slideId) {
  // Read the HTML file
  let html;
  try {
    html = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return;
  }

  // Get translations for this slide
  const slideTranslations = translations.slides[slideId];
  if (!slideTranslations) {
    console.warn(`No translations found for slide ${slideId}`);
    return;
  }

  // Common translations
  const commonTranslations = translations.common || {};

  // Apply slide-specific translations
  for (const [english, thai] of Object.entries(slideTranslations)) {
    if (thai && thai.trim() !== '') {
      // Escape special characters in the English text for regex
      const escapedEnglish = english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      
      // Create a regex that looks for the English text within HTML content
      // but not within HTML attributes or tags
      const regex = new RegExp(`(>\\s*|^\\s*)${escapedEnglish}(\\s*<|\\s*$)`, 'g');
      
      // Replace with the Thai translation, preserving the surrounding whitespace
      html = html.replace(regex, `$1${thai}$2`);
    }
  }

  // Apply common translations
  for (const [english, thai] of Object.entries(commonTranslations)) {
    if (thai && thai.trim() !== '') {
      // Escape special characters in the English text for regex
      const escapedEnglish = english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      
      // Create a regex that looks for the English text within HTML content
      // but not within HTML attributes or tags
      const regex = new RegExp(`(>\\s*|^\\s*)${escapedEnglish}(\\s*<|\\s*$)`, 'g');
      
      // Replace with the Thai translation, preserving the surrounding whitespace
      html = html.replace(regex, `$1${thai}$2`);
    }
  }

  // Create a new file with the translations
  const thaiFilePath = filePath.replace('_enhanced.html', '_enhanced_th.html');
  try {
    fs.writeFileSync(thaiFilePath, html, 'utf8');
    console.log(`Created Thai version of slide ${slideId}: ${thaiFilePath}`);
  } catch (error) {
    console.error(`Error writing Thai file for slide ${slideId}:`, error);
  }
}

// Function to process all slides
function processAllSlides() {
  // Get all HTML files in the slides directory
  const files = fs.readdirSync(slidesDirectory)
    .filter(file => file.endsWith('_enhanced.html') && !file.includes('_th.html'));

  // Process each file
  for (const file of files) {
    const match = file.match(/^(\d+)_enhanced\.html$/);
    if (match) {
      const slideId = match[1];
      const filePath = path.join(slidesDirectory, file);
      console.log(`Processing slide ${slideId} (${file})...`);
      applyTranslationsToFile(filePath, slideId);
    }
  }

  console.log('Translation application complete!');
}

// Also create a Thai version of the index.html file
function createThaiIndex() {
  const indexPath = path.join(slidesDirectory, 'index_enhanced.html');
  
  // Read the index file
  let html;
  try {
    html = fs.readFileSync(indexPath, 'utf8');
  } catch (error) {
    console.error(`Error reading index file ${indexPath}:`, error);
    return;
  }

  // Get index translations
  const indexTranslations = translations.index || {};
  
  // Apply index translations
  for (const [english, thai] of Object.entries(indexTranslations)) {
    if (thai && thai.trim() !== '') {
      // Escape special characters in the English text for regex
      const escapedEnglish = english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      
      // Create a regex that looks for the English text within HTML content
      const regex = new RegExp(`(>\\s*|^\\s*)${escapedEnglish}(\\s*<|\\s*$)`, 'g');
      
      // Replace with the Thai translation, preserving the surrounding whitespace
      html = html.replace(regex, `$1${thai}$2`);
    }
  }

  // Apply common translations
  const commonTranslations = translations.common || {};
  for (const [english, thai] of Object.entries(commonTranslations)) {
    if (thai && thai.trim() !== '') {
      // Escape special characters in the English text for regex
      const escapedEnglish = english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      
      // Create a regex that looks for the English text within HTML content
      const regex = new RegExp(`(>\\s*|^\\s*)${escapedEnglish}(\\s*<|\\s*$)`, 'g');
      
      // Replace with the Thai translation, preserving the surrounding whitespace
      html = html.replace(regex, `$1${thai}$2`);
    }
  }

  // Add language switcher to the HTML
  html = html.replace('<body>', `<body>
  <div class="language-switcher">
    <a href="index_enhanced.html">English</a> | <a href="index_enhanced_th.html">ไทย</a>
  </div>`);

  // Add CSS for language switcher
  html = html.replace('</style>', `
  .language-switcher {
    position: fixed;
    top: 10px;
    right: 10px;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 5px 10px;
    border-radius: 5px;
    z-index: 1000;
    color: #fff;
  }
  .language-switcher a {
    color: #fff;
    text-decoration: none;
    margin: 0 5px;
  }
  .language-switcher a:hover {
    text-decoration: underline;
  }
</style>`);

  // Create a new index file with the translations
  const thaiIndexPath = path.join(slidesDirectory, 'index_enhanced_th.html');
  try {
    fs.writeFileSync(thaiIndexPath, html, 'utf8');
    console.log(`Created Thai version of index: ${thaiIndexPath}`);
  } catch (error) {
    console.error(`Error writing Thai index file:`, error);
  }

  // Add language switcher to the original English index.html
  let englishIndex;
  try {
    englishIndex = fs.readFileSync(indexPath, 'utf8');
    
    // Add language switcher if it doesn't already exist
    if (!englishIndex.includes('language-switcher')) {
      englishIndex = englishIndex.replace('<body>', `<body>
  <div class="language-switcher">
    <a href="index_enhanced.html">English</a> | <a href="index_enhanced_th.html">ไทย</a>
  </div>`);

      // Add CSS for language switcher
      englishIndex = englishIndex.replace('</style>', `
  .language-switcher {
    position: fixed;
    top: 10px;
    right: 10px;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 5px 10px;
    border-radius: 5px;
    z-index: 1000;
    color: #fff;
  }
  .language-switcher a {
    color: #fff;
    text-decoration: none;
    margin: 0 5px;
  }
  .language-switcher a:hover {
    text-decoration: underline;
  }
</style>`);

      // Update the original English index
      fs.writeFileSync(indexPath, englishIndex, 'utf8');
      console.log(`Updated English index with language switcher`);
    }
  } catch (error) {
    console.error(`Error updating English index file:`, error);
  }
}

// Run the process
console.log('Starting translation application process...');
processAllSlides();
createThaiIndex();
console.log('Done!');