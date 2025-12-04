# ✅ NPM Publish Checklist

Use this checklist before publishing to NPM:

## Pre-Publish Checklist

### 1. Package Configuration
- [ ] Updated `package.json` with your NPM username
- [ ] Changed package name from `@everletter/sdk` to `@your-username/everletter-sdk`
- [ ] Updated author information
- [ ] Updated repository URL
- [ ] Version is set to `1.0.0` (or appropriate version)

### 2. Build Configuration
- [ ] `tsconfig.json` exists in `sdk/` folder
- [ ] TypeScript is installed: `npm install -D typescript`
- [ ] Build works: `npm run build`
- [ ] `dist/` folder is created after build
- [ ] `dist/index.js` exists
- [ ] `dist/index.d.ts` exists (TypeScript definitions)

### 3. Files to Include
- [ ] `dist/` folder (built files)
- [ ] `README.md` (documentation)
- [ ] `.npmignore` exists (excludes source files)

### 4. NPM Account
- [ ] Created NPM account at [npmjs.com](https://www.npmjs.com)
- [ ] Verified email address
- [ ] Logged in: `npm login`

### 5. Testing
- [ ] Tested build locally: `npm run build`
- [ ] Checked `dist` folder contents
- [ ] (Optional) Tested with `npm pack` in another project

## Publish Steps

1. **Navigate to SDK folder:**
   ```bash
   cd sdk
   ```

2. **Build:**
   ```bash
   npm run build
   ```

3. **Login (if not already):**
   ```bash
   npm login
   ```

4. **Publish:**
   ```bash
   npm publish --access public
   ```

## Post-Publish Checklist

- [ ] Package appears on npmjs.com
- [ ] Can install with: `npm install @your-username/everletter-sdk`
- [ ] Documentation is visible on NPM page
- [ ] Tested installation in a new project
- [ ] Updated main README.md with NPM package name
- [ ] Updated examples with correct package name

## Common Issues

### ❌ "Package name already exists"
**Solution:** Use a different name or scoped package

### ❌ "You must verify your email"
**Solution:** Check email and click verification link

### ❌ "Build failed"
**Solution:** 
- Install TypeScript: `npm install -D typescript`
- Check `tsconfig.json` exists
- Fix any TypeScript errors

### ❌ "No files to publish"
**Solution:**
- Make sure `dist` folder exists
- Check `files` array in `package.json` includes `dist`

## Quick Commands Reference

```bash
# Build
npm run build

# Test package locally
npm pack

# Login
npm login

# Publish
npm publish --access public

# Update version
npm version patch  # 1.0.0 → 1.0.1
npm version minor  # 1.0.0 → 1.1.0
npm version major  # 1.0.0 → 2.0.0
```

## Need Help?

- **Quick Start:** See `QUICK_START.md`
- **Detailed Guide:** See `NPM_PUBLISH_GUIDE.md`
- **NPM Docs:** [docs.npmjs.com](https://docs.npmjs.com)

