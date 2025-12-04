# Deployment & SDK Usage Guide

## 🚀 For Your Deployment (Vercel)

### Step 1: Deploy to Vercel

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add SDK and CORS support"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js
   - Click "Deploy"

3. **Get Your Deployment URL:**
   - After deployment, you'll get: `https://your-app.vercel.app`
   - Or use your custom domain if configured

### Step 2: Update Environment Variables (Optional)

If you want to set a default API URL:

1. In Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add: `NEXT_PUBLIC_API_URL` = `https://your-app.vercel.app`

### Step 3: Test Your Deployment

Visit: `https://your-app.vercel.app/docs`

- ✅ Check the "SDK" tab
- ✅ Check the "API" tab  
- ✅ Check the "Showcase" tab

## 👥 How Others Will Use Your SDK

### Option 1: Direct API Usage (No SDK Installation)

Other developers can use your API directly:

```javascript
// In their website
fetch('https://your-app.vercel.app/api/templates/newsletter-template/render', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    variables: [
      { key: 'title', value: 'Welcome!' }
    ]
  })
})
.then(res => res.json())
.then(data => {
  document.getElementById('container').innerHTML = data.html;
});
```

### Option 2: Using Your SDK (If Published to NPM)

#### Step 1: You Publish SDK to NPM

```bash
cd sdk
npm publish --access public
```

#### Step 2: Others Install Your SDK

```bash
npm install @your-username/everletter-sdk
```

#### Step 3: Others Use in Their Code

**React:**
```tsx
import { EverLetterTemplate } from '@your-username/everletter-sdk/react';

function MyComponent() {
  return (
    <EverLetterTemplate
      slug="newsletter-template"
      variables={[
        { key: "title", value: "Welcome!" }
      ]}
      baseUrl="https://your-app.vercel.app"
    />
  );
}
```

**Vanilla JavaScript:**
```javascript
import { EverLetterSDK } from '@your-username/everletter-sdk';

const sdk = new EverLetterSDK({
  baseUrl: 'https://your-app.vercel.app'
});

const result = await sdk.renderTemplate({
  slug: 'newsletter-template',
  variables: [{ key: 'title', value: 'Welcome!' }]
});

document.getElementById('container').innerHTML = result.html;
```

### Option 3: Copy SDK Files Directly

Others can copy your SDK folder and use it:

1. **They download/copy your `sdk` folder**
2. **They import it:**
   ```tsx
   import { EverLetterTemplate } from './sdk/react/EverLetterTemplate';
   
   <EverLetterTemplate
     slug="newsletter-template"
     baseUrl="https://your-app.vercel.app"
   />
   ```

## 📋 Important Notes

### CORS (Cross-Origin Resource Sharing)

✅ **Already Added!** I've added CORS headers to all your API routes:
- `/api/templates`
- `/api/templates/[slug]`
- `/api/templates/[slug]/render`

This allows other websites to use your API from their domains.

### Base URL Configuration

When others use your SDK, they need to provide your Vercel URL:

```tsx
baseUrl="https://your-app.vercel.app"
```

Or you can set a default in the SDK (update `sdk/core.ts`):

```typescript
constructor(config: EverLetterSDKConfig = {}) {
  this.baseUrl = config.baseUrl || 
    process.env.NEXT_PUBLIC_API_URL || 
    "https://your-app.vercel.app"; // Your default production URL
}
```

## 🎯 Quick Checklist

### For Your Deployment:
- [x] CORS headers added to API routes
- [ ] Deploy to Vercel
- [ ] Test API endpoints work
- [ ] Update SDK examples with your Vercel URL
- [ ] (Optional) Publish SDK to NPM

### For Others Using Your SDK:
- [ ] Get your Vercel deployment URL
- [ ] Install SDK (if published) or copy files
- [ ] Use `baseUrl` pointing to your Vercel app
- [ ] Test with a real template slug

## 📝 Example: Complete Workflow

### You (SDK Creator):
1. Deploy to Vercel → Get URL: `https://everletter.vercel.app`
2. Update documentation with this URL
3. (Optional) Publish SDK: `npm publish`

### Developer Using Your SDK:
1. Install: `npm install @your-username/everletter-sdk`
2. Use in code:
   ```tsx
   <EverLetterTemplate
     slug="newsletter-template"
     baseUrl="https://everletter.vercel.app"
   />
   ```
3. Done! Template renders from your API

## 🔒 Security Note

Currently, your API is **public** (no authentication). This is fine for templates, but consider:
- Rate limiting (Vercel has built-in)
- API keys for advanced features (optional)
- Monitoring usage

## 🎉 That's It!

Your SDK is ready for others to use! They just need:
1. Your Vercel deployment URL
2. A template slug
3. The SDK code (or NPM package)

The CORS headers I added allow cross-origin requests, so it works from any website!

