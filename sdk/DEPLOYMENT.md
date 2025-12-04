# Deployment Guide - EverLetter SDK

## For Your Deployment (Vercel)

### Step 1: Update Base URL for Production

When deploying to Vercel, you need to make sure the SDK uses the correct production URL.

#### Option A: Environment Variable (Recommended)

1. **Set environment variable in Vercel:**

   - Go to your Vercel project settings
   - Add environment variable: `NEXT_PUBLIC_API_URL`
   - Value: `https://everletter.vercel.app`

2. **Update SDK to use environment variable:**
   ```typescript
   // In sdk/core.ts or wherever you initialize
   const baseUrl = process.env.NEXT_PUBLIC_API_URL || window.location.origin;
   ```

#### Option B: Auto-detect (Current Implementation)

The SDK already auto-detects the base URL from `window.location.origin`, which works automatically on Vercel.

### Step 2: Update Showcase Component

Update `components/docs/Showcase.tsx` to use environment variable:

```tsx
const baseUrl =
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_API_URL || "https://everletter.vercel.app";
```

### Step 3: Deploy to Vercel

```bash
# If not already connected
vercel

# Or push to GitHub (if connected)
git push origin main
```

## For Other Developers Using Your SDK

### Option 1: Publish to NPM (Recommended)

#### Step 1: Prepare Package

1. **Update `sdk/package.json`:**

   ```json
   {
     "name": "@shreyzeous21/everletter-sdk",
     "version": "1.0.0",
     "main": "dist/index.js",
     "types": "dist/index.d.ts",
     "files": ["dist"],
     "scripts": {
       "build": "tsc",
       "prepublishOnly": "npm run build"
     }
   }
   ```

2. **Create `sdk/tsconfig.json` for building:**
   ```json
   {
     "compilerOptions": {
       "target": "ES2020",
       "module": "ESNext",
       "lib": ["ES2020", "DOM"],
       "declaration": true,
       "outDir": "./dist",
       "rootDir": "./",
       "strict": true,
       "esModuleInterop": true,
       "skipLibCheck": true,
       "jsx": "react-jsx"
     },
     "include": ["**/*.ts", "**/*.tsx"],
     "exclude": ["node_modules", "dist", "examples"]
   }
   ```

#### Step 2: Build and Publish

```bash
cd sdk
npm run build
npm publish --access public
```

#### Step 3: Other Developers Install

```bash
npm install @shreyzeous21/everletter-sdk
```

### Option 2: GitHub Package (Free Alternative)

1. **Publish to GitHub Packages:**

   ```json
   // package.json
   {
     "name": "@shreyzeous21/everletter-sdk",
     "publishConfig": {
       "registry": "https://npm.pkg.github.com"
     }
   }
   ```

2. **Publish:**

   ```bash
   npm publish
   ```

3. **Others install:**
   ```bash
   npm install @shreyzeous21/everletter-sdk
   ```

### Option 3: CDN (For Browser Use)

Create a bundled version for CDN:

1. **Install bundler:**

   ```bash
   npm install -D esbuild
   ```

2. **Create build script:**

   ```javascript
   // sdk/build-cdn.js
   const esbuild = require("esbuild");

   esbuild.build({
     entryPoints: ["index.ts"],
     bundle: true,
     outfile: "dist/everletter.min.js",
     format: "iife",
     globalName: "EverLetterSDK",
     minify: true,
   });
   ```

3. **Host on CDN:**

   - Upload `dist/everletter.min.js` to your CDN
   - Or use Vercel's static file hosting

4. **Others use:**
   ```html
   <script src="https://cdn.your-domain.com/everletter.min.js"></script>
   <script>
     const sdk = new EverLetterSDK.EverLetterSDK({
       baseUrl: "https://everletter.vercel.app",
     });
   </script>
   ```

## Usage Examples for Other Developers

### After Installing from NPM

```bash
npm install @shreyzeous21/everletter-sdk
```

### React Example

```tsx
import { EverLetterTemplate } from "@shreyzeous21/everletter-sdk/react";

function MyComponent() {
  return (
    <EverLetterTemplate
      slug="newsletter-template"
      variables={[{ key: "title", value: "Welcome!" }]}
      baseUrl="https://everletter.vercel.app"
    />
  );
}
```

### Vanilla JS Example

```javascript
import { EverLetterSDK } from "@shreyzeous21/everletter-sdk";

const sdk = new EverLetterSDK({
  baseUrl: "https://your-api.vercel.app",
});

const result = await sdk.renderTemplate({
  slug: "newsletter-template",
  variables: [{ key: "title", value: "Welcome!" }],
});
```

## Important Notes

1. **Base URL Configuration:**

   - Developers need to provide your Vercel deployment URL
   - Or you can set a default in the SDK

2. **CORS Settings:**

   - Make sure your Vercel API allows CORS from other domains
   - Add CORS headers in your API routes

3. **Documentation:**

   - Update README.md with your actual package name
   - Include your Vercel URL in examples
   - Add installation instructions

4. **Versioning:**
   - Use semantic versioning (1.0.0, 1.0.1, etc.)
   - Update version in package.json before publishing

## Quick Checklist

- [ ] Set `NEXT_PUBLIC_API_URL` in Vercel
- [ ] Update baseUrl in SDK examples
- [ ] Test SDK on production URL
- [ ] Build SDK package (`npm run build`)
- [ ] Publish to NPM/GitHub
- [ ] Update documentation with production URL
- [ ] Test installation from NPM
- [ ] Add CORS headers if needed
