#!/bin/bash

# Script to update all slides to use the gold theme

# Skip these files
SKIP_FILES=("sample-gold-theme.html" "index.html" "14.html" "15.html" "template.html")

for file in *.html; do
    # Check if file should be skipped
    skip=false
    for skip_file in "${SKIP_FILES[@]}"; do
        if [ "$file" = "$skip_file" ]; then
            skip=true
            break
        fi
    done

    if [ "$skip" = true ]; then
        echo "Skipping $file (already updated or not needed)"
        continue
    fi

    echo "Updating $file to use gold theme..."
    
    # Replace premium.css with premium-gold.css
    sed -i '' 's|<link rel="stylesheet" href="premium.css">|<link rel="stylesheet" href="premium-gold.css">|g' "$file"
    
    echo "Updated $file"
done

echo "All slides have been updated to use the gold theme."