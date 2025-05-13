#!/bin/bash

# Count the number of slide files
total_slides=$(find . -name "[0-9][0-9].html" | wc -l)
total_slides=$(echo $total_slides | xargs) # Trim whitespace

echo "Total slides found: $total_slides"

# Update all slide counter elements in all slide files
for slide in $(find . -name "[0-9][0-9].html" | sort); do
  slide_num=$(basename $slide | sed 's/\.html//')
  
  # Update the slide counter
  sed -i '' "s/<div class=\"slide-counter\">Slide [0-9]* of [0-9]*<\/div>/<div class=\"slide-counter\">Slide $slide_num of $total_slides<\/div>/g" "$slide"
  
  echo "Updated counter in $slide to 'Slide $slide_num of $total_slides'"
done

echo "All slide counters have been updated!"

# Check navigation buttons on slides 01.html and 03.html
echo "Checking navigation on slide 01.html..."
prev_link=$(grep -o "href=\"[^\"]*\"" "./01.html" | grep "prev-button" | sed 's/href="\([^"]*\)"/\1/')
next_link=$(grep -o "href=\"[^\"]*\"" "./01.html" | grep "next-button" | sed 's/href="\([^"]*\)"/\1/')
home_link=$(grep -o "href=\"[^\"]*\"" "./01.html" | grep "home-button" | sed 's/href="\([^"]*\)"/\1/')

echo "  Previous button points to: $prev_link"
echo "  Next button points to: $next_link"
echo "  Home button points to: $home_link"

echo "Checking navigation on slide 03.html..."
prev_link=$(grep -o "href=\"[^\"]*\"" "./03.html" | grep "prev-button" | sed 's/href="\([^"]*\)"/\1/')
next_link=$(grep -o "href=\"[^\"]*\"" "./03.html" | grep "next-button" | sed 's/href="\([^"]*\)"/\1/')
home_link=$(grep -o "href=\"[^\"]*\"" "./03.html" | grep "home-button" | sed 's/href="\([^"]*\)"/\1/')

echo "  Previous button points to: $prev_link"
echo "  Next button points to: $next_link"
echo "  Home button points to: $home_link"