# Testing the SDK Locally

## Quick Start

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to the docs page:**
   ```
   http://localhost:3000/docs
   ```

3. **Go to the "Showcase" tab** - This will test the SDK with a real template

## Testing Steps

### Step 1: Check Your Templates
- Go to `/dashboard/templates` to see your available templates
- Note the **slug** of a template you want to test (e.g., "shrey", "newsletter-template")

### Step 2: Update the Showcase Component
- Open `components/docs/Showcase.tsx`
- Update the `slug` prop to match your template slug
- Update the `variables` array to match your template's variables

### Step 3: Test in Browser
- Go to `http://localhost:3000/docs`
- Click on the **"Showcase"** tab
- You should see:
  - ✅ Template loading
  - ✅ Rendered HTML
  - ✅ Console logs (check DevTools F12)

## Testing Different Methods

### Method 1: Using the Component (Easiest)
```tsx
import { EverLetterTemplate } from '@/sdk/react/EverLetterTemplate';

<EverLetterTemplate
  slug="your-template-slug"
  variables={[
    { key: "title", value: "Test Title" },
  ]}
  baseUrl="http://localhost:3000"
/>
```

### Method 2: Using the Hook
```tsx
import { useEverLetterTemplate } from '@/sdk/react/EverLetterTemplate';

const { html, loading, error, reload } = useEverLetterTemplate({
  slug: "your-template-slug",
  variables: [{ key: "title", value: "Test" }],
  baseUrl: "http://localhost:3000",
});
```

### Method 3: Using the Core SDK
```tsx
import { EverLetterSDK } from '@/sdk/core';

const sdk = new EverLetterSDK({
  baseUrl: 'http://localhost:3000'
});

const result = await sdk.renderTemplate({
  slug: 'your-template-slug',
  variables: [{ key: 'title', value: 'Test' }],
});

console.log(result.html);
```

## Troubleshooting

### Error: "Template not found" (404)
- Check that the slug matches exactly (case-sensitive)
- Verify the template exists in your database
- Check that `isPublished` is `true`

### Error: "Template is pro you cant acces it" (403)
- The template has `proOnly: true`
- Either set `proOnly: false` or use a different template

### Error: Network error
- Make sure your dev server is running on `http://localhost:3000`
- Check the browser console for CORS errors
- Verify the API endpoint is accessible

### Template not rendering
- Check browser console for errors
- Verify the variables match your template's variable keys
- Make sure the HTML is valid

## Testing Checklist

- [ ] Dev server is running
- [ ] Template slug is correct
- [ ] Variables match template requirements
- [ ] Browser console shows no errors
- [ ] Template HTML renders correctly
- [ ] Loading states work
- [ ] Error handling works (try invalid slug)

## Example Test Template

If you want to create a test template:

1. Go to `/dashboard/templates/add-template`
2. Create a template with:
   - **Name:** Test Template
   - **Slug:** test-template
   - **HTML:** `<h1>{{title}}</h1><p>{{description}}</p>`
   - **Variables:** `[{key: "title", value: ""}, {key: "description", value: ""}]`
3. Save and test with slug: `test-template`

