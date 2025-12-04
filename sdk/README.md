# EverLetter SDK

A powerful SDK for integrating EverLetter templates into any website or application.

## Installation

### NPM
```bash
npm install @shreyzeous21/everletter-sdk
```

### Local Development
If using locally before publishing:
```bash
# Copy the sdk folder to your project
# Then import:
import { EverLetterTemplate } from './sdk/react/EverLetterTemplate';
```

### CDN (Vanilla JS)
```html
<script src="https://cdn.everletter.com/sdk/v1/everletter.min.js"></script>
```

## Quick Start

### React

```tsx
import { EverLetterTemplate } from '@shreyzeous21/everletter-sdk/react';

function MyComponent() {
  return (
    <EverLetterTemplate
      slug="newsletter-template"
      variables={[
        { key: "title", value: "Welcome!" },
        { key: "description", value: "This is a newsletter" },
      ]}
      baseUrl="https://everletter.vercel.app"
    />
  );
}
```

### React Hook

```tsx
import { useEverLetterTemplate } from '@shreyzeous21/everletter-sdk/react';

function MyComponent() {
  const { html, loading, error, reload } = useEverLetterTemplate({
    slug: "newsletter-template",
    variables: [
      { key: "title", value: "Welcome!" },
    ],
    baseUrl: "https://everletter.vercel.app",
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
```

### Vanilla JavaScript

```javascript
import { EverLetterSDK } from '@shreyzeous21/everletter-sdk';

const sdk = new EverLetterSDK({
  baseUrl: 'https://everletter.vercel.app'
});

// Render template
const result = await sdk.renderTemplate({
  slug: 'newsletter-template',
  variables: [
    { key: 'title', value: 'Welcome!' },
    { key: 'description', value: 'This is a newsletter' },
  ],
});

document.getElementById('template-container').innerHTML = result.html;
```

### Browser (CDN)

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.everletter.com/sdk/v1/everletter.min.js"></script>
</head>
<body>
  <div id="template-container"></div>
  
  <script>
    const sdk = new EverLetterSDK({
      baseUrl: 'https://everletter.vercel.app'
    });

    sdk.renderTemplate({
      slug: 'newsletter-template',
      variables: [
        { key: 'title', value: 'Welcome!' },
      ],
    })
    .then(result => {
      document.getElementById('template-container').innerHTML = result.html;
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
  </script>
</body>
</html>
```

## API Reference

### EverLetterSDK

#### Constructor

```typescript
new EverLetterSDK(config?: EverLetterSDKConfig)
```

**Config Options:**
- `baseUrl` (string, optional): Base URL for API requests. Defaults to current origin.

#### Methods

##### `renderTemplate(options)`

Renders a template with variables.

**Parameters:**
- `options.slug` (string, required): Template slug
- `options.variables` (array, optional): Array of `{ key: string, value: string }`
- `options.baseUrl` (string, optional): Override base URL for this request

**Returns:** `Promise<RenderTemplateResponse>`

**Example:**
```typescript
const result = await sdk.renderTemplate({
  slug: 'newsletter-template',
  variables: [
    { key: 'title', value: 'Welcome!' },
  ],
});

console.log(result.html); // Rendered HTML
console.log(result.name); // Template name
console.log(result.slug); // Template slug
```

##### `getTemplates()`

Gets all available templates.

**Returns:** `Promise<Template[]>`

**Example:**
```typescript
const templates = await sdk.getTemplates();
console.log(templates); // Array of template objects
```

##### `getTemplate(slug)`

Gets a specific template by slug.

**Parameters:**
- `slug` (string, required): Template slug

**Returns:** `Promise<Template>`

**Example:**
```typescript
const template = await sdk.getTemplate('newsletter-template');
console.log(template); // Template object
```

### React Components

#### `<EverLetterTemplate />`

React component that automatically renders a template.

**Props:**
- `slug` (string, required): Template slug
- `variables` (array, optional): Array of `{ key: string, value: string }`
- `baseUrl` (string, optional): Base URL for API requests
- `className` (string, optional): CSS class for the container
- `loadingComponent` (ReactNode, optional): Custom loading component
- `errorComponent` (function, optional): Custom error component renderer
- `onLoad` (function, optional): Callback when template loads
- `onError` (function, optional): Callback when error occurs
- `autoLoad` (boolean, optional): Auto-load on mount (default: true)

**Example:**
```tsx
<EverLetterTemplate
  slug="newsletter-template"
  variables={[{ key: 'title', value: 'Welcome!' }]}
  className="my-template"
  loadingComponent={<Spinner />}
  onLoad={(html) => console.log('Loaded:', html)}
/>
```

#### `useEverLetterTemplate(options)`

React hook for manual template control.

**Returns:**
- `html` (string): Rendered HTML
- `loading` (boolean): Loading state
- `error` (RenderTemplateError | null): Error object
- `loadTemplate()` (function): Manually load template
- `reload()` (function): Reload template

**Example:**
```tsx
const { html, loading, error, reload } = useEverLetterTemplate({
  slug: 'newsletter-template',
  variables: [{ key: 'title', value: 'Welcome!' }],
  autoLoad: true,
});
```

## Error Handling

All methods throw `RenderTemplateError` objects with:
- `message` (string): Error message
- `status` (number): HTTP status code

**Example:**
```typescript
try {
  const result = await sdk.renderTemplate({
    slug: 'invalid-slug',
  });
} catch (error) {
  console.error('Status:', error.status); // 404
  console.error('Message:', error.message); // "Template not found"
}
```

## TypeScript Support

Full TypeScript support is included. Import types as needed:

```typescript
import type {
  TemplateVariable,
  RenderTemplateOptions,
  RenderTemplateResponse,
  RenderTemplateError,
} from '@shreyzeous21/everletter-sdk';
```

## Examples

### Next.js

```tsx
'use client';

import { EverLetterTemplate } from '@shreyzeous21/everletter-sdk/react';

export default function NewsletterPage() {
  return (
    <div>
      <h1>Newsletter</h1>
      <EverLetterTemplate
        slug="newsletter-template"
        variables={[
          { key: 'title', value: 'Monthly Newsletter' },
          { key: 'date', value: new Date().toLocaleDateString() },
        ]}
        baseUrl={process.env.NEXT_PUBLIC_API_URL}
      />
    </div>
  );
}
```

### Vue.js (with vanilla SDK)

```vue
<template>
  <div v-html="html" v-if="!loading && !error"></div>
  <div v-if="loading">Loading...</div>
  <div v-if="error">{{ error.message }}</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { EverLetterSDK } from '@shreyzeous21/everletter-sdk';

const html = ref('');
const loading = ref(true);
const error = ref(null);
const sdk = new EverLetterSDK({ baseUrl: 'https://api.example.com' });

onMounted(async () => {
  try {
    const result = await sdk.renderTemplate({
      slug: 'newsletter-template',
      variables: [{ key: 'title', value: 'Welcome!' }],
    });
    html.value = result.html;
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
});
</script>
```

## License

MIT

