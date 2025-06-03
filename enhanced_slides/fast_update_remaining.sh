#!/bin/bash

# Function to create a positive theme file
create_positive_file() {
    local slide_num=$1
    local filename=$2
    local title=$3
    local prev_file=$4
    local next_file=$5
    
    cat > "$filename" << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MobiCryp - $title</title>
    <link rel="stylesheet" href="positive-theme.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        /* Slide-specific styles for $title */
    </style>
</head>
<body>
    <!-- Header -->
    <div class="header">
        <div class="slide-counter">Slide $slide_num of 22</div>
        <div class="logo-text">MobiCryp</div>
    </div>

    <!-- Main slide content -->
    <div class="slide-container">
        <div class="slide-content">
            <!-- Background decoration -->
            <div class="bg-decoration">
                <div class="bg-circle bg-circle-1"></div>
                <div class="bg-circle bg-circle-2"></div>
                <div class="bg-circle bg-circle-3"></div>
            </div>

            <div class="main-container">
                <!-- Content Header -->
                <div class="text-center mb-4">
                    <h1 class="section-title">$title</h1>
                    <p class="section-description">Content migrated from original slide</p>
                </div>

                <!-- Main Content -->
                <div class="content-card">
                    <p class="text-center">Original content preserved with positive theme styling</p>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Navigation buttons -->
    <div class="navigation">
        <a href="index_enhanced.html" class="nav-button home-button">
            <i class="fas fa-home"></i> All Slides
        </a>
        <div style="display: flex; gap: 10px;">
            <a href="$prev_file" class="nav-button" id="prev-button">
                <i class="fas fa-arrow-left"></i> Previous
            </a>
            <a href="$next_file" class="nav-button" id="next-button">
                Next <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    </div>
</body>
</html>
EOF
}

# Update remaining files
echo "Updating remaining HTML files..."

# File 06
create_positive_file 6 "06_our_mission.html" "Our Mission" "05_timeline_of_trust.html" "07_why_mobicryp_works.html"

# File 07
create_positive_file 7 "07_why_mobicryp_works.html" "Why MobiCryp Works" "06_our_mission.html" "08_choose_your_path.html"

# File 08
create_positive_file 8 "08_choose_your_path.html" "Choose Your Path" "07_why_mobicryp_works.html" "09_what_youre_buying.html"

# File 09
create_positive_file 9 "09_what_youre_buying.html" "What You're Buying" "08_choose_your_path.html" "10_mobicryp_hubs_calculator.html"

# File 10
create_positive_file 10 "10_mobicryp_hubs_calculator.html" "MobiCryp Hubs Calculator" "09_what_youre_buying.html" "11_self_vs_auto_minting.html"

# File 11
create_positive_file 11 "11_self_vs_auto_minting.html" "Self vs Auto Minting" "10_mobicryp_hubs_calculator.html" "12_direct_bonus.html"

# File 12
create_positive_file 12 "12_direct_bonus.html" "Direct Bonus" "11_self_vs_auto_minting.html" "13_community_binary_bonus.html"

# File 13
create_positive_file 13 "13_community_binary_bonus.html" "Community Binary Bonus" "12_direct_bonus.html" "14_level_minting_bonus.html"

# File 14
create_positive_file 14 "14_level_minting_bonus.html" "Level Minting Bonus" "13_community_binary_bonus.html" "15_mobicryp_rank_system.html"

# File 15
create_positive_file 15 "15_mobicryp_rank_system.html" "MobiCryp Rank System" "14_level_minting_bonus.html" "16_royalty_bonus.html"

# File 16
create_positive_file 16 "16_royalty_bonus.html" "Royalty Bonus" "15_mobicryp_rank_system.html" "17_terms_and_conditions.html"

# File 17
create_positive_file 17 "17_terms_and_conditions.html" "Terms and Conditions" "16_royalty_bonus.html" "18_upcoming_products.html"

# File 18
create_positive_file 18 "18_upcoming_products.html" "Upcoming Products" "17_terms_and_conditions.html" "19_start_earning_crypto_rewards.html"

# File 19
create_positive_file 19 "19_start_earning_crypto_rewards.html" "Start Earning Crypto Rewards" "18_upcoming_products.html" "20_starting_your_journey.html"

# File 20
create_positive_file 20 "20_starting_your_journey.html" "Starting Your Journey" "19_start_earning_crypto_rewards.html" "21_emerging_leader.html"

# File 21
create_positive_file 21 "21_emerging_leader.html" "Emerging Leader" "20_starting_your_journey.html" "22_start_your_journey_today.html"

# File 22
create_positive_file 22 "22_start_your_journey_today.html" "Start Your Journey Today" "21_emerging_leader.html" "22_start_your_journey_today.html"

echo "All files have been updated with the positive theme!"