# 📦 Complete Guide: Publishing SDK to NPM

## Step-by-Step Instructions

### Step 1: Create NPM Account (If You Don't Have One)

1. Go to [npmjs.com](https://www.npmjs.com)
2. Click "Sign Up"
3. Verify your email

### Step 2: Update Package Information

1. **Open `sdk/package.json`**
2. **Update these fields:**
   ```json
   {
     "name": "@shreyzeous21/everletter-sdk",
     "author": "Your Name <your-email@example.com>",
     "repository": {
       "url": "https://github.com/your-username/everletter.git"
     }
   }
   ```

   ⚠️ **Important:** 
   - Replace `@your-username` with your NPM username
   - Or use `everletter-sdk` (without @) if you want a simple name
   - Make sure the name is available on NPM (check first!)

### Step 3: Test Build Locally

```bash
# Navigate to SDK folder
cd sdk

# Install dependencies (if needed)
npm install

# Build the package
npm run build
```

**Check the output:**
- You should see a `dist` folder created
- Check that `dist/index.js` exists
- Check that `dist/index.d.ts` exists (TypeScript definitions)

### Step 4: Test Package Locally (Optional but Recommended)

```bash
# In the sdk folder
npm pack

# This creates a .tgz file
# You can test installing it in another project:
cd ../test-project
npm install ../sdk/everletter-sdk-1.0.0.tgz
```

### Step 5: Login to NPM

```bash
# In the sdk folder
npm login

# Enter:
# - Username: your-npm-username
# - Password: your-npm-password
# - Email: your-email@example.com
# - OTP (if 2FA enabled): enter code
```

### Step 6: Publish to NPM

```bash
# Make sure you're in the sdk folder
cd sdk

# Publish (first time)
npm publish --access public

# If using scoped package (@username/package), you need --access public
# If using simple name (everletter-sdk), you can just use:
npm publish
```

### Step 7: Verify Publication

1. Go to [npmjs.com/package/@shreyzeous21/everletter-sdk](https://www.npmjs.com/package/@shreyzeous21/everletter-sdk)
2. Search for your package name
3. You should see it published! 🎉

## How Others Will Install and Use

### Installation

```bash
npm install @shreyzeous21/everletter-sdk
```

### Usage

**React:**
```tsx
import { EverLetterTemplate } from '@shreyzeous21/everletter-sdk/react';

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

**Vanilla JavaScript:**
```javascript
import { EverLetterSDK } from '@shreyzeous21/everletter-sdk';

const sdk = new EverLetterSDK({
  baseUrl: 'https://everletter.vercel.app'
});

const result = await sdk.renderTemplate({
  slug: 'newsletter-template',
  variables: [{ key: 'title', value: 'Welcome!' }]
});
```

## Updating Your Package

When you make changes:

1. **Update version in `package.json`:**
   ```json
   {
     "version": "1.0.1"  // or 1.1.0 or 2.0.0
   }
   ```

2. **Build and publish:**
   ```bash
   cd sdk
   npm run build
   npm publish
   ```

3. **Users update:**
   ```bash
   npm update @shreyzeous21/everletter-sdk
   ```

## Version Numbering (Semantic Versioning)

- **Patch (1.0.0 → 1.0.1):** Bug fixes
- **Minor (1.0.0 → 1.1.0):** New features, backward compatible
- **Major (1.0.0 → 2.0.0):** Breaking changes

## Troubleshooting

### Error: "Package name already exists"
- Choose a different name
- Or use a scoped package: `@shreyzeous21/everletter-sdk`

### Error: "You must verify your email"
- Check your email and verify

### Error: "Invalid package name"
- Package names must be lowercase
- Can contain hyphens and underscores
- Scoped packages: `@username/package-name`

### Error: "Build failed"
- Check `tsconfig.json` exists
- Make sure TypeScript is installed: `npm install -D typescript`
- Check for TypeScript errors

### Error: "No files to publish"
- Make sure `dist` folder exists after build
- Check `files` array in `package.json` includes `dist`

## Quick Checklist

Before publishing:
- [ ] Updated `package.json` with your info
- [ ] Tested build locally (`npm run build`)
- [ ] Checked `dist` folder exists
- [ ] Logged into NPM (`npm login`)
- [ ] Package name is available
- [ ] Version number is correct (start with 1.0.0)

After publishing:
- [ ] Verify package appears on npmjs.com
- [ ] Test installation: `npm install @shreyzeous21/everletter-sdk`
- [ ] Update documentation with package name
- [ ] Share with others! 🚀

## Example: Complete Workflow

```bash
# 1. Navigate to SDK
cd sdk

# 2. Update package.json (edit manually)
# Change name, author, repository URL

# 3. Build
npm run build

# 4. Login (first time only)
npm login

# 5. Publish
npm publish --access public

# 6. Done! Others can now:
npm install @shreyzeous21/everletter-sdk
```

## Pro Tips

1. **Test First:** Use `npm pack` to test locally before publishing
2. **Start Small:** Publish version 1.0.0, test, then update
3. **Documentation:** Make sure README.md is clear
4. **Examples:** Include usage examples in README
5. **Version Control:** Use semantic versioning properly

## Need Help?

- NPM Docs: [docs.npmjs.com](https://docs.npmjs.com)
- NPM Support: [npmjs.com/support](https://www.npmjs.com/support)

