#!/bin/bash

# Script to directly inject the gold theme into all slides with inline styles

# Find all HTML files
for file in *.html; do
    # Skip the sample and index files
    if [[ "$file" == "sample-gold-theme.html" || "$file" == "index.html" ]]; then
        echo "Skipping $file..."
        continue
    fi
    
    echo "Fixing gold theme in $file..."
    
    # Add inline styles directly to the body tag
    sed -i '' 's|<body>|<body style="background-color: #ffffff; color: #333333;">|g' "$file"
    
    # Add inline styles to the slide-content
    sed -i '' 's|<div class="slide-content|<div style="background-color: #ffffff !important; border: 1px solid rgba(212, 175, 55, 0.2) !important;" class="slide-content|g' "$file"
    
    # Fix circuit background
    sed -i '' 's|<div class="circuit-background|<div style="opacity: 0.5 !important; background-image: url(\"data:image/svg+xml,%3Csvg width=\x27100\x27 height=\x27100\x27 viewBox=\x270 0 100 100\x27 xmlns=\x27http://www.w3.org/2000/svg\x27%3E%3Cpath d=\x27M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\x27 fill=\x27rgba(212, 175, 55, 0.07)\x27 fill-rule=\x27evenodd\x27/%3E%3C/svg%3E\") !important;" class="circuit-background|g' "$file"
    
    # Fix headings and text colors
    sed -i '' 's|<h2 class="section-title|<h2 style="color: #d4af37 !important;" class="section-title|g' "$file"
    sed -i '' 's|<p class="section-description|<p style="color: #666666 !important;" class="section-description|g' "$file"
    
    # Fix button colors
    sed -i '' 's|<a href="index.html" class="nav-button|<a href="index.html" style="background: #f8f8f8 !important; color: #333333 !important; border: 1px solid #d4af37 !important;" class="nav-button|g' "$file"
    sed -i '' 's|<a href="|<a style="background: #f8f8f8 !important; color: #333333 !important; border: 1px solid #d4af37 !important;" href="|g' "$file"
    
    # Fix CTA buttons
    sed -i '' 's|premium-cta"|premium-cta" style="background: linear-gradient(90deg, #d4af37, #b08d57) !important; color: white !important;"|g' "$file"
    
    echo "Fixed $file"
done

echo "All slides have been fixed with inline gold styling!"