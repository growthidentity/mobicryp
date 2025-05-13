# MobiCryp Thai Translation Plan

## Approach

We'll create Thai versions of all slides with the following approach:

1. **File Structure:**
   - Create a new directory: `/enhanced_slides_th/` 
   - Naming convention: `XX_enhanced_th.html` (e.g., `01_enhanced_th.html`)

2. **Content Translation:**
   - All visible text content will be translated to Thai
   - Technical terms, company names, and product names remain in English
   - Navigation buttons will be translated

3. **Font Support:**
   - Add Thai-compatible fonts (Noto Sans Thai or Sarabun) for proper rendering

4. **Language Attribute:**
   - Update HTML lang attribute to "th" for proper language specification

5. **Navigation Adjustments:**
   - Update all navigation links to point to Thai versions of slides
   - Add language toggle button to switch between English and Thai

## Implementation Steps

1. **Create Directory Structure:**
   ```
   mkdir -p /Users/vambolatullus/Desktop/MOBICRYP2.0/github/slides/enhanced_slides_th/
   ```

2. **Add Thai Font Support:**
   - Add to HTML head:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;500;600;700&display=swap" rel="stylesheet">
   ```
   - Update CSS:
   ```css
   body {
     font-family: 'Inter', 'Noto Sans Thai', sans-serif;
   }
   ```

3. **Create Language Switcher:**
   - Add toggle button to all slides:
   ```html
   <div class="language-toggle">
     <a href="../enhanced_slides/XX_enhanced.html" class="lang-button">EN</a>
     <a href="../enhanced_slides_th/XX_enhanced_th.html" class="lang-button active">TH</a>
   </div>
   ```

4. **Create Script to Generate Thai Slide Templates:**
   - Create a Python script that:
     - Copies all English slides to Thai directory
     - Updates lang attribute to "th"
     - Updates navigation links to point to Thai slides
     - Adds language toggle
     - Adds Thai font support

5. **Translate Content:**
   - Use a translation service to translate all content
   - Manually review and adjust translations
   - Insert translated content into Thai slide templates

6. **Update Thai Index Page:**
   - Create a Thai version of index.html
   - Point all links to Thai slides

7. **Testing:**
   - Test all Thai slides for proper rendering
   - Verify navigation between slides
   - Test language switching

## Translation Table Format

For each slide, we'll create a translation table in this format:

| English Original | Thai Translation |
|------------------|------------------|
| "THE WORLD HAS CHANGED" | "โลกได้เปลี่ยนแปลงไปแล้ว" |
| "Previous" | "ก่อนหน้า" |
| "Next" | "ถัดไป" |
| "All Slides" | "สไลด์ทั้งหมด" |

## Common Navigation Translations

| English | Thai |
|---------|------|
| "Previous" | "ก่อนหน้า" |
| "Next" | "ถัดไป" |
| "All Slides" | "สไลด์ทั้งหมด" |
| "Home" | "หน้าหลัก" |
| "Slide XX of 32" | "สไลด์ XX จาก 32" |