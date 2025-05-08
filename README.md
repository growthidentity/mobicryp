# MobiCryp Slideshow

A responsive, interactive presentation for MobiCryp's crypto minting platform.

## Getting Started

This slideshow is ready to be deployed to a hosting service like Render.com for free.

## Files

- `index.html` - The complete slideshow with all slides
- `additional-styles.css` - Additional styles for new slides

## GitHub Setup Instructions

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

## Render.com Deployment

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

To customize the slideshow:
1. Edit the `index.html` file to update content
2. Modify styles in `additional-styles.css` for visual changes
3. Commit and push changes to GitHub
4. Render will automatically redeploy your site

## Features

- Responsive design for all devices
- Interactive elements like tabs and carousels
- Animated transitions and visual effects
- Complete presentation for MobiCryp's platform