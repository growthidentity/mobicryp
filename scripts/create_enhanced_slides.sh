#!/bin/bash

# Create enhanced slides for slide numbers 28-38
for i in {28..38}; do
  # Check if original slide exists
  if [ -f "$i.html" ]; then
    echo "Creating enhanced version of slide $i..."
    
    # Create enhanced slide file based on template
    cat > "${i}_enhanced.html" << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MobiCryp - Enhanced Slide $i</title>
    <link rel="stylesheet" href="common.css">
    <link rel="stylesheet" href="premium.css">
    <link rel="stylesheet" href="enhanced.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        /* Enhanced slide-specific styles */
        html, body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            height: 100vh;
            background: var(--primary-color);
        }
        
        .slide-container {
            padding: 0 !important;
            margin-top: 60px;
            height: calc(100vh - 60px);
            width: 100%;
            max-width: 100%;
            overflow: hidden;
            position: relative;
        }
        
        .slide-content {
            height: 100%;
            max-height: 100%;
            overflow: hidden;
            margin: 0;
            display: flex;
            flex-direction: column;
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            position: relative;
            z-index: 1;
            padding: 0 1rem !important;
        }
        
        .main-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 0 2rem 2rem;
            position: relative;
            z-index: 5;
            max-width: 1400px;
            margin: 0 auto;
            width: 100%;
        }
        
        .background-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=2574&auto=format&fit=crop');
            background-size: cover;
            background-position: center;
            filter: brightness(0.2) saturate(1.3);
            z-index: 0;
        }
        
        .gradient-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(0deg, 
                rgba(0, 20, 40, 0.95) 0%, 
                rgba(0, 20, 40, 0.8) 50%, 
                rgba(0, 20, 40, 0.7) 100%);
            z-index: 1;
        }
        
        .particles-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
        }
        
        .section-title {
            font-size: 3rem !important;
            font-weight: 800 !important;
            margin-bottom: 1rem !important;
            letter-spacing: 1px !important;
            text-shadow: 0 0 30px rgba(0, 150, 255, 0.7) !important;
            background: linear-gradient(90deg, #00d1ff, #7b4dff, #00d1ff);
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradientTitle 10s ease infinite;
            position: relative;
            padding-bottom: 0.5rem;
        }
        
        @keyframes gradientTitle {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        .section-title::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 150px;
            height: 3px;
            background: linear-gradient(90deg, transparent, var(--accent-color), transparent);
            border-radius: 3px;
        }
        
        .section-description {
            font-size: 1.3rem !important;
            font-weight: 500 !important;
            margin-bottom: 2.5rem !important;
            color: rgba(255, 255, 255, 0.8) !important;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            animation: fadeIn 1s ease-out 0.5s forwards;
            opacity: 0;
            animation-fill-mode: forwards;
        }
        
        .content-card {
            background: rgba(0, 20, 40, 0.7);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            border: 1px solid rgba(0, 209, 255, 0.2);
            padding: 2rem;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
            max-width: 1000px;
            width: 100%;
            margin: 0 auto;
            position: relative;
            overflow: hidden;
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .content-card::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(120deg, 
                rgba(0, 0, 0, 0) 0%, 
                rgba(0, 209, 255, 0.05) 50%, 
                rgba(0, 0, 0, 0) 100%);
            z-index: -1;
            opacity: 0;
            transition: opacity 0.4s ease;
            border-radius: 20px;
        }
        
        .content-card:hover::before {
            opacity: 1;
        }
        
        .content-card.card-visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .navigation {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding: 1rem 2rem;
            margin: 0 !important;
            z-index: 20;
        }
        
        .nav-button {
            position: relative;
            overflow: hidden;
            padding: 10px 20px !important;
            font-size: 0.9rem !important;
            font-weight: 600 !important;
            letter-spacing: 0.5px !important;
            text-transform: uppercase;
            transition: all 0.3s ease !important;
        }
        
        .nav-button::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.6s ease;
        }
        
        .nav-button:hover::after {
            left: 100%;
        }
        
        @media (max-width: 768px) {
            .section-title {
                font-size: 2rem !important;
            }
            
            .section-description {
                font-size: 1rem !important;
            }
            
            .main-container {
                padding: 0 1rem 2rem;
            }
        }
    </style>
</head>
<body>
    <!-- Header with navigation -->
    <header class="header">
        <div class="logo">MobiCryp</div>
        <div class="slide-counter">Slide $i of 38</div>
    </header>

    <!-- Enhanced Background Elements -->
    <div class="background-image"></div>
    <div class="gradient-overlay"></div>
    <div id="particles-container" class="particles-container"></div>

    <!-- Main slide content -->
    <div class="slide-container">
        <div class="slide-content premium-slide">
            <div class="main-container">
                <h2 class="section-title">Slide $i Title</h2>
                <p class="section-description">Slide $i description goes here</p>
                
                <div class="content-card" id="main-content">
                    <!-- Content from original slide will go here -->
                    <p>Replace this with content from slide $i</p>
                </div>
            </div>
            
            <!-- Navigation buttons -->
            <div class="navigation">
                <a href="index.html" class="nav-button premium-button home-button">
                    <i class="fas fa-home"></i> All Slides
                </a>
                <div style="display: flex; gap: 10px;">
                    <a href="$(($i-1))_enhanced.html" class="nav-button premium-button" id="prev-button">
                        <i class="fas fa-arrow-left"></i> Previous
                    </a>
                    <a href="$(($i+1))_enhanced.html" class="nav-button premium-button premium-cta" id="next-button">
                        Next <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
    
    <script src="enhanced.js"></script>
    <script src="particles_enhanced.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Animate main content card
            setTimeout(() => {
                document.getElementById('main-content').classList.add('card-visible');
            }, 400);
            
            // Reset animations when page visibility changes
            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'visible') {
                    // Reset main content card
                    const mainContent = document.getElementById('main-content');
                    mainContent.classList.remove('card-visible');
                    void mainContent.offsetWidth; // Force reflow
                    
                    // Re-animate content card
                    setTimeout(() => {
                        mainContent.classList.add('card-visible');
                    }, 400);
                }
            });
        });
    </script>
</body>
</html>
EOF
  else
    echo "Slide $i.html does not exist, skipping..."
  fi
done

echo "Enhanced slide templates created. Please customize each slide with content from the original slides."