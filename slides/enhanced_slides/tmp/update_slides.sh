#!/bin/bash

# Function to update a slide file
update_slide() {
    local old_num=$1
    local new_num=$2
    local file="$new_num"_enhanced.html
    
    # Update slide counter
    sed -i '' "s/Slide $old_num of [0-9]*/Slide $new_num of 32/g" "$file"
    
    # Update previous button (except for slide 19 which already points to 18)
    if [ "$new_num" != "19" ]; then
        local prev_num=$((new_num - 1))
        sed -i '' "s/href=\"[0-9]*_enhanced.html\" class=\"nav-button premium-button\" id=\"prev-button\"/href=\"${prev_num}_enhanced.html\" class=\"nav-button premium-button\" id=\"prev-button\"/g" "$file"
    fi
    
    # Update next button (except for slide 32 which is the last one)
    if [ "$new_num" != "32" ]; then
        local next_num=$((new_num + 1))
        sed -i '' "s/href=\"[0-9]*_enhanced.html\" class=\"nav-button premium-button premium-cta\" id=\"next-button\"/href=\"${next_num}_enhanced.html\" class=\"nav-button premium-button premium-cta\" id=\"next-button\"/g" "$file"
    fi
    
    echo "Updated slide $old_num to $new_num"
}

# Update each slide
update_slide 26 20
update_slide 27 21
update_slide 28 22
update_slide 29 23
update_slide 30 24
update_slide 31 25
update_slide 32 26
update_slide 33 27
update_slide 34 28
update_slide 35 29
update_slide 36 30
update_slide 37 31
update_slide 38 32

echo "All slides updated!"