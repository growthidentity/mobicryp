#!/usr/bin/env python3
import os
import re
import shutil
import glob

# Directory paths
source_dir = "/Users/vambolatullus/Desktop/MOBICRYP2.0/github/slides/enhanced_slides"
target_dir = "/Users/vambolatullus/Desktop/MOBICRYP2.0/github/slides/enhanced_slides_th"

# Common translations for navigation
translations = {
    'Previous': 'ก่อนหน้า',
    'Next': 'ถัดไป',
    'All Slides': 'สไลด์ทั้งหมด',
    'Home': 'หน้าหลัก',
    'of': 'จาก',
    'Slide': 'สไลด์'
}

# Create target directory if it doesn't exist
os.makedirs(target_dir, exist_ok=True)

def convert_slide_to_thai(source_file, target_file):
    """Convert an English slide to a Thai slide template"""
    print(f"Processing {source_file} -> {target_file}")
    
    # Read the source file
    with open(source_file, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Get the slide number
    slide_num = os.path.basename(source_file).split('_')[0]
    
    # Modify the content
    
    # 1. Change language attribute
    content = content.replace('<html lang="en">', '<html lang="th">')
    
    # 2. Add Thai font support
    font_link = '<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;500;600;700&display=swap" rel="stylesheet">'
    if '<link href="https://fonts.googleapis.com/css2?family=' in content:
        content = content.replace('<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">',
                               '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">\n    ' + font_link)
    else:
        # Insert before the first <style> tag
        content = content.replace('<style>', font_link + '\n    <style>')
    
    # 3. Add Thai font family to CSS
    body_font_css = '''
        /* Thai font support */
        body, button, input, select, textarea {
            font-family: 'Inter', 'Noto Sans Thai', sans-serif;
        }
    '''
    content = content.replace('</style>', body_font_css + '\n    </style>')
    
    # 4. Update slide counter
    content = re.sub(r'Slide (\d+) of (\d+)',
                    f'{translations["Slide"]} \\1 {translations["of"]} \\2',
                    content)
    
    # 5. Update navigation links to point to Thai slides
    content = content.replace('_enhanced.html', '_enhanced_th.html')
    
    # 6. Add language switcher in header
    lang_switcher = f'''
        <div class="language-switcher" style="position: absolute; right: 100px; top: 50%; transform: translateY(-50%); display: flex; gap: 5px;">
            <a href="../enhanced_slides/{slide_num}_enhanced.html" style="padding: 4px 8px; font-size: 12px; text-decoration: none; color: rgba(255,255,255,0.7); border: 1px solid rgba(255,255,255,0.3); border-radius: 4px;">EN</a>
            <a href="../enhanced_slides_th/{slide_num}_enhanced_th.html" style="padding: 4px 8px; font-size: 12px; text-decoration: none; color: white; border: 1px solid rgba(255,255,255,0.7); border-radius: 4px; background: rgba(255,255,255,0.1);">TH</a>
        </div>
    '''
    content = content.replace('<div class="slide-counter">', '<div class="slide-counter">' + lang_switcher)
    
    # 7. Translate navigation button text
    content = content.replace('<i class="fas fa-arrow-left"></i> Previous',
                              f'<i class="fas fa-arrow-left"></i> {translations["Previous"]}')
    content = content.replace('Next <i class="fas fa-arrow-right"></i>',
                              f'{translations["Next"]} <i class="fas fa-arrow-right"></i>')
    content = content.replace('<i class="fas fa-home"></i> All Slides',
                              f'<i class="fas fa-home"></i> {translations["All Slides"]}')
    content = content.replace('Home <i class="fas fa-home"></i>',
                              f'{translations["Home"]} <i class="fas fa-home"></i>')
    
    # 8. Update index link to point to Thai index page
    content = content.replace('href="../index.html"', 'href="../index_th.html"')
    
    # Write the modified content to the target file
    with open(target_file, 'w', encoding='utf-8') as file:
        file.write(content)

def main():
    # Get all slide HTML files
    slides = glob.glob(os.path.join(source_dir, "[0-9][0-9]_enhanced.html"))
    slides.sort()
    
    # Process each slide
    for slide in slides:
        slide_name = os.path.basename(slide)
        thai_slide_name = slide_name.replace('_enhanced.html', '_enhanced_th.html')
        target_file = os.path.join(target_dir, thai_slide_name)
        
        try:
            convert_slide_to_thai(slide, target_file)
            print(f"✅ Created Thai template for {slide_name}")
        except Exception as e:
            print(f"❌ Error creating Thai template for {slide_name}: {e}")
    
    print("\nCreating Thai index page template...")
    
    # Create Thai index page template
    source_index = "/Users/vambolatullus/Desktop/MOBICRYP2.0/github/slides/index.html"
    target_index = "/Users/vambolatullus/Desktop/MOBICRYP2.0/github/slides/index_th.html"
    
    try:
        # Read the source index
        with open(source_index, 'r', encoding='utf-8') as file:
            index_content = file.read()
        
        # Modify the content
        index_content = index_content.replace('<html lang="en">', '<html lang="th">')
        
        # Add Thai font support
        if '<link href="https://fonts.googleapis.com/css2?family=' in index_content:
            index_content = index_content.replace('<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">',
                                            '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">\n    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;500;600;700&display=swap" rel="stylesheet">')
        
        # Add Thai font family to CSS
        body_font_css = '''
            /* Thai font support */
            body, button, input, select, textarea {
                font-family: 'Inter', 'Noto Sans Thai', sans-serif;
            }
        '''
        index_content = index_content.replace('</style>', body_font_css + '\n    </style>')
        
        # Update links to point to Thai slides
        index_content = index_content.replace('href="enhanced_slides/', 'href="enhanced_slides_th/')
        index_content = index_content.replace('_enhanced.html', '_enhanced_th.html')
        
        # Add language switcher
        lang_switcher = '''
            <div class="language-switcher" style="position: absolute; right: 20px; top: 20px; display: flex; gap: 5px;">
                <a href="index.html" style="padding: 6px 12px; font-size: 14px; text-decoration: none; color: rgba(255,255,255,0.7); border: 1px solid rgba(255,255,255,0.3); border-radius: 4px;">EN</a>
                <a href="index_th.html" style="padding: 6px 12px; font-size: 14px; text-decoration: none; color: white; border: 1px solid rgba(255,255,255,0.7); border-radius: 4px; background: rgba(255,255,255,0.1);">TH</a>
            </div>
        '''
        
        # Insert language switcher before the first <main> tag
        index_content = index_content.replace('<main>', lang_switcher + '\n    <main>')
        
        # Write the modified content to the target file
        with open(target_index, 'w', encoding='utf-8') as file:
            file.write(index_content)
        
        print(f"✅ Created Thai index page template")
    except Exception as e:
        print(f"❌ Error creating Thai index page template: {e}")
    
    print(f"\n✅ Created templates for {len(slides)} slides and index page")
    print(f"\nNext steps:")
    print(f"1. Translate the slide titles, descriptions, and content")
    print(f"2. Replace the placeholders in the Thai slide files")

if __name__ == "__main__":
    main()