# How to Publish Your SDK for Others to Use

## Quick Start - Publish to NPM

### Step 1: Prepare Your Package

1. **Update `sdk/package.json` with your details:**

```json
{
  "name": "@your-username/everletter-sdk",
  "version": "1.0.0",
  "description": "Official SDK for integrating EverLetter templates",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist",
    "README.md"
  ],
  "scripts": {
    "build": "tsc",
    "prepublishOnly": "npm run build"
  },
  "keywords": [
    "everletter",
    "templates",
    "email-templates",
    "sdk"
  ],
  "author": "Your Name",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/your-username/everletter"
  }
}
```

### Step 2: Create TypeScript Build Config

Create `sdk/tsconfig.build.json`:

```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": [
    "**/*.ts",
    "**/*.tsx"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "examples",
    "**/*.test.ts",
    "**/*.test.tsx"
  ]
}
```

### Step 3: Build the Package

```bash
cd sdk
npm run build
```

### Step 4: Login to NPM

```bash
npm login
# Enter your NPM username, password, and email
```

### Step 5: Publish

```bash
npm publish --access public
```

## How Others Will Use It

### Installation

```bash
npm install @your-username/everletter-sdk
```

### Usage in Their Code

```tsx
// React
import { EverLetterTemplate } from '@your-username/everletter-sdk/react';

<EverLetterTemplate
  slug="newsletter-template"
  variables={[{ key: "title", value: "Hello" }]}
  baseUrl="https://your-vercel-app.vercel.app"
/>

// Vanilla JS
import { EverLetterSDK } from '@your-username/everletter-sdk';

const sdk = new EverLetterSDK({
  baseUrl: 'https://your-vercel-app.vercel.app'
});
```

## Alternative: GitHub Packages (Free)

If you don't want to publish to public NPM:

1. **Update package.json:**
```json
{
  "name": "@your-github-username/everletter-sdk",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

2. **Create `.npmrc` in sdk folder:**
```
@your-github-username:registry=https://npm.pkg.github.com
```

3. **Publish:**
```bash
npm publish
```

4. **Others install:**
```bash
npm install @your-github-username/everletter-sdk
```

## Alternative: Direct Import (No Publishing)

If you don't want to publish, others can:

1. **Clone your repo:**
```bash
git clone https://github.com/your-username/everletter.git
```

2. **Use directly:**
```tsx
import { EverLetterTemplate } from './path/to/everletter/sdk/react/EverLetterTemplate';
```

3. **Or use as git dependency:**
```json
{
  "dependencies": {
    "everletter-sdk": "git+https://github.com/your-username/everletter.git#main"
  }
}
```

## Update Documentation

After publishing, update:

1. **README.md** - Add installation instructions
2. **Examples** - Use your actual package name
3. **Base URL** - Use your Vercel deployment URL

## Version Updates

When you make changes:

1. Update version in `package.json`:
   - Patch: `1.0.0` → `1.0.1` (bug fixes)
   - Minor: `1.0.0` → `1.1.0` (new features)
   - Major: `1.0.0` → `2.0.0` (breaking changes)

2. Build and publish:
```bash
npm run build
npm publish
```

3. Others update:
```bash
npm update @your-username/everletter-sdk
```

