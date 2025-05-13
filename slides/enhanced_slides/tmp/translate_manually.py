#!/usr/bin/env python3
import json
import os
import re

# File paths
texts_file = "/Users/vambolatullus/Desktop/MOBICRYP2.0/github/slides/enhanced_slides/tmp/texts_to_translate.json"
thai_dir = "/Users/vambolatullus/Desktop/MOBICRYP2.0/github/slides/enhanced_slides_th"
output_dir = "/Users/vambolatullus/Desktop/MOBICRYP2.0/github/slides/enhanced_slides/tmp"

# Thai translations - manually add these after getting translations
thai_translations = {
    "01": {
        "The rules of wealth have changed — the question is, have you?": "กฎแห่งความมั่งคั่งได้เปลี่ยนไปแล้ว — คำถามคือ คุณได้เปลี่ยนตามหรือยัง?"
    },
    "02": {
        "BANKS & SAVINGS": "ธนาคารและการออม",
        "Historically low interest rates on savings": "อัตราดอกเบี้ยเงินฝากต่ำเป็นประวัติการณ์",
        "Hidden fees eroding your wealth": "ค่าธรรมเนียมแอบแฝงที่กัดกร่อนความมั่งคั่งของคุณ",
        "Capital restricted by outdated policies": "เงินทุนถูกจำกัดด้วยนโยบายที่ล้าสมัย",
        "Average interest rate while inflation exceeds 4%": "อัตราดอกเบี้ยเฉลี่ยในขณะที่เงินเฟ้อสูงกว่า 4%",
        "TRADITIONAL JOBS": "งานแบบดั้งเดิม",
        "Limited by time-for-money constraints": "ถูกจำกัดด้วยข้อจำกัดเวลาแลกเงิน",
        "Salaries failing to keep pace with inflation": "เงินเดือนตามไม่ทันอัตราเงินเฟ้อ",
        "Job security increasingly uncertain": "ความมั่นคงในการทำงานไม่แน่นอนมากขึ้น",
        "Of workers feel underpaid in their current role": "ของคนทำงานรู้สึกว่าได้รับค่าตอบแทนน้อยเกินไปในตำแหน่งปัจจุบัน",
        "TRADITIONAL INVESTING": "การลงทุนแบบดั้งเดิม",
        "Unpredictable market volatility": "ความผันผวนของตลาดที่คาดเดาไม่ได้",
        "High barriers to entry for average people": "อุปสรรคสูงสำหรับคนทั่วไปในการเริ่มต้น",
        "Complicated tax and regulatory issues": "ปัญหาด้านภาษีและข้อบังคับที่ซับซ้อน",
        "Of adults find traditional investing too complex": "ของผู้ใหญ่คิดว่าการลงทุนแบบดั้งเดิมซับซ้อนเกินไป"
    },
    "03": {
        "THE NEW WEALTH MOVEMENT HAS BEGUN": "การเคลื่อนไหวของความมั่งคั่งรูปแบบใหม่ได้เริ่มต้นแล้ว",
        "A transformative financial revolution that's reshaping how people build and grow wealth in the digital age": "การปฏิวัติทางการเงินที่กำลังเปลี่ยนแปลงวิธีการที่ผู้คนสร้างและเพิ่มความมั่งคั่งในยุคดิจิทัล",
        "CRYPTO": "คริปโต",
        "PASSIVE": "เงินได้",
        "INCOME": "แบบพาสซีฟ",
        "People earning daily passive income": "คนที่ได้รับรายได้แบบพาสซีฟรายวัน",
        "Daily trading volume": "ปริมาณการซื้อขายรายวัน",
        "Countries with active minters": "ประเทศที่มีนักขุดที่ใช้งานอยู่",
        "The world of finance is evolving, and a select few are positioned to capitalize on the extraordinary opportunity before us. MobiCryp offers a proven system for the new wealth movement.": "โลกของการเงินกำลังเปลี่ยนแปลง และมีเพียงไม่กี่คนที่อยู่ในตำแหน่งที่จะได้ประโยชน์จากโอกาสพิเศษนี้ MobiCryp นำเสนอระบบที่พิสูจน์แล้วสำหรับการเคลื่อนไหวของความมั่งคั่งรูปแบบใหม่",
        "Join The Movement": "เข้าร่วมการเคลื่อนไหว"
    },
    "04": {
        "Our company ethos: Transparency. Reliability. Compliance.": "จริยธรรมของบริษัทเรา: ความโปร่งใส ความน่าเชื่อถือ การปฏิบัติตามกฎระเบียบ"
    },
    "05": {
        "TIMELINE OF TRUST": "ไทม์ไลน์แห่งความไว้วางใจ",
        "Our journey from concept to global force in digital finance": "การเดินทางของเราจากแนวคิดสู่พลังระดับโลกในการเงินดิจิทัล",
        "Idea Formation": "การก่อตัวของแนวคิด",
        "Platform Launch": "การเปิดตัวแพลตฟอร์ม",
        "Global Expansion": "การขยายตัวระดับโลก",
        "Explosive Growth": "การเติบโตแบบก้าวกระโดด",
        "Initial concept developed": "พัฒนาแนวคิดเริ่มต้น",
        "Core team assembled": "รวบรวมทีมหลัก",
        "Whitepaper creation": "จัดทำไวท์เปเปอร์",
        "Seed funding secured": "ได้รับเงินทุนเริ่มต้น",
        "Alpha platform released": "เปิดตัวแพลตฟอร์มเวอร์ชัน Alpha",
        "First 1,000 minters": "นักขุดคนแรก 1,000 คน",
        "Key partnerships formed": "สร้างพันธมิตรที่สำคัญ",
        "Expansion to 10+ countries": "ขยายไปยังกว่า 10 ประเทศ",
        "ISO certification": "ได้รับการรับรอง ISO",
        "Global team of 50+": "ทีมงานระดับโลกกว่า 50 คน",
        "Present in 50+ countries": "มีอยู่ในกว่า 50 ประเทศ",
        "Active community of 10K+": "ชุมชนที่แอคทีฟกว่า 10,000 คน"
    },
    "06": {
        "The Mission Is Clear": "พันธกิจของเราชัดเจน",
        "To help everyday people build a passive income stream with crypto — without needing to be tech experts, traders, or influencers.": "เพื่อช่วยให้คนทั่วไปสร้างรายได้แบบพาสซีฟด้วยคริปโต — โดยไม่จำเป็นต้องเป็นผู้เชี่ยวชาญด้านเทคโนโลยี นักเทรด หรืออินฟลูเอนเซอร์",
        "Passive Income": "รายได้แบบพาสซีฟ",
        "Real earnings while you sleep": "รายได้จริงในขณะที่คุณนอนหลับ",
        "User Friendly": "ใช้งานง่าย",
        "No technical knowledge needed": "ไม่จำเป็นต้องมีความรู้ทางเทคนิค",
        "Global Access": "การเข้าถึงระดับโลก",
        "Available in 50+ countries": "พร้อมใช้งานในกว่า 50 ประเทศ",
        "Financial Freedom": "อิสรภาพทางการเงิน",
        "Control your financial future": "ควบคุมอนาคตทางการเงินของคุณ",
        "A vision of financial freedom for all": "วิสัยทัศน์เพื่ออิสรภาพทางการเงินสำหรับทุกคน"
    }
}

def apply_translations(slide_num, slide_path):
    """Apply translations to a specific slide"""
    if slide_num not in thai_translations:
        print(f"No translations available for slide {slide_num}")
        return
    
    print(f"Applying translations to slide {slide_num}...")
    
    # Read the slide file
    with open(slide_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Apply translations
    for english, thai in thai_translations[slide_num].items():
        if not thai:  # Skip empty translations
            continue
            
        # Escape special characters for regex
        english_escaped = re.escape(english)
        
        # Try different patterns for replacing the text
        patterns = [
            # Exact text between tags
            f'(>)\\s*{english_escaped}\\s*(<)',
            # Text inside attributes
            f'(title=")[^"]*{english_escaped}[^"]*(")',
            f'(alt=")[^"]*{english_escaped}[^"]*(")',
            # Headers and paragraphs specific content
            f'(<h[1-6][^>]*>){english_escaped}(</h[1-6]>)',
            f'(<p[^>]*>){english_escaped}(</p>)'
        ]
        
        for pattern in patterns:
            content = re.sub(pattern, f'\\1{thai}\\2', content)
        
        # Direct replacement for very specific matches
        if len(english) > 15:  # Only for longer strings to avoid false positives
            content = content.replace(english, thai)
    
    # Write the modified content back to the file
    with open(slide_path, 'w', encoding='utf-8') as file:
        file.write(content)
    
    print(f"✅ Applied translations to slide {slide_num}")

def main():
    # Make sure the output directory exists
    os.makedirs(output_dir, exist_ok=True)
    
    # Apply translations to slides
    for slide_num in thai_translations:
        slide_path = f"{thai_dir}/{slide_num}_enhanced_th.html"
        if os.path.exists(slide_path):
            apply_translations(slide_num, slide_path)
        else:
            print(f"⚠️ Slide {slide_num} not found at {slide_path}")
    
    print("\n✅ Applied available translations")

if __name__ == "__main__":
    main()