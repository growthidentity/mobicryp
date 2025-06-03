#!/usr/bin/env python3
import re
import os
from bs4 import BeautifulSoup

def update_html_file(filename, slide_num, total_slides=22):
    """Update a single HTML file to use the positive theme"""
    
    print(f"Processing {filename}...")
    
    # Read the original file
    with open(filename, 'r', encoding='utf-8') as f:
        original_html = f.read()
    
    # Parse with BeautifulSoup
    soup = BeautifulSoup(original_html, 'html.parser')
    
    # Extract title
    title_tag = soup.find('title')
    title = title_tag.text.replace('MobiCryp - ', '') if title_tag else 'Slide'
    
    # Extract main content from the slide
    content = ""
    
    # Look for main content containers
    main_containers = [
        soup.find('div', class_='hero-container'),
        soup.find('div', class_='problem-container'),
        soup.find('div', class_='movement-container'),
        soup.find('div', class_='content-container'),
        soup.find('div', class_='main-container'),
        soup.find('div', class_='slide-wrapper'),
        soup.find('div', class_='content-wrapper')
    ]
    
    # Find the first valid container
    for container in main_containers:
        if container:
            # Remove navigation if present within container
            nav = container.find('div', class_='navigation')
            if nav:
                nav.decompose()
            
            # Clean up the content
            content = str(container)
            # Remove dark theme specific classes
            content = re.sub(r'premium-\w+', '', content)
            content = re.sub(r'dark-\w+', '', content)
            content = re.sub(r'style="[^"]*background:\s*rgba\(0[^"]*"', '', content)
            break
    
    # If no specific container found, extract body content
    if not content:
        body = soup.find('body')
        if body:
            # Remove header and navigation
            header = body.find('header')
            if header:
                header.decompose()
            nav = body.find('div', class_='navigation')
            if nav:
                nav.decompose()
            # Remove scripts
            for script in body.find_all('script'):
                script.decompose()
            # Remove circuit backgrounds
            circuit = body.find('div', class_='circuit-background')
            if circuit:
                circuit.decompose()
            
            # Get remaining content
            slide_content = body.find('div', class_='slide-content')
            if slide_content:
                content = slide_content.decode_contents()
    
    # Extract custom styles if any
    custom_styles = ""
    style_tags = soup.find_all('style')
    for style in style_tags:
        style_text = style.text
        # Filter out dark theme specific styles
        style_text = re.sub(r'/\*.*?\*/', '', style_text, flags=re.DOTALL)  # Remove comments
        style_text = re.sub(r'html,\s*body\s*{[^}]+}', '', style_text)  # Remove html,body reset
        style_text = re.sub(r'\.slide-container\s*{[^}]+}', '', style_text)  # Remove slide-container
        style_text = re.sub(r'\.slide-content\s*{[^}]+}', '', style_text)  # Remove slide-content
        style_text = re.sub(r'\.navigation\s*{[^}]+}', '', style_text)  # Remove navigation styles
        style_text = re.sub(r'\.nav-button[^{]*{[^}]+}', '', style_text)  # Remove nav-button styles
        
        # Keep only meaningful styles
        if style_text.strip():
            custom_styles += style_text
    
    # Determine navigation
    prev_file = f"{(slide_num-1):02d}_*.html" if slide_num > 1 else "01_the_world_has_changed.html"
    next_file = f"{(slide_num+1):02d}_*.html" if slide_num < total_slides else "22_start_your_journey_today.html"
    
    # Find actual filenames
    for f in sorted(os.listdir('.')):
        if slide_num > 1 and f.startswith(f"{(slide_num-1):02d}_") and f.endswith('.html') and not f.endswith('_sample.html'):
            prev_file = f
        if slide_num < total_slides and f.startswith(f"{(slide_num+1):02d}_") and f.endswith('.html') and not f.endswith('_sample.html'):
            next_file = f
    
    # Build the new HTML
    new_html = f'''<!DOCTYPE html>
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
        {custom_styles}
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

            <div class="main-container">
                {content}
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
</html>'''
    
    # Write to a new file first
    output_file = filename.replace('.html', '_updated.html')
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(new_html)
    
    print(f"Created {output_file}")
    return output_file

# Main execution
if __name__ == "__main__":
    # Files to update (04-22, skipping 01-03 which are already done)
    files_to_update = []
    
    for i in range(4, 23):
        pattern = f"{i:02d}_"
        for filename in sorted(os.listdir('.')):
            if filename.startswith(pattern) and filename.endswith('.html') and not filename.endswith('_sample.html') and not filename.endswith('_updated.html'):
                files_to_update.append((filename, i))
    
    print(f"Found {len(files_to_update)} files to update")
    
    # Process each file
    for filename, slide_num in files_to_update:
        try:
            update_html_file(filename, slide_num)
        except Exception as e:
            print(f"Error processing {filename}: {e}")