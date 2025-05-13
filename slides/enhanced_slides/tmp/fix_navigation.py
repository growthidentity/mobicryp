#!/usr/bin/env python3
import os
import re
import glob

# Directory containing the slides
slides_dir = "/Users/vambolatullus/Desktop/MOBICRYP2.0/github/slides/enhanced_slides"

# Standardized navigation CSS
nav_css = '''
        /* Navigation buttons */
        .navigation {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0,0,0,0.3);
            backdrop-filter: blur(10px);
            border-top: 1px solid rgba(255,255,255,0.1);
            padding: 0.8rem 1.5rem;
            margin: 0 !important;
            z-index: 10;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .nav-button {
            padding: 8px 15px !important;
            font-size: 0.85rem !important;
            background: rgba(0, 0, 0, 0.3);
            color: white;
            text-decoration: none;
            border-radius: 50px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 500;
        }

        .nav-button:hover {
            transform: translateY(-2px);
            background: rgba(0, 209, 255, 0.1);
            border-color: var(--accent-color);
        }

        .nav-button.premium-button {
            background: linear-gradient(145deg, rgba(0, 209, 255, 0.15) 0%, rgba(30, 84, 229, 0.1) 100%) !important;
            border: 1px solid rgba(0, 209, 255, 0.3) !important;
            color: white !important;
            font-weight: 500 !important;
            transition: all 0.3s ease !important;
        }

        .nav-button.premium-button:hover {
            transform: translateY(-2px) !important;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3) !important;
            background: linear-gradient(145deg, rgba(0, 209, 255, 0.2) 0%, rgba(30, 84, 229, 0.15) 100%) !important;
        }

        .nav-button.premium-cta {
            background: linear-gradient(145deg, rgba(0, 209, 255, 0.2) 0%, rgba(30, 84, 229, 0.15) 100%) !important;
            box-shadow: 0 0 15px rgba(0, 209, 255, 0.2) !important;
        }'''

def generate_navigation_html(slide_num):
    """Generate the standardized navigation HTML for a specific slide number."""
    slide_num = int(slide_num)
    prev_slide = f"{slide_num-1:02d}" if slide_num > 1 else "01"
    next_slide = f"{slide_num+1:02d}" if slide_num < 32 else "32"
    
    # Special case for the last slide - link next to home
    next_link = f"{next_slide}_enhanced.html"
    next_text = "Next <i class=\"fas fa-arrow-right\"></i>"
    
    if slide_num == 32:  # Last slide
        next_link = "../index.html"
        next_text = "Home <i class=\"fas fa-home\"></i>"
    
    nav_html = f'''
    <!-- Navigation buttons -->
    <div class="navigation">
        <a href="../index.html" class="nav-button premium-button home-button">
            <i class="fas fa-home"></i> All Slides
        </a>
        <div style="display: flex; gap: 10px;">
            <a href="{prev_slide}_enhanced.html" class="nav-button premium-button" id="prev-button">
                <i class="fas fa-arrow-left"></i> Previous
            </a>
            <a href="{next_link}" class="nav-button premium-button premium-cta" id="next-button">
                {next_text}
            </a>
        </div>
    </div>
    '''
    return nav_html

def fix_slide(slide_path):
    """Fix a single slide's navigation and counter."""
    print(f"Processing {slide_path}...")
    
    # Get the slide number from filename
    slide_num = os.path.basename(slide_path).split('_')[0]
    
    with open(slide_path, 'r') as file:
        content = file.read()
    
    # Fix slide counter
    content = re.sub(r'Slide \d+ of \d+', f'Slide {slide_num} of 32', content)
    
    # Replace navigation CSS
    old_nav_css_pattern = r'\/\* Navigation buttons \*\/.*?\.nav-button.*?}'
    if re.search(old_nav_css_pattern, content, re.DOTALL):
        content = re.sub(old_nav_css_pattern, nav_css, content, flags=re.DOTALL)
    else:
        # If no navigation CSS is found, add it before </style>
        content = content.replace('</style>', f'{nav_css}\n    </style>')
    
    # Replace navigation HTML
    nav_pattern = r'<!-- Navigation buttons -->.*?<div class="navigation">.*?</div>\s*</div>'
    new_nav = generate_navigation_html(slide_num)
    
    # Check if navigation is within slide-content
    if '</div>\s*</div>\s*<script' in content:
        # Navigation at the correct position
        content = re.sub(r'</div>\s*</div>\s*<script', f'</div>\n    </div>\n    {new_nav}\n    <script', content)
    else:
        # Navigation within slide-content
        nav_match = re.search(nav_pattern, content, re.DOTALL)
        if nav_match:
            content = content.replace(nav_match.group(0), '')
            # Add navigation before the script tag
            content = re.sub(r'</div>\s*</div>\s*(<script|<footer)', f'</div>\n    </div>\n    {new_nav}\n    \\1', content)
        else:
            # If no navigation found, add it before the script tag
            content = re.sub(r'</div>\s*</div>\s*(<script|<footer)', f'</div>\n    </div>\n    {new_nav}\n    \\1', content)
    
    with open(slide_path, 'w') as file:
        file.write(content)
    
    print(f"✅ Fixed {slide_path}")

def main():
    # Get all slide HTML files
    slides = glob.glob(os.path.join(slides_dir, "[0-9][0-9]_enhanced.html"))
    slides.sort()
    
    fixed_count = 0
    for slide in slides:
        try:
            fix_slide(slide)
            fixed_count += 1
        except Exception as e:
            print(f"❌ Error fixing {slide}: {e}")
    
    print(f"\n✅ Fixed {fixed_count} slides!")

if __name__ == "__main__":
    main()