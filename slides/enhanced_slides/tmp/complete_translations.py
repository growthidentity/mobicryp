#!/usr/bin/env python3
import os
import json
import re
import glob
import time

# Directory paths
slides_dir = "/Users/vambolatullus/Desktop/MOBICRYP2.0/github/slides/enhanced_slides_th"
translations_file = "/Users/vambolatullus/Desktop/MOBICRYP2.0/github/slides/enhanced_slides/tmp/complete_translations.json"

# Define Thai translations for all slide titles and descriptions
translations = {
    "02": {
        "title": "ปัญหา",
        "subtitle": "การเงินแบบดั้งเดิมกำลังทิ้งคนนับล้านไว้เบื้องหลัง",
        "content": {
            "The Challenge Today": "ความท้าทายในปัจจุบัน",
            "Banks and traditional institutions aren't serving everyone": "ธนาคารและสถาบันการเงินแบบดั้งเดิมไม่ได้ให้บริการทุกคน",
            "High fees and minimum balances exclude millions": "ค่าธรรมเนียมสูงและยอดเงินขั้นต่ำกีดกันคนนับล้าน",
            "Complex systems favor the wealthy and well-connected": "ระบบที่ซับซ้อนเอื้อประโยชน์ให้กับคนรวยและผู้มีเส้นสายเท่านั้น",
            "The old rules don't work anymore": "กฎเกณฑ์เก่าๆ ใช้งานไม่ได้อีกต่อไป"
        }
    },
    "06": {
        "title": "เศรษฐศาสตร์โทเคน",
        "subtitle": "ออกแบบมาเพื่อความมั่นคงและการเติบโตที่ยั่งยืน",
        "content": {
            "Our Mission": "พันธกิจของเรา",
            "Create a more inclusive financial system": "สร้างระบบการเงินที่ครอบคลุมมากขึ้น",
            "Empower individuals to build wealth on their own terms": "เสริมพลังให้บุคคลสร้างความมั่งคั่งตามเงื่อนไขของตนเอง",
            "Leverage blockchain technology for transparency and trust": "ใช้เทคโนโลยีบล็อกเชนเพื่อความโปร่งใสและความไว้วางใจ",
            "Educate and guide people into the new financial era": "ให้ความรู้และแนะนำผู้คนสู่ยุคการเงินใหม่"
        }
    },
    "12": {
        "title": "แผนการพัฒนา",
        "subtitle": "การเดินทางของเราเพื่อปฏิวัติการเงิน",
        "content": {
            "Self vs Auto Minting": "การขุดด้วยตนเอง vs การขุดอัตโนมัติ",
            "Choose Your Approach": "เลือกวิธีการของคุณ",
            "Self Minting": "การขุดด้วยตนเอง",
            "Total control over minting process": "ควบคุมกระบวนการขุดทั้งหมดด้วยตนเอง",
            "Decide when to mint and how much": "ตัดสินใจเองว่าจะขุดเมื่อไหร่และเท่าไร",
            "Higher potential rewards for active management": "รางวัลที่อาจสูงขึ้นสำหรับการจัดการเชิงรุก",
            "Requires regular attention and decisions": "ต้องการความใส่ใจและการตัดสินใจอย่างสม่ำเสมอ",
            "Auto Minting": "การขุดอัตโนมัติ",
            "Set it and forget it approach": "ตั้งค่าแล้วปล่อยให้ทำงานเอง",
            "Consistent, predictable minting schedule": "กำหนดการขุดที่สม่ำเสมอและคาดการณ์ได้",
            "No need for daily management": "ไม่จำเป็นต้องจัดการรายวัน",
            "Perfect for busy individuals": "เหมาะสำหรับคนที่มีเวลาจำกัด"
        }
    },
    "19": {
        "title": "ทำไมต้องตอนนี้?",
        "subtitle": "พายุแห่งโอกาสที่สมบูรณ์แบบ",
        "content": {
            "Terms & Conditions": "ข้อกำหนดและเงื่อนไข",
            "Important Guidelines": "แนวทางที่สำคัญ",
            "Compliance Requirements": "ข้อกำหนดด้านการปฏิบัติตามกฎระเบียบ",
            "User must be at least 18 years of age": "ผู้ใช้ต้องมีอายุอย่างน้อย 18 ปี",
            "Valid identification will be required for KYC": "ต้องมีเอกสารที่ถูกต้องสำหรับการยืนยันตัวตน",
            "Users are responsible for tax obligations in their jurisdiction": "ผู้ใช้ต้องรับผิดชอบภาระภาษีในเขตอำนาจของตน",
            "Platform Usage": "การใช้งานแพลตฟอร์ม",
            "MobiCryp is a technology platform, not financial advice": "MobiCryp เป็นแพลตฟอร์มเทคโนโลยี ไม่ใช่คำแนะนำทางการเงิน",
            "Users should not invest more than they can afford to lose": "ผู้ใช้ไม่ควรลงทุนมากกว่าที่พวกเขาสามารถสูญเสียได้",
            "Unauthorized use of the platform is prohibited": "ห้ามใช้แพลตฟอร์มโดยไม่ได้รับอนุญาต"
        }
    },
    "30": {
        "title": "ความปลอดภัยเป็นอันดับแรก",
        "subtitle": "การลงทุนของคุณได้รับการปกป้องด้วยมาตรการความปลอดภัยขั้นสูง",
        "content": {
            "Built for Security": "สร้างมาเพื่อความปลอดภัย",
            "Your Investment Protected": "การลงทุนของคุณได้รับการปกป้อง",
            "End-to-End Encryption": "การเข้ารหัสแบบปลายทางถึงปลายทาง",
            "All communications and transactions are fully encrypted": "การสื่อสารและธุรกรรมทั้งหมดได้รับการเข้ารหัสอย่างสมบูรณ์",
            "Regular Security Audits": "การตรวจสอบความปลอดภัยเป็นประจำ",
            "Our systems undergo rigorous testing by third-party experts": "ระบบของเราได้รับการทดสอบอย่างเข้มงวดโดยผู้เชี่ยวชาญจากบุคคลที่สาม",
            "Cold Storage Protection": "การป้องกันด้วยการเก็บแบบ Cold Storage",
            "Assets secured in offline environments": "สินทรัพย์ถูกเก็บไว้ในสภาพแวดล้อมที่ไม่ได้เชื่อมต่ออินเทอร์เน็ต",
            "Multi-Signature Authorization": "การอนุมัติแบบหลายลายเซ็น",
            "Multiple approvals required for critical operations": "จำเป็นต้องมีการอนุมัติหลายครั้งสำหรับการดำเนินการที่สำคัญ"
        }
    }
}

def save_translations():
    """Save the translations to a JSON file"""
    with open(translations_file, 'w', encoding='utf-8') as file:
        json.dump(translations, file, ensure_ascii=False, indent=2)

def apply_translations_to_slide(slide_path, slide_num):
    """Apply additional translations to a slide"""
    if slide_num not in translations:
        print(f"No translations defined for slide {slide_num}, skipping...")
        return
    
    print(f"Applying translations to slide {slide_num}...")
    
    # Read the slide file
    with open(slide_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Apply title translation if exists
    if 'title' in translations[slide_num]:
        title = translations[slide_num]['title']
        # Find and replace the title
        title_patterns = [
            r'<h1[^>]*class="[^"]*slide-title[^"]*"[^>]*>(.*?)</h1>',
            r'<h1[^>]*class="[^"]*section-title[^"]*"[^>]*>(.*?)</h1>',
            r'<h1[^>]*class="[^"]*credentials-title[^"]*"[^>]*>(.*?)</h1>',
            r'<h2[^>]*class="[^"]*slide-title[^"]*"[^>]*>(.*?)</h2>',
            r'<h2[^>]*class="[^"]*section-title[^"]*"[^>]*>(.*?)</h2>',
            r'<h2[^>]*class="[^"]*credentials-title[^"]*"[^>]*>(.*?)</h2>'
        ]
        
        for pattern in title_patterns:
            content = re.sub(pattern, lambda m: m.group(0).replace(m.group(1), title), content)
    
    # Apply subtitle translation if exists
    if 'subtitle' in translations[slide_num]:
        subtitle = translations[slide_num]['subtitle']
        # Find and replace the subtitle
        subtitle_patterns = [
            r'<p[^>]*class="[^"]*section-description[^"]*"[^>]*>(.*?)</p>',
            r'<p[^>]*class="[^"]*tagline[^"]*"[^>]*>(.*?)</p>',
            r'<p[^>]*class="[^"]*credentials-subtitle[^"]*"[^>]*>(.*?)</p>'
        ]
        
        for pattern in subtitle_patterns:
            content = re.sub(pattern, lambda m: m.group(0).replace(m.group(1), subtitle), content)
    
    # Apply content translations if exists
    if 'content' in translations[slide_num]:
        for english, thai in translations[slide_num]['content'].items():
            # Skip very short strings
            if len(english) < 3:
                continue
            
            # Replace text content between tags
            content = content.replace(f">{english}<", f">{thai}<")
            
            # Try to replace within headers, paragraphs, and divs
            patterns = [
                f'(<h[1-6][^>]*>){re.escape(english)}(</h[1-6]>)',
                f'(<p[^>]*>){re.escape(english)}(</p>)',
                f'(<div[^>]*>){re.escape(english)}(</div>)'
            ]
            
            for pattern in patterns:
                content = re.sub(pattern, f'\\1{thai}\\2', content)
    
    # Write the modified content back to the file
    with open(slide_path, 'w', encoding='utf-8') as file:
        file.write(content)
    
    print(f"✅ Applied translations to slide {slide_num}")

def main():
    # Save translations to file
    save_translations()
    
    # Process specific slides that need additional translations
    for slide_num in translations:
        slide_path = os.path.join(slides_dir, f"{slide_num}_enhanced_th.html")
        if os.path.exists(slide_path):
            apply_translations_to_slide(slide_path, slide_num)
            # Add a small delay to avoid file system issues
            time.sleep(0.2)
        else:
            print(f"⚠️ Slide {slide_num} doesn't exist at path: {slide_path}")
    
    print("\n✅ Applied additional translations to specific slides")
    print("\nNext steps:")
    print("1. Review the translated slides for any missing or incorrect translations")
    print("2. Add more translations as needed")
    print("3. Test the slides in a browser to ensure proper display")

if __name__ == "__main__":
    main()