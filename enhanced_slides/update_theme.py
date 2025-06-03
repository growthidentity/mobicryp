#!/usr/bin/env python3
import re
import os
from pathlib import Path

def extract_slide_info(filename):
    """Extract slide number and title from filename"""
    match = re.match(r'(\d+)_(.+)\.html', filename)
    if match:
        num = int(match.group(1))
        return num
    return None

def extract_main_content(html_content):
    """Extract the main content from the slide"""
    # Try to find content between specific markers
    content_patterns = [
        # Pattern for hero containers
        (r'<div class="hero-container">(.+?)</div>\s*</div>\s*</div>', re.DOTALL),
        # Pattern for main containers
        (r'<div class="(?:problem|movement|main|content)-container">(.+?)</div>\s*</div>\s*</div>', re.DOTALL),
        # Pattern for slide content
        (r'<div class="slide-content[^"]*">(.+?)<!-- Navigation buttons -->', re.DOTALL),
    ]
    
    for pattern, flags in content_patterns:
        match = re.search(pattern, html_content, flags)
        if match:
            return match.group(1).strip()
    
    # Fallback: extract body content
    body_match = re.search(r'<body[^>]*>(.+?)</body>', html_content, re.DOTALL)
    if body_match:
        # Remove navigation and header
        content = body_match.group(1)
        content = re.sub(r'<header[^>]*>.*?</header>', '', content, flags=re.DOTALL)
        content = re.sub(r'<div class="navigation">.*?</div>\s*</div>', '', content, flags=re.DOTALL)
        content = re.sub(r'<script[^>]*>.*?</script>', '', content, flags=re.DOTALL)
        return content.strip()
    
    return ""

def extract_title(html_content):
    """Extract page title"""
    match = re.search(r'<title>MobiCryp - (.+?)</title>', html_content)
    if match:
        return match.group(1)
    return "Slide"

def convert_to_positive_theme(filename, slide_num, total_slides=22):
    """Convert a single HTML file to use the positive theme"""
    
    # Read the original file
    with open(filename, 'r', encoding='utf-8') as f:
        original_content = f.read()
    
    # Extract information
    title = extract_title(original_content)
    main_content = extract_main_content(original_content)
    
    # Determine navigation links
    prev_num = slide_num - 1 if slide_num > 1 else 1
    next_num = slide_num + 1 if slide_num < total_slides else total_slides
    
    prev_file = f"{prev_num:02d}_*.html"
    next_file = f"{next_num:02d}_*.html"
    
    # Find actual filenames
    for f in os.listdir('.'):
        if f.startswith(f"{prev_num:02d}_") and f.endswith('.html') and not f.endswith('_sample.html'):
            prev_file = f
        if f.startswith(f"{next_num:02d}_") and f.endswith('.html') and not f.endswith('_sample.html'):
            next_file = f
    
    # Create the new HTML structure
    new_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MobiCryp - {title}</title>
    <link rel="stylesheet" href="positive-theme.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        /* Slide-specific styles for {title} */
        /* Additional styles will be added based on content type */
    </style>
</head>
<body>
    <!-- Header -->
    <div class="header">
        <div class="slide-counter">Slide {slide_num} of {total_slides}</div>
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

            <!-- Main content -->
            <div class="main-container">
                {main_content}
            </div>
        </div>
    </div>
    
    <!-- Navigation buttons -->
    <div class="navigation">
        <a href="index_enhanced.html" class="nav-button home-button">
            <i class="fas fa-home"></i> All Slides
        </a>
        <div style="display: flex; gap: 10px;">
            <a href="{prev_file}" class="nav-button" id="prev-button">
                <i class="fas fa-arrow-left"></i> Previous
            </a>
            <a href="{next_file}" class="nav-button" id="next-button">
                Next <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    </div>
</body>
</html>"""
    
    # Write the new file
    output_filename = filename.replace('.html', '_positive.html')
    with open(output_filename, 'w', encoding='utf-8') as f:
        f.write(new_html)
    
    print(f"Converted {filename} -> {output_filename}")
    return output_filename

# Main execution
if __name__ == "__main__":
    # Get all numbered HTML files
    html_files = []
    for i in range(3, 23):  # Files 03 to 22
        pattern = f"{i:02d}_*.html"
        for f in os.listdir('.'):
            if f.startswith(f"{i:02d}_") and f.endswith('.html') and not f.endswith('_sample.html') and not f.endswith('_positive.html'):
                html_files.append((f, i))
    
    # Process each file
    for filename, slide_num in html_files:
        try:
            convert_to_positive_theme(filename, slide_num)
        except Exception as e:
            print(f"Error processing {filename}: {e}")