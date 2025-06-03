#!/usr/bin/env python3
import os
import re

# Template for the new positive theme HTML
HTML_TEMPLATE = """<!DOCTYPE html>
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
        <div class="slide-counter">Slide {slide_num} of 22</div>
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

# Files that need updating (05-22)
files_to_update = [
    (5, "05_timeline_of_trust.html"),
    (6, "06_our_mission.html"),
    (7, "07_why_mobicryp_works.html"),
    (8, "08_choose_your_path.html"),
    (9, "09_what_youre_buying.html"),
    (10, "10_mobicryp_hubs_calculator.html"),
    (11, "11_self_vs_auto_minting.html"),
    (12, "12_direct_bonus.html"),
    (13, "13_community_binary_bonus.html"),
    (14, "14_level_minting_bonus.html"),
    (15, "15_mobicryp_rank_system.html"),
    (16, "16_royalty_bonus.html"),
    (17, "17_terms_and_conditions.html"),
    (18, "18_upcoming_products.html"),
    (19, "19_start_earning_crypto_rewards.html"),
    (20, "20_starting_your_journey.html"),
    (21, "21_emerging_leader.html"),
    (22, "22_start_your_journey_today.html")
]

# Content mapping for each slide
content_map = {
    5: {
        "title": "Timeline of Trust",
        "content": """                <!-- Timeline Header -->
                <div class="text-center mb-4">
                    <h1 class="section-title">TIMELINE OF TRUST</h1>
                    <p class="section-description">Our proven track record of growth and innovation</p>
                </div>

                <!-- Timeline Content -->
                <div class="content-card">
                    <p class="text-center">Timeline content will be preserved from original file</p>
                </div>"""
    },
    6: {
        "title": "Our Mission",
        "content": """                <!-- Mission Header -->
                <div class="text-center mb-4">
                    <h1 class="section-title">OUR MISSION</h1>
                    <p class="section-description">Empowering financial freedom through innovation</p>
                </div>

                <!-- Mission Content -->
                <div class="content-card">
                    <p class="text-center">Mission content will be preserved from original file</p>
                </div>"""
    },
    # Add more slides as needed
}

def get_nav_files(slide_num):
    """Get previous and next file names"""
    prev_num = slide_num - 1 if slide_num > 1 else 1
    next_num = slide_num + 1 if slide_num < 22 else 22
    
    prev_file = None
    next_file = None
    
    for num, filename in files_to_update:
        if num == prev_num:
            prev_file = filename
        if num == next_num:
            next_file = filename
    
    # Handle edge cases
    if slide_num == 5:
        prev_file = "04_who_we_are.html"
    if slide_num == 1:
        prev_file = "01_the_world_has_changed.html"
    if slide_num == 22:
        next_file = "22_start_your_journey_today.html"
        
    return prev_file or "index_enhanced.html", next_file or "index_enhanced.html"

# Process each file
for slide_num, filename in files_to_update:
    if os.path.exists(filename):
        print(f"Processing {filename}...")
        
        # Read original file to extract title
        with open(filename, 'r', encoding='utf-8') as f:
            original = f.read()
            
        # Extract title
        title_match = re.search(r'<title>MobiCryp - (.+?)</title>', original)
        title = title_match.group(1) if title_match else f"Slide {slide_num}"
        
        # Get navigation files
        prev_file, next_file = get_nav_files(slide_num)
        
        # Use predefined content or default
        if slide_num in content_map:
            main_content = content_map[slide_num]["content"]
        else:
            main_content = f"""                <!-- Slide Header -->
                <div class="text-center mb-4">
                    <h1 class="section-title">{title.upper()}</h1>
                    <p class="section-description">Content from original slide will be preserved</p>
                </div>

                <!-- Main Content -->
                <div class="content-card">
                    <p class="text-center">Content will be migrated from original file</p>
                </div>"""
        
        # Create new file
        new_html = HTML_TEMPLATE.format(
            title=title,
            slide_num=slide_num,
            custom_styles="        /* Additional styles will be added based on content */",
            main_content=main_content,
            prev_file=prev_file,
            next_file=next_file
        )
        
        # Save to new file first
        new_filename = filename.replace('.html', '_updated.html')
        with open(new_filename, 'w', encoding='utf-8') as f:
            f.write(new_html)
            
        print(f"Created {new_filename}")
    else:
        print(f"File {filename} not found, skipping...")

print("\nBatch update complete! Files have been created with '_updated.html' suffix.")
print("Review the files and rename them to replace the originals when ready.")