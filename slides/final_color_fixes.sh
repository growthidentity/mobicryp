#!/bin/bash

# Script to update remaining color issues in the gold theme

# Fix connector lines in slide 15
sed -i '' 's|background: rgba(0, 209, 255, 0.3);|background: rgba(212, 175, 55, 0.3);|g' 15.html

# Fix branch amounts in slide 15
sed -i '' 's|background: rgba(0, 209, 255, 0.8);|background: linear-gradient(90deg, #d4af37, #b08d57);|g' 15.html

# Fix text color in stat values 
sed -i '' 's|color: white;|color: var(--text-primary);|g' 15.html

# Fix example cell backgrounds
sed -i '' 's|background: rgba(0, 209, 255, 0.05);|background: rgba(212, 175, 55, 0.05);|g' 15.html
sed -i '' 's|border: 1px solid rgba(0, 209, 255, 0.1);|border: 1px solid rgba(212, 175, 55, 0.1);|g' 15.html

# Fix text color in main slide 14 
sed -i '' 's|color: white;">Key Benefits|color: var(--text-primary);">Key Benefits|g' 14.html

# Update connector lines in slide 14
sed -i '' 's|background: rgba(0, 209, 255, 0.5);|background: rgba(212, 175, 55, 0.5);|g' 14.html

echo "Final color fixes applied!"