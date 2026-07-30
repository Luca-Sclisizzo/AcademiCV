#!/bin/bash

# This script runs both CV generators
# It simultaneously creates both HTML and DOCX versions

# Reading the saving directory specified in config.js
OUTPUT_DIR=$(node -p "require('./config').outputDirectory")

echo ">> Running both CV academic generators..."

node cv_academic_generator_docx.js
if [ $? -ne 0 ]; then
    echo "Error generating DOCX CV"
    exit 1
fi

node cv_academic_generator_html.js
if [ $? -ne 0 ]; then
    echo "Error generating HTML CV"
    exit 1
fi

echo ">> Finished running CV academic generators"
echo "Both CVs saved @ $OUTPUT_DIR"
