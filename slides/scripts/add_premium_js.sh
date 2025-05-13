#!/bin/bash

# Get the directory of the script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SLIDES_DIR="$SCRIPT_DIR/../enhanced_slides"

# Process each HTML file that's missing premium.js
for file in $(grep -L "premium\.js" $SLIDES_DIR/*.html); do
  echo "Processing $file"
  # Add premium.js script before </body> tag
  sed -i '' 's|</body>|    <script src="../assets/js/premium.js"></script>\n</body>|' "$file"
done

echo "All files processed."