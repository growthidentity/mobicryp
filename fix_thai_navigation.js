const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// Path to enhanced slides directory
const slidesDir = path.join(__dirname, 'slides/enhanced_slides');

// Function to fix links in Thai slides
async function fixThaiNavigation() {
  console.log('Fixing Thai navigation links...');
  
  // Get all Thai slides
  const thaiSlides = fs.readdirSync(slidesDir)
    .filter(file => file.endsWith('_enhanced_th.html') && !file.startsWith('index'));
  
  console.log(`Found ${thaiSlides.length} Thai slides to process`);
  
  // Process each Thai slide
  for (const slide of thaiSlides) {
    const slideNumber = slide.split('_')[0];
    const slidePath = path.join(slidesDir, slide);
    
    console.log(`Processing ${slide}`);
    
    try {
      // Read the file content
      let content = await readFile(slidePath, 'utf8');
      
      // Fix home button link (should point to Thai index)
      content = content.replace(
        /href="\.\.\/index\.html"/g, 
        'href="index_enhanced_th.html"'
      );
      
      // Fix previous and next button links (should point to Thai slides)
      content = content.replace(
        /href="(\d+)_enhanced\.html"/g, 
        'href="$1_enhanced_th.html"'
      );
      
      // Write the updated content back to the file
      await writeFile(slidePath, content, 'utf8');
      console.log(`✅ Fixed navigation in ${slide}`);
    } catch (error) {
      console.error(`❌ Error processing ${slide}:`, error);
    }
  }
  
  console.log('All Thai slides processed');
}

// Function to check old Thai directory and update if needed
async function handleOldThaiDirectory() {
  console.log('Checking old Thai directory...');
  
  const oldThaiDir = path.join(slidesDir, 'thai');
  
  // Check if the directory exists
  if (!fs.existsSync(oldThaiDir)) {
    console.log('Old Thai directory does not exist. Nothing to update.');
    return;
  }
  
  const oldIndexPath = path.join(oldThaiDir, 'index_enhanced_th.html');
  
  // Check if old index exists
  if (!fs.existsSync(oldIndexPath)) {
    console.log('Old Thai index does not exist. Nothing to update.');
    return;
  }
  
  try {
    // Read the new correct Thai index
    const newIndexPath = path.join(slidesDir, 'index_enhanced_th.html');
    const newIndexContent = await readFile(newIndexPath, 'utf8');
    
    // Update the old index with the new content
    await writeFile(oldIndexPath, newIndexContent, 'utf8');
    console.log('✅ Updated old Thai index with correct translations');
  } catch (error) {
    console.error('❌ Error updating old Thai index:', error);
  }
}

// Main function
async function main() {
  try {
    await fixThaiNavigation();
    await handleOldThaiDirectory();
    console.log('✅ All fixes completed successfully!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

// Run the main function
main();