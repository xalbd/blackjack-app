#!/bin/zsh

# Directory where the files are located
directory="/cards"

# Mapping suits to full names
declare -A suits
suits=( ["c"]="club" ["d"]="diamond" ["h"]="heart" ["s"]="spade" )

# Loop through each .svg file in the directory
for file in "$directory"/*.svg; do
    # Extract the filename without the extension
    filename=$(basename -- "$file" .svg)
    
    # Extract the rank and suit from the filename
    rank="${filename:0:${#filename}-1}"
    suit="${filename: -1}"
    
    # Get the full name for the suit
    full_suit=${suits[$suit]}
    
    # Construct the new filename
    new_filename="${full_suit}_${rank}.svg"
    
    # Rename the file
    mv "$file" "$directory/$new_filename"
done

echo "Renaming completed!"
