# 🚀 Quick Start: Publish to NPM in 5 Minutes

## Prerequisites

1. **NPM Account** - Sign up at [npmjs.com](https://www.npmjs.com)
2. **Node.js** - Make sure you have Node.js installed

## Step 1: Update Package Name

Edit `sdk/package.json` and change:

```json
{
  "name": "@shreyzeous21/everletter-sdk"
}
```

## Step 2: Login to NPM

```bash
cd sdk
npm login
```

Enter your NPM credentials.

## Step 3: Build and Publish

```bash
# Build the package
npm run build

# Publish to NPM
npm publish --access public
```

**That's it!** 🎉

## Verify

Visit: `https://www.npmjs.com/package/@shreyzeous21/everletter-sdk`

## How Others Use It

```bash
npm install @shreyzeous21/everletter-sdk
```

```tsx
import { EverLetterTemplate } from '@shreyzeous21/everletter-sdk/react';

<EverLetterTemplate
  slug="newsletter-template"
  baseUrl="https://everletter.vercel.app"
/>
```

## Troubleshooting

**"Package name already exists"**
- Choose a different name or use scoped package

**"Build failed"**
- Make sure TypeScript is installed: `npm install -D typescript`
- Check for errors in the build output

**"Not logged in"**
- Run `npm login` first

For detailed instructions, see `NPM_PUBLISH_GUIDE.md`

