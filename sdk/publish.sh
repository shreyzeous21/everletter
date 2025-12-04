#!/bin/bash

# EverLetter SDK Publish Script
# This script helps you publish the SDK to NPM

echo "🚀 EverLetter SDK - NPM Publish Helper"
echo "======================================"
echo ""

# Check if we're in the SDK directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found!"
    echo "   Please run this script from the sdk/ directory"
    exit 1
fi

# Check if logged into NPM
echo "📦 Checking NPM login status..."
if ! npm whoami &> /dev/null; then
    echo "⚠️  Not logged into NPM"
    echo "   Run: npm login"
    exit 1
fi

echo "✅ Logged in as: $(npm whoami)"
echo ""

# Build the package
echo "🔨 Building package..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix errors and try again."
    exit 1
fi

echo "✅ Build successful!"
echo ""

# Check if dist folder exists
if [ ! -d "dist" ]; then
    echo "❌ Error: dist folder not found after build!"
    exit 1
fi

echo "📋 Package info:"
echo "   Name: $(node -p "require('./package.json').name")"
echo "   Version: $(node -p "require('./package.json').version")"
echo ""

# Ask for confirmation
read -p "🤔 Ready to publish? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Publishing cancelled"
    exit 0
fi

# Publish
echo "📤 Publishing to NPM..."
npm publish --access public

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Successfully published to NPM!"
    echo ""
    echo "📦 Others can now install with:"
    echo "   npm install $(node -p "require('./package.json').name")"
    echo ""
else
    echo ""
    echo "❌ Publishing failed!"
    exit 1
fi

