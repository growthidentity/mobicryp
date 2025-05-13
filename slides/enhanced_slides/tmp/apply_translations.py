#!/usr/bin/env python3
import os
import json
import re
import glob

# Directory paths
template_dir = "/Users/vambolatullus/Desktop/MOBICRYP2.0/github/slides/enhanced_slides_th"
translations_file = "/Users/vambolatullus/Desktop/MOBICRYP2.0/github/slides/enhanced_slides/tmp/translations.json"

def load_translations():
    """Load translations from JSON file"""
    with open(translations_file, 'r', encoding='utf-8') as file:
        return json.load(file)

def apply_translations_to_slide(slide_path, translations):
    """Apply translations to a slide file"""
    slide_num = os.path.basename(slide_path).split('_')[0]
    print(f"Applying translations to slide {slide_num}...")
    
    # Read the slide file
    with open(slide_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Apply common translations
    for english, thai in translations["common"].items():
        content = content.replace(f">{english}<", f">{thai}<")
        
        # Handle more contexts for navigation texts
        if english in ["Previous", "Next", "All Slides", "Home"]:
            content = content.replace(f">{english} <", f">{thai} <")
            content = content.replace(f">{english}</", f">{thai}</")
            content = content.replace(f" {english}<", f" {thai}<")
    
    # Apply slide-specific translations if available
    if slide_num in translations["slides"]:
        slide_translations = translations["slides"][slide_num]
        for english, thai in slide_translations.items():
            # Skip very short strings to avoid over-replacing
            if len(english) < 3:
                continue
                
            # Replace exact matches within tags
            content = content.replace(f">{english}<", f">{thai}<")
            
            # Try to replace within attributes (title, alt, etc.)
            content = content.replace(f'title="{english}"', f'title="{thai}"')
            content = content.replace(f'alt="{english}"', f'alt="{thai}"')
            
            # For main slide titles (typically in h1, h2 tags)
            if len(english) > 10 or english.isupper():
                pattern = re.compile(f'(<h[1-6][^>]*>){re.escape(english)}(</h[1-6]>)')
                content = pattern.sub(f'\\1{thai}\\2', content)
                
                # Look for the text inside any tag
                pattern = re.compile(f'(<[a-z][^>]*>){re.escape(english)}(</[a-z]>)')
                content = pattern.sub(f'\\1{thai}\\2', content)
    
    # Write the modified content back to the file
    with open(slide_path, 'w', encoding='utf-8') as file:
        file.write(content)
    
    print(f"✅ Applied translations to slide {slide_num}")

def apply_translations_to_index(index_path, translations):
    """Apply translations to the index file"""
    print("Applying translations to index page...")
    
    # Read the index file
    with open(index_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Apply common translations
    for english, thai in translations["common"].items():
        content = content.replace(f">{english}<", f">{thai}<")
        
        # Handle more contexts
        if english in ["All Slides"]:
            content = content.replace(f">{english}</", f">{thai}</")
    
    # Apply index-specific translations
    for english, thai in translations["index"].items():
        # Skip very short strings to avoid over-replacing
        if len(english) < 3:
            continue
            
        # Replace exact matches (with surrounding tags)
        content = content.replace(f">{english}<", f">{thai}<")
        
        # Try to replace within attributes (title, alt, etc.)
        content = content.replace(f'title="{english}"', f'title="{thai}"')
        content = content.replace(f'alt="{english}"', f'alt="{thai}"')
        
        # Title tag
        if english == "MobiCryp Presentation":
            content = content.replace(f'<title>{english}</title>', f'<title>{thai}</title>')
        
        # For category buttons
        if english in ["All", "Introduction & Overview", "Platform & Features", "Technology & Security", "Market & Economics", "Community & Roadmap"]:
            pattern = re.compile(f'class="category-btn.*?>{english}</button>')
            content = re.sub(pattern, lambda m: m.group(0).replace(english, thai), content)
        
        # For footer text
        if "All rights reserved" in english:
            pattern = re.compile(f'<footer.*?>{english}</footer>')
            content = re.sub(pattern, lambda m: m.group(0).replace(english, thai), content)
    
    # Apply slide title translations to the index cards
    for slide_num, slide_translations in translations["slides"].items():
        for english, thai in slide_translations.items():
            # Look for slide titles in card headings (typically the first key in each slide's translations)
            if english == list(slide_translations.keys())[0]:
                # Pattern for the card title within index page
                pattern = re.compile(f'<h3 class="card-title">{re.escape(english)}</h3>')
                content = pattern.sub(f'<h3 class="card-title">{thai}</h3>', content)
                
                # Also check for plain text occurrences with exact surrounding tags
                content = content.replace(f">{english}<", f">{thai}<")
    
    # Write the modified content back to the file
    with open(index_path, 'w', encoding='utf-8') as file:
        file.write(content)
    
    print(f"✅ Applied translations to index page")

def main():
    # Check if the template directory exists
    if not os.path.exists(template_dir):
        print(f"Error: Template directory {template_dir} does not exist.")
        print("Please run generate_thai_templates.py first.")
        return
    
    # Load translations
    translations = load_translations()
    
    # Apply translations to index first
    index_path = "/Users/vambolatullus/Desktop/MOBICRYP2.0/github/slides/index_th.html"
    if os.path.exists(index_path):
        try:
            apply_translations_to_index(index_path, translations)
        except Exception as e:
            print(f"❌ Error applying translations to index page: {e}")
    else:
        print(f"Warning: Index page {index_path} does not exist.")
    
    # Apply translations to slides
    slides = glob.glob(os.path.join(template_dir, "[0-9][0-9]_enhanced_th.html"))
    slides.sort()
    
    for slide in slides:
        try:
            apply_translations_to_slide(slide, translations)
        except Exception as e:
            print(f"❌ Error applying translations to {os.path.basename(slide)}: {e}")
    
    print(f"\n✅ Applied translations to {len(slides)} slides and index page")
    print(f"\nNext steps:")
    print(f"1. Review the translated slides for any missing or incorrect translations")
    print(f"2. Test all slides in a browser to ensure proper display and navigation")

if __name__ == "__main__":
    main()