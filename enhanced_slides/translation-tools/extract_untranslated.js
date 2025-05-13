// Script to extract untranslated text from HTML slides
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// File paths
const slidesDirectory = path.join(__dirname, '..', 'slides');
const outputPath = path.join(__dirname, 'texts_to_translate.json');

// Function to extract text from a single HTML file
function extractTextFromFile(filePath, slideId, resultObj) {
  // Read the HTML file
  let html;
  try {
    html = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return;
  }

  // Parse the HTML
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // Initialize slide object in result if not exists
  if (!resultObj[slideId]) {
    resultObj[slideId] = {};
  }

  // Extract text from specific elements
  // Headings
  document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(element => {
    const text = element.textContent.trim();
    if (text && text.length > 1 && !/^\d+$/.test(text)) {
      resultObj[slideId][text] = "";
    }
  });

  // Paragraphs
  document.querySelectorAll('p').forEach(element => {
    const text = element.textContent.trim();
    if (text && text.length > 1) {
      resultObj[slideId][text] = "";
    }
  });

  // List items
  document.querySelectorAll('li').forEach(element => {
    const text = element.textContent.trim();
    if (text && text.length > 1) {
      resultObj[slideId][text] = "";
    }
  });

  // Spans and divs with class 'label' or containing meaningful content
  document.querySelectorAll('span, div').forEach(element => {
    // Skip elements that are just containers and don't have direct text
    if (element.children.length > 0 && !element.textContent.trim()) {
      return;
    }
    
    const text = element.textContent.trim();
    if (text && text.length > 1 && !/^\d+$/.test(text) && 
        (element.classList.contains('label') || text.split(' ').length > 1)) {
      resultObj[slideId][text] = "";
    }
  });

  // Buttons and links
  document.querySelectorAll('button, a').forEach(element => {
    const text = element.textContent.trim();
    if (text && text.length > 1 && !/^\d+$/.test(text)) {
      resultObj[slideId][text] = "";
    }
  });
}

// Function to extract text from all slides
function extractAllTexts() {
  // Check if slides directory exists
  if (!fs.existsSync(slidesDirectory)) {
    console.error(`Slides directory not found: ${slidesDirectory}`);
    process.exit(1);
  }

  const result = {};

  // Get all HTML files in the slides directory
  const files = fs.readdirSync(slidesDirectory)
    .filter(file => file.endsWith('.html') && !file.endsWith('_th.html'));

  // Process each file
  for (const file of files) {
    const match = file.match(/^(\d+)\.html$/);
    if (match) {
      const slideId = match[1];
      const filePath = path.join(slidesDirectory, file);
      console.log(`Processing slide ${slideId} (${file})...`);
      extractTextFromFile(filePath, slideId, result);
    }
  }

  // Write result to file
  try {
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf8');
    console.log(`Extracted texts written to ${outputPath}`);
  } catch (error) {
    console.error(`Error writing to ${outputPath}:`, error);
  }
}

// Extract texts from index.html for navigation elements
function extractIndexTexts(result) {
  const indexPath = path.join(__dirname, '..', 'index.html');
  
  // Read the index file
  let html;
  try {
    html = fs.readFileSync(indexPath, 'utf8');
  } catch (error) {
    console.error(`Error reading index file ${indexPath}:`, error);
    return;
  }

  // Parse the HTML
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // Initialize index object in result
  if (!result.index) {
    result.index = {};
  }

  // Extract title and meta description
  const title = document.querySelector('title');
  if (title) {
    result.index[title.textContent.trim()] = "";
  }

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription && metaDescription.getAttribute('content')) {
    result.index[metaDescription.getAttribute('content').trim()] = "";
  }

  // Extract navigation links
  document.querySelectorAll('nav a').forEach(element => {
    const text = element.textContent.trim();
    if (text && text.length > 1) {
      result.index[text] = "";
    }
  });

  // Extract buttons
  document.querySelectorAll('button').forEach(element => {
    const text = element.textContent.trim();
    if (text && text.length > 1) {
      result.index[text] = "";
    }
  });

  // Extract footer text
  document.querySelectorAll('footer').forEach(element => {
    const text = element.textContent.trim();
    if (text && text.length > 1) {
      result.index[text] = "";
    }
  });
}

// Extract common UI elements
function extractCommonElements(result) {
  // Initialize common object in result
  if (!result.common) {
    result.common = {};
  }

  // Common UI elements
  const commonElements = [
    "Previous",
    "Next",
    "All Slides",
    "Home",
    "Slide",
    "of",
    "MobiCryp"
  ];

  for (const element of commonElements) {
    result.common[element] = "";
  }
}

// Run the extraction process
console.log('Starting text extraction process...');
const result = {};
extractAllTexts(result);
extractIndexTexts(result);
extractCommonElements(result);
console.log('Done!');