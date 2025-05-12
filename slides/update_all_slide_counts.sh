#!/bin/bash

# update_all_slide_counts.sh
# Script to update slide counts and navigation after deletion of slide 19
# Created: May 12, 2025

# Make sure we're in the slides directory
SLIDES_DIR="/Users/vambolatullus/Desktop/MOBICRYP2.0/github/slides"
cd "$SLIDES_DIR" || { echo "Error: Cannot change to slides directory"; exit 1; }

echo "Updating slide counts and navigation in all HTML files..."

# Get the current total number of slides (excluding enhanced versions)
TOTAL_SLIDES=$(find . -maxdepth 1 -name "[0-9]*.html" | grep -v "_enhanced" | wc -l | tr -d ' ')
echo "Total slides detected: $TOTAL_SLIDES"

# Update total slide counts in all files
echo "Updating total slide count to $TOTAL_SLIDES..."
find . -name "*.html" -exec sed -i '' "s/Slide [0-9]* of 37/Slide PLACEHOLDER of $TOTAL_SLIDES/g" {} \;
find . -name "*.html" -exec sed -i '' "s/Slide [0-9]* of 39/Slide PLACEHOLDER of $TOTAL_SLIDES/g" {} \;

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
    
    # For slides 20 and above, decrement the slide number in the counter (since slide 19 was removed)
    DISPLAY_NUM=$SLIDE_NUM
    if [ "$SLIDE_NUM" -ge 20 ]; then
        DISPLAY_NUM=$((SLIDE_NUM - 1))
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
    sed -i '' "s/1-37/1-$TOTAL_SLIDES/g" "index.html"
    sed -i '' "s/1-39/1-$TOTAL_SLIDES/g" "index.html"
    sed -i '' "s/Total: 37/Total: $TOTAL_SLIDES/g" "index.html"
    sed -i '' "s/Total: 39/Total: $TOTAL_SLIDES/g" "index.html"
fi

# Fix navigation links for slides around the deleted slide 19
echo "Fixing navigation links around deleted slide 19..."

# Fix slide 18 navigation links (next should go to 20 instead of 19)
for FILE in "18.html" "18_enhanced.html"; do
    if [ -f "$FILE" ]; then
        echo "Updating navigation in $FILE..."
        sed -i '' 's/href="19.html"/href="20.html"/g' "$FILE"
        sed -i '' 's/href="19_enhanced.html"/href="20_enhanced.html"/g' "$FILE"
    fi
done

# Fix slide 20 navigation links (previous should go to 18 instead of 19)
for FILE in "20.html" "20_enhanced.html"; do
    if [ -f "$FILE" ]; then
        echo "Updating navigation in $FILE..."
        sed -i '' 's/href="19.html"/href="18.html"/g' "$FILE"
        sed -i '' 's/href="19_enhanced.html"/href="18_enhanced.html"/g' "$FILE"
    fi
done

# Fix all subsequent slides' navigation links (for slides 21 and above)
for i in $(seq 21 100); do  # Large upper bound to catch all slides
    CURRENT="$i.html"
    ENHANCED="${i}_enhanced.html"
    PREV_SLIDE=$((i-1))
    NEXT_SLIDE=$((i+1))
    
    # Update navigation in regular version
    if [ -f "$CURRENT" ]; then
        echo "Updating navigation in $CURRENT..."
        sed -i '' "s/href=\"$PREV_SLIDE.html\"/href=\"$PREV_SLIDE.html\"/g" "$CURRENT"
        sed -i '' "s/href=\"$NEXT_SLIDE.html\"/href=\"$NEXT_SLIDE.html\"/g" "$CURRENT"
    fi
    
    # Update navigation in enhanced version
    if [ -f "$ENHANCED" ]; then
        echo "Updating navigation in $ENHANCED..."
        sed -i '' "s/href=\"${PREV_SLIDE}_enhanced.html\"/href=\"${PREV_SLIDE}_enhanced.html\"/g" "$ENHANCED"
        sed -i '' "s/href=\"${NEXT_SLIDE}_enhanced.html\"/href=\"${NEXT_SLIDE}_enhanced.html\"/g" "$ENHANCED"
    fi
done

echo "All slide counts and navigation updated successfully!"
echo "Remember to test the navigation by clicking through the slides."