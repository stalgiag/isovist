#!/bin/bash

# Check if prefix argument is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <prefix>"
    echo "Example: $0 lovelace_v1"
    echo "This will look for PNGs in ./<prefix>/<prefix>_00000.png"
    exit 1
fi

PREFIX=$1

# Create output directory
mkdir -p "duplicated_${PREFIX}"

# Generate frame sequence with symbolic links
frame_index=0
for i in {0..299}; do
        # Source frame path
    source_frame="${PREFIX}/${PREFIX}_$(printf "%05d" $i).png"
    
     # Calculate duplicates using a very gentle curve
    if [ $i -lt 125 ]; then
        # First 125 frames: gradually decrease duplicates from 1.5 to 1
        duplicates=$(( 15 - (5 * i / 125) ))
        duplicates=$(( duplicates / 10 ))
    elif [ $i -gt 174 ]; then
        # Last 125 frames: gradually increase duplicates from 1 to 1.5
        duplicates=$(( 10 + (5 * (i - 174) / 125) ))
        duplicates=$(( duplicates / 10 ))
    else
        # Middle frames: no duplication
        duplicates=1
    fi
    
    # Create symbolic links
    for (( j=0; j<duplicates; j++ )); do
        ln -s "../${source_frame}" "duplicated_${PREFIX}/frame_$(printf "%05d" $frame_index).png"
        frame_index=$((frame_index + 1))
    done
done

echo "Created ${frame_index} frames"

# Simple FFmpeg command to combine frames, create ping-pong, and optimize for web
# # WebM (VP9) with alpha
# ffmpeg -framerate 60 -i "duplicated_${PREFIX}/frame_%05d.png" -filter_complex "\
# [0:v]split[v1][v2];\
# [v2]reverse[reversed];\
# [v1][reversed]concat=n=2:v=1[v];\
# [v]scale=-1:min(1024\,ih)[scaled]" \
# -map "[scaled]" \
# -c:v libvpx-vp9 \
# -pix_fmt yuva420p \
# -b:v 2M \
# -crf 30 \
# -deadline good \
# -cpu-used 1 \
# -progress pipe:1 \
# "${PREFIX}_smooth_pingpong_alpha.webm"

# HEVC with alpha - balanced quality and size
ffmpeg -framerate 60 -i "duplicated_${PREFIX}/frame_%05d.png" -filter_complex "\
[0:v]split[v1][v2];\
[v2]reverse[reversed];\
[v1][reversed]concat=n=2:v=1[v];\
[v]scale=-1:min(1024\,ih),format=yuva444p10le[scaled]" \
-map "[scaled]" \
-c:v prores_ks \
-profile:v 4444 \
-vendor apl0 \
-bits_per_mb 8000 \
-pix_fmt yuva444p10le \
-alpha_bits 16 \
-movflags +faststart \
-an \
"${PREFIX}_smooth_pingpong_alpha.mov"

# Clean up the temporary directory
rm -r "duplicated_${PREFIX}"