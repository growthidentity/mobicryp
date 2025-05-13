#!/bin/bash

# Script to update color patterns in slides to match the gold theme

# Skip these files
SKIP_FILES=("sample-gold-theme.html" "template.html")

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

    echo "Updating colors in $file..."
    
    # Update common inline style color references
    sed -i '' 's|color: #00d1ff;|color: #d4af37;|g' "$file"
    sed -i '' 's|color: var(--accent-color);|color: var(--accent-color);|g' "$file"
    
    # Update backgrounds
    sed -i '' 's|background: rgba(0, 209, 255, 0.2)|background: rgba(212, 175, 55, 0.2)|g' "$file"
    sed -i '' 's|background: rgba(0, 209, 255, 0.1)|background: rgba(212, 175, 55, 0.1)|g' "$file"
    sed -i '' 's|background: rgba(0, 209, 255, 0.15)|background: rgba(212, 175, 55, 0.15)|g' "$file"
    
    # Update borders
    sed -i '' 's|border: 1px solid rgba(0, 209, 255, 0.2)|border: 1px solid rgba(212, 175, 55, 0.2)|g' "$file"
    sed -i '' 's|border: 1px solid rgba(0, 209, 255, 0.3)|border: 1px solid rgba(212, 175, 55, 0.3)|g' "$file"
    sed -i '' 's|border: 2px solid rgba(0, 209, 255, 0.2)|border: 2px solid rgba(212, 175, 55, 0.2)|g' "$file"
    sed -i '' 's|border: 2px solid rgba(0, 209, 255, 0.3)|border: 2px solid rgba(212, 175, 55, 0.3)|g' "$file"
    sed -i '' 's|border: 2px solid rgba(0, 209, 255, 0.4)|border: 2px solid rgba(212, 175, 55, 0.4)|g' "$file"
    sed -i '' 's|border: 2px solid rgba(0, 209, 255, 0.5)|border: 2px solid rgba(212, 175, 55, 0.5)|g' "$file"
    
    # Update gradients
    sed -i '' 's|background: linear-gradient(145deg, rgba(0, 209, 255, 0.1) 0%, rgba(30, 84, 229, 0.1) 100%)|background: linear-gradient(145deg, rgba(212, 175, 55, 0.1) 0%, rgba(176, 141, 87, 0.1) 100%)|g' "$file"
    sed -i '' 's|background: linear-gradient(145deg, rgba(0, 209, 255, 0.2) 0%, rgba(30, 84, 229, 0.2) 100%)|background: linear-gradient(145deg, rgba(212, 175, 55, 0.2) 0%, rgba(176, 141, 87, 0.2) 100%)|g' "$file"
    sed -i '' 's|background: linear-gradient(90deg, var(--accent-color), #1e54e5)|background: linear-gradient(90deg, var(--accent-color), var(--secondary-color))|g' "$file"
    
    # Update backgrounds
    sed -i '' 's|background: rgba(0, 40, 80, 0.4)|background: rgba(255, 255, 255, 0.9)|g' "$file"
    sed -i '' 's|background: rgba(0, 0, 0, 0.2)|background: rgba(248, 248, 248, 0.9)|g' "$file"
    
    # Update box shadows
    sed -i '' 's|box-shadow: 0 0 15px rgba(0, 209, 255, 0.3)|box-shadow: 0 0 15px rgba(212, 175, 55, 0.3)|g' "$file"
    
    echo "Updated $file"
done

echo "All slides have been updated with colors matching the gold theme."