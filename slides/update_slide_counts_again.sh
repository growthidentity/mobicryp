#!/bin/bash

# Script to update slide counts and navigation after removal of slides 19-24
# Created: May 12, 2025

# Make sure we're in the slides directory
SLIDES_DIR="/Users/vambolatullus/Desktop/MOBICRYP2.0/github/slides"
cd "$SLIDES_DIR" || { echo "Error: Cannot change to slides directory"; exit 1; }

echo "Updating slide counts and navigation after removing slides 19-24..."

# Get the current total number of slides (excluding enhanced versions)
TOTAL_SLIDES=$(find . -maxdepth 1 -name "[0-9]*.html" | grep -v "_enhanced" | wc -l | tr -d ' ')
echo "Total slides detected: $TOTAL_SLIDES"

# Update total slide counts in all files
echo "Updating total slide count to $TOTAL_SLIDES..."
find . -name "*.html" -exec sed -i '' "s/Slide [0-9]* of [0-9]*/Slide PLACEHOLDER of $TOTAL_SLIDES/g" {} \;

# Update individual slide numbers based on filename
echo "Updating individual slide numbers..."
for FILE in $(find . -maxdepth 1 -name "[0-9]*.html" | sort); do
    BASENAME=$(basename "$FILE" .html)
    
    # Skip enhanced versions as they will be handled separately
    if [[ "$BASENAME" == *"_enhanced"* ]]; then
        continue
    fi
    
    # Extract slide number
    SLIDE_NUM=${BASENAME}
    
    # For slides 25 and above, decrement the slide number in the counter by 6 (since 6 slides were removed)
    DISPLAY_NUM=$SLIDE_NUM
    if [ "$SLIDE_NUM" -ge 25 ]; then
        DISPLAY_NUM=$((SLIDE_NUM - 6))
    fi
    
    echo "Setting $FILE to slide $DISPLAY_NUM of $TOTAL_SLIDES"
    sed -i '' "s/Slide PLACEHOLDER of $TOTAL_SLIDES/Slide $DISPLAY_NUM of $TOTAL_SLIDES/g" "$FILE"
    
    # Also update the enhanced version if it exists
    ENHANCED_FILE="${BASENAME}_enhanced.html"
    if [ -f "$ENHANCED_FILE" ]; then
        echo "Setting $ENHANCED_FILE to slide $DISPLAY_NUM of $TOTAL_SLIDES"
        sed -i '' "s/Slide PLACEHOLDER of $TOTAL_SLIDES/Slide $DISPLAY_NUM of $TOTAL_SLIDES/g" "$ENHANCED_FILE"
    fi
done

# Special case for index.html which might have different formatting
if [ -f "index.html" ]; then
    echo "Updating index.html slide count..."
    sed -i '' "s/1-[0-9]*/1-$TOTAL_SLIDES/g" "index.html"
    sed -i '' "s/Total: [0-9]*/Total: $TOTAL_SLIDES/g" "index.html"
fi

echo "All slide counts updated successfully!"