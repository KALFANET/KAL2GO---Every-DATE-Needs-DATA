#!/bin/bash

echo "Running documentation update..."
node "/Users/kalfanetanelmevorach/KAL2GO - Every DATE Needs DATA/updateDocumentation.js"

echo "Adding changes to Git..."
git add "/Users/kalfanetanelmevorach/KAL2GO - Every DATE Needs DATA/documentation.md"

echo "Committing changes..."
git commit -m "Auto-update documentation after changes"

echo "Pushing changes to remote repository..."
git push origin main

echo "All changes pushed successfully!"