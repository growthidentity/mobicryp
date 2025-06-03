#!/bin/bash

# Script to update HTML files to use positive theme

# Function to update a single file
update_file() {
    local file=$1
    local slide_num=$2
    local slide_total=22
    
    echo "Updating $file..."
    
    # Create a temporary file
    temp_file="${file}.tmp"
    
    # Read the original file and extract the title
    title=$(grep -o '<title>.*</title>' "$file" | sed 's/<title>MobiCryp - //;s/<\/title>//')
    
    # Start writing the new file
    cat > "$temp_file" << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
EOF
    
    echo "    <title>MobiCryp - $title</title>" >> "$temp_file"
    
    cat >> "$temp_file" << 'EOF'
    <link rel="stylesheet" href="positive-theme.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        /* Slide-specific styles */
EOF
    
    # Extract and add any unique styles that need to be preserved
    # This is a placeholder - actual implementation would need to parse specific styles
    
    cat >> "$temp_file" << 'EOF'
    </style>
</head>
<body>
    <!-- Header -->
    <div class="header">
EOF
    
    echo "        <div class=\"slide-counter\">Slide $slide_num of $slide_total</div>" >> "$temp_file"
    
    cat >> "$temp_file" << 'EOF'
        <div class="logo-text">MobiCryp</div>
    </div>

    <!-- Main slide content -->
    <div class="slide-container">
        <div class="slide-content">
            <!-- Background decoration -->
            <div class="bg-decoration">
                <div class="bg-circle bg-circle-1"></div>
                <div class="bg-circle bg-circle-2"></div>
                <div class="bg-circle bg-circle-3"></div>
            </div>

            <!-- Content will be inserted here -->
EOF
    
    # Extract main content from original file
    # This would need more sophisticated parsing in practice
    
    cat >> "$temp_file" << 'EOF'
        </div>
    </div>
    
    <!-- Navigation buttons -->
    <div class="navigation">
        <a href="index_enhanced.html" class="nav-button home-button">
            <i class="fas fa-home"></i> All Slides
        </a>
        <div style="display: flex; gap: 10px;">
EOF
    
    # Add navigation links
    if [ "$slide_num" -eq 1 ]; then
        prev_file="01_the_world_has_changed.html"
    else
        prev_num=$(printf "%02d" $((slide_num - 1)))
        prev_file=$(ls ${prev_num}_*.html 2>/dev/null | head -1)
    fi
    
    if [ "$slide_num" -eq 22 ]; then
        next_file="22_start_your_journey_today.html"
    else
        next_num=$(printf "%02d" $((slide_num + 1)))
        next_file=$(ls ${next_num}_*.html 2>/dev/null | head -1)
    fi
    
    echo "            <a href=\"$prev_file\" class=\"nav-button\" id=\"prev-button\">" >> "$temp_file"
    echo "                <i class=\"fas fa-arrow-left\"></i> Previous" >> "$temp_file"
    echo "            </a>" >> "$temp_file"
    echo "            <a href=\"$next_file\" class=\"nav-button\" id=\"next-button\">" >> "$temp_file"
    echo "                Next <i class=\"fas fa-arrow-right\"></i>" >> "$temp_file"
    echo "            </a>" >> "$temp_file"
    
    cat >> "$temp_file" << 'EOF'
        </div>
    </div>
</body>
</html>
EOF
    
    echo "Completed $file"
}

# Process files
for i in {03..22}; do
    num=$(printf "%02d" $i)
    for file in ${num}_*.html; do
        if [[ -f "$file" && "$file" != *"_sample.html" ]]; then
            update_file "$file" $i
        fi
    done
done

echo "Update script completed!"