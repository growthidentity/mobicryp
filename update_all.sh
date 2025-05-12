#!/bin/bash

# Script to update all HTML slides with premium enhancements

# Get all HTML slides
slides=$(find . -name "*.html" | grep -v "index.html")

# Loop through each slide
for slide in $slides; do
  echo "Processing $slide..."
  
  # Check if premium.css is already included
  if ! grep -q "premium.css" "$slide"; then
    # Add premium.css after common.css
    sed -i '' 's|<link rel="stylesheet" href="common.css">|<link rel="stylesheet" href="common.css">\n    <link rel="stylesheet" href="premium.css">|g' "$slide"
    echo "  - Added premium.css to $slide"
  fi
  
  # Check if premium.js is already included
  if ! grep -q "premium.js" "$slide"; then
    # Add premium.js before closing body tag
    sed -i '' 's|</body>|    <script src="premium.js"></script>\n</body>|g' "$slide"
    echo "  - Added premium.js to $slide"
  fi
  
  # Update circuit background
  if grep -q 'class="circuit-background"' "$slide" && ! grep -q 'class="circuit-background premium-circuit-background"' "$slide"; then
    sed -i '' 's|class="circuit-background"|class="circuit-background premium-circuit-background"|g' "$slide"
    echo "  - Enhanced circuit background in $slide"
  fi
  
  # Update slide content
  if grep -q 'class="slide-content"' "$slide" && ! grep -q 'class="slide-content premium-slide"' "$slide"; then
    sed -i '' 's|class="slide-content"|class="slide-content premium-slide"|g' "$slide"
    echo "  - Enhanced slide content in $slide"
  fi
  
  # Update section titles
  if grep -q 'class="section-title"' "$slide" && ! grep -q 'class="section-title premium-text"' "$slide"; then
    sed -i '' 's|class="section-title"|class="section-title premium-text"|g' "$slide"
    echo "  - Enhanced section titles in $slide"
  fi
  
  # Update navigation buttons
  if grep -q 'class="nav-button home-button"' "$slide" && ! grep -q 'class="nav-button premium-button home-button"' "$slide"; then
    sed -i '' 's|class="nav-button home-button"|class="nav-button premium-button home-button"|g' "$slide"
    echo "  - Enhanced home button in $slide"
  fi
  
  if grep -q 'class="nav-button" id="prev-button"' "$slide" && ! grep -q 'class="nav-button premium-button" id="prev-button"' "$slide"; then
    sed -i '' 's|class="nav-button" id="prev-button"|class="nav-button premium-button" id="prev-button"|g' "$slide"
    echo "  - Enhanced prev button in $slide"
  fi
  
  if grep -q 'class="nav-button" id="next-button"' "$slide" && ! grep -q 'class="nav-button premium-button premium-cta" id="next-button"' "$slide"; then
    sed -i '' 's|class="nav-button" id="next-button"|class="nav-button premium-button premium-cta" id="next-button"|g' "$slide"
    echo "  - Enhanced next button in $slide"
  fi
done

echo "All slides have been updated with premium enhancements!"