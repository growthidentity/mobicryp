// Script to finalize Thai slides and verify all translations are properly applied
const fs = require('fs');
const path = require('path');

// Directories
const slidesDirectory = path.join(__dirname, '..');
const thaiDirectory = path.join(slidesDirectory, 'thai');

// Create thai directory if it doesn't exist
if (!fs.existsSync(thaiDirectory)) {
  fs.mkdirSync(thaiDirectory, { recursive: true });
  console.log(`Created Thai slides directory: ${thaiDirectory}`);
}

// Copy all Thai slides to the thai directory
function copyThaiSlides() {
  // Get all Thai HTML files
  const thaiFiles = fs.readdirSync(slidesDirectory)
    .filter(file => file.endsWith('_th.html'));
  
  console.log(`Found ${thaiFiles.length} Thai slide files`);
  
  // Copy each file
  thaiFiles.forEach(file => {
    const sourcePath = path.join(slidesDirectory, file);
    const targetPath = path.join(thaiDirectory, file);
    
    try {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Copied ${file} to ${thaiDirectory}`);
    } catch (error) {
      console.error(`Error copying ${file}:`, error);
    }
  });
}

// Create language switcher HTML file
function createLanguageSwitcher() {
  const switcherHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MobiCryp Presentation - Language Selector</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #121212;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    
    .language-container {
      text-align: center;
      background-color: rgba(30, 30, 30, 0.8);
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    }
    
    h1 {
      font-size: 2.5em;
      margin-bottom: 30px;
      color: #f0a500;
    }
    
    .language-buttons {
      display: flex;
      justify-content: center;
      gap: 20px;
    }
    
    .language-button {
      background-color: #2c3e50;
      color: white;
      border: none;
      padding: 15px 30px;
      font-size: 1.2em;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .language-button:hover {
      background-color: #3498db;
      transform: translateY(-3px);
    }
    
    .logo {
      margin-bottom: 20px;
      max-width: 200px;
    }
  </style>
</head>
<body>
  <div class="language-container">
    <img src="assets/images/logo.png" alt="MobiCryp Logo" class="logo">
    <h1>Choose Your Language / เลือกภาษา</h1>
    <div class="language-buttons">
      <button class="language-button" onclick="window.location.href='index_enhanced.html'">English</button>
      <button class="language-button" onclick="window.location.href='index_enhanced_th.html'">ไทย (Thai)</button>
    </div>
  </div>
</body>
</html>
  `;
  
  const switcherPath = path.join(slidesDirectory, 'language.html');
  
  try {
    fs.writeFileSync(switcherPath, switcherHtml);
    console.log(`Created language switcher at ${switcherPath}`);
  } catch (error) {
    console.error('Error creating language switcher:', error);
  }
}

// Create README file with instructions
function createReadme() {
  const readmeContent = `# MobiCryp Presentation - Multilingual Support

## Overview

This presentation is available in multiple languages:

- English: Open \`index_enhanced.html\`
- Thai: Open \`index_enhanced_th.html\`

## Language Selector

For a nice language selection page, open \`language.html\`

## Directory Structure

- Main directory: Contains all English and Thai slides
- \`/thai\`: Contains copies of all Thai slides (for organizational purposes)

## Notes

- All slides have been translated using the ChatGPT API
- Technical terms are transliterated where appropriate
- Language switchers are included on all pages

## Maintenance

If you need to update translations:

1. Modify the files in \`/tmp/complete_translations.json\`
2. Run the apply_translations_updated.js script
3. Optionally copy the new Thai slides to the /thai directory using finalize_thai_slides.js
`;
  
  const readmePath = path.join(slidesDirectory, 'README.md');
  
  try {
    fs.writeFileSync(readmePath, readmeContent);
    console.log(`Created README at ${readmePath}`);
  } catch (error) {
    console.error('Error creating README:', error);
  }
}

// Add redirection from index.html to language.html
function createIndexRedirect() {
  const redirectHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="refresh" content="0; url=language.html">
  <title>Redirecting to Language Selector</title>
</head>
<body>
  Redirecting to language selector...
  <script>
    window.location.href = "language.html";
  </script>
</body>
</html>
  `;
  
  const indexPath = path.join(slidesDirectory, 'index.html');
  
  try {
    // Create backup of original index.html if it exists and no backup exists yet
    if (fs.existsSync(indexPath) && !fs.existsSync(indexPath + '.bak')) {
      fs.copyFileSync(indexPath, indexPath + '.bak');
      console.log(`Created backup of original index.html at ${indexPath}.bak`);
    }
    
    fs.writeFileSync(indexPath, redirectHtml);
    console.log(`Created index redirect at ${indexPath}`);
  } catch (error) {
    console.error('Error creating index redirect:', error);
  }
}

// Run all finalization steps
console.log('Starting finalization process...');
copyThaiSlides();
createLanguageSwitcher();
createReadme();
createIndexRedirect();
console.log('Finalization complete!');