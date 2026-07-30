#!/bin/bash

# This script runs both CV generators
# It simultaneously creates both HTML and DOCX versions

# Reading the saving directory specified in config.js
OUTPUT_DIR=$(node -p "require('./config').outputDirectory")
OUTPUT_HTML=$(node -p "require('./config').outputPathHtml")
QUARTO_FOLDER=$(node -p "require('./config').quarto_folder")

echo ">> Running both CV academic generators..."

node cv_academic_generator_docx.js
if [ $? -ne 0 ]; then
    echo "Error generating DOCX CV"
    exit 1
fi
echo ""
node cv_academic_generator_html.js
if [ $? -ne 0 ]; then
    echo "Error generating HTML CV"
    exit 1
fi

echo ">> Finished running CV academic generators"
echo "Both CVs saved @ $OUTPUT_DIR"
echo ""

# Saving to the quarto folder
while true; do
    read -p "Do you want to save the HTML CV in your quarto folder? (Y/N): " yn

    case $yn in
        [Yy]* )
            echo "Copying file..."
            cp "$OUTPUT_HTML" "$QUARTO_FOLDER"
            echo "HTML CV copied successfully."
            break
            ;;
        [Nn]* )
            echo "No copy to the quarto folder."
            exit 0
            ;;
        * )
            echo "Reply Y or N."
            ;;
    esac
done
