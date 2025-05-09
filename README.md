# MobiCryp Slideshow

A responsive, interactive presentation for MobiCryp's crypto minting platform featuring detailed information on minting boosts, bonus structures, ranks, rewards, and more.

![MobiCryp Logo](./images/mobicryp-logo.svg)

## Overview

This slideshow is a comprehensive presentation for the MobiCryp platform, showcasing key features and benefits through an interactive slideshow experience. The presentation includes:

- **Minting Booster Slide**: Self-Minting and Auto-Minting boost rates
- **Bonus Structure Slide**: Four different bonus types and their benefits
- **Rank & Rewards Slide**: 13 ranks with detailed requirements and rewards
- **Power of 4 Slide**: Team duplication model with ROI calculations
- **Upcoming Products Slide**: Nine future products in the MobiCryp ecosystem
- **Trust & Support Slide**: Company credentials and support options

## Technologies Used

- HTML5, CSS3, and JavaScript
- Swiper.js for the slideshow functionality
- Responsive design for all devices
- Animated transitions and visual effects
- Font Awesome for high-quality icons

## Project Structure

```
mobicryp-slideshow/
├── css/
│   └── styles.css         # Comprehensive styles for all slides
├── js/
│   └── main.js            # JavaScript functionality
├── images/
│   └── mobicryp-logo.svg  # MobiCryp logo
├── index.html             # Main slideshow with all slides
├── README.md              # Project documentation
├── render.yaml            # Render.com deployment configuration
└── .gitignore             # Git ignore file
```

## Setup and Deployment

### Local Development

1. Clone this repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/mobicryp-slideshow.git
   cd mobicryp-slideshow
   ```

2. Open `index.html` in your browser to view the slideshow.

3. Make any desired changes to the content or styles.

### GitHub Setup Instructions

1. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Name your repository (e.g., `mobicryp-slideshow`)
   - Set it to Public
   - Click "Create repository"

2. Connect your local repository to GitHub:
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/mobicryp-slideshow.git
   git branch -M main
   git push -u origin main
   ```

### Render.com Deployment

The `render.yaml` file is already configured for easy deployment:

1. Create a Render account at https://render.com/
2. Click "New" → "Static Site"
3. Connect to your GitHub account
4. Select your repository
5. Configure:
   - Name: mobicryp-slideshow
   - Build Command: (leave empty)
   - Publish Directory: .
6. Click "Create Static Site"

Your slideshow will be available at a URL like `https://mobicryp-slideshow.onrender.com`.

## Customization

### Updating Content

- Edit `index.html` to update content for any slide
- Add new images to the `images/` directory
- Update slide titles, descriptions, and values as needed

### Styling Changes

- All styles are in `css/styles.css`, organized by sections:
  - Common components and layout
  - Individual slide styles
  - Responsive design rules

### JavaScript Functionality

- Core functionality like navigation is in `js/main.js`
- Slide-specific interactivity like tabs and carousels

## Features

- Swipe navigation on mobile devices
- Keyboard arrow key navigation
- Interactive elements like tabs and carousels
- Animated transitions and visual effects
- Responsive design for all screen sizes

## License

Copyright © 2024 MobiCryp. All Rights Reserved.

## Contact

For questions or support, please contact [your contact information].