import os

# Mapping from suit abbreviation to full name
suits = {
    'C': 'club',
    'D': 'diamond',
    'H': 'heart',
    'S': 'spade'
}

# Directory where the files are located
directory = "./cards"

# Iterate over all files in the directory
for filename in os.listdir(directory):
    if filename.endswith(".svg"):
        # Split the filename to get the rank and suit
        rank, suit = filename[:-4][:-1], filename[:-4][-1]
        
        # Construct the new filename
        new_filename = f"{suits[suit]}_{rank}.svg"
        
        # Rename the file
        os.rename(os.path.join(directory, filename), os.path.join(directory, new_filename))

print("Renaming completed!")
