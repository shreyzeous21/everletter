"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Copy, Check, Code, Package, Zap } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default function SDK() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.BETTER_AUTH_URL || "https://everletter.vercel.app";

  const copyToClipboard = (text: string, id: string, label?: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success(
      label ? `${label} copied to clipboard!` : "Copied to clipboard!"
    );
  };

  const CodeBlock = ({
    children,
    copyId,
    language = "typescript",
  }: {
    children: React.ReactNode;
    copyId?: string;
    language?: string;
  }) => (
    <div className="relative group">
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono">
        <code>{children}</code>
      </pre>
      {copyId && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => copyToClipboard(String(children), copyId, "Code")}
        >
          {copiedId === copyId ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20 dark:border-blue-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-600" />
            <CardTitle>EverLetter SDK</CardTitle>
          </div>
          <CardDescription>
            Integrate EverLetter templates into any website or application with
            our official SDK. Works with React, Vue, and vanilla JavaScript.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">React</Badge>
            <Badge variant="outline">Vue</Badge>
            <Badge variant="outline">Vanilla JS</Badge>
            <Badge variant="outline">TypeScript</Badge>
            <Badge variant="outline">No Auth Required</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Installation */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            <CardTitle>Installation</CardTitle>
          </div>
          <CardDescription>
            Install the SDK using npm, yarn, or pnpm
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold mb-2">NPM</h3>
            <CodeBlock copyId="install-npm">
              {`npm install @shreyzeous21/everletter-sdk`}
            </CodeBlock>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-semibold mb-2">Yarn</h3>
            <CodeBlock copyId="install-yarn">
              {`yarn add @shreyzeous21/everletter-sdk`}
            </CodeBlock>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-semibold mb-2">PNPM</h3>
            <CodeBlock copyId="install-pnpm">
              {`pnpm add @shreyzeous21/everletter-sdk`}
            </CodeBlock>
          </div>
        </CardContent>
      </Card>

      {/* Usage Examples */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5 text-primary" />
            <CardTitle>Usage Examples</CardTitle>
          </div>
          <CardDescription>
            Choose your framework and get started in minutes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="react-component" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="react-component">React Component</TabsTrigger>
              <TabsTrigger value="react-hook">React Hook</TabsTrigger>
              <TabsTrigger value="vanilla">Vanilla JS</TabsTrigger>
            </TabsList>

            <TabsContent value="react-component" className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-2">
                  Using EverLetterTemplate Component
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  The easiest way to render templates in React. Just pass the
                  slug and variables.
                </p>
                <CodeBlock copyId="react-component-example">
                  {`import { EverLetterTemplate } from '@shreyzeous21/everletter-sdk/react';

function MyComponent() {
  return (
    <EverLetterTemplate
      slug="newsletter-template"
      variables={[
        { key: "title", value: "Welcome to Our Newsletter!" },
        { key: "description", value: "Stay updated with our latest news." },
        { key: "cta_text", value: "Subscribe Now" },
        { key: "cta_url", value: "https://example.com/subscribe" },
      ]}
      baseUrl="${baseUrl}"
      className="newsletter-container"
      onLoad={(html) => console.log('Template loaded:', html)}
      onError={(error) => console.error('Error:', error)}
    />
  );
}`}
                </CodeBlock>
              </div>
            </TabsContent>

            <TabsContent value="react-hook" className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-2">
                  Using useEverLetterTemplate Hook
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  For more control, use the hook to manually manage loading and
                  error states.
                </p>
                <CodeBlock copyId="react-hook-example">
                  {`import { useEverLetterTemplate } from '@shreyzeous21/everletter-sdk/react';

function MyComponent() {
  const { html, loading, error, reload } = useEverLetterTemplate({
    slug: 'newsletter-template',
    variables: [
      { key: 'title', value: 'Welcome!' },
      { key: 'description', value: 'Newsletter content' },
    ],
    baseUrl: '${baseUrl}',
    autoLoad: true,
  });

  if (loading) return <div>Loading template...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={reload}>Reload Template</button>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}`}
                </CodeBlock>
              </div>
            </TabsContent>

            <TabsContent value="vanilla" className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-2">
                  Vanilla JavaScript
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Works with any JavaScript framework or vanilla JS. Perfect for
                  Vue, Angular, or plain HTML.
                </p>
                <CodeBlock copyId="vanilla-js-example" language="javascript">
                  {`import { EverLetterSDK } from '@shreyzeous21/everletter-sdk';

// Initialize SDK
const sdk = new EverLetterSDK({
  baseUrl: '${baseUrl}'
});

// Render template
async function renderTemplate() {
  try {
    const result = await sdk.renderTemplate({
      slug: 'newsletter-template',
      variables: [
        { key: 'title', value: 'Welcome to Our Newsletter!' },
        { key: 'description', value: 'Stay updated with our latest news.' },
        { key: 'cta_text', value: 'Subscribe Now' },
        { key: 'cta_url', value: 'https://example.com/subscribe' },
      ],
    });

    // Insert rendered HTML into page
    document.getElementById('template-container').innerHTML = result.html;
    console.log('Template rendered:', result.name);
  } catch (error) {
    console.error('Error rendering template:', error.message);
  }
}

// Call when page loads
window.addEventListener('DOMContentLoaded', renderTemplate);`}
                </CodeBlock>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* API Reference */}
      <Card>
        <CardHeader>
          <CardTitle>API Reference</CardTitle>
          <CardDescription>
            Complete API documentation for the SDK
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* EverLetterSDK */}
          <div>
            <h3 className="text-lg font-semibold mb-2">EverLetterSDK</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Main SDK class for rendering templates and fetching data.
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-2">Constructor</h4>
                <CodeBlock copyId="sdk-constructor">
                  {`new EverLetterSDK(config?: EverLetterSDKConfig)

// Config Options:
{
  baseUrl?: string;  // Base URL for API requests (defaults to current origin)
}`}
                </CodeBlock>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-semibold mb-2">
                  renderTemplate(options)
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Renders a template with variables.
                </p>
                <CodeBlock copyId="sdk-render">
                  {`await sdk.renderTemplate({
  slug: string,              // Template slug (required)
  variables?: Array<{        // Template variables (optional)
    key: string;
    value: string;
  }>,
  baseUrl?: string           // Override base URL (optional)
})

// Returns: Promise<{
//   slug: string;
//   name: string;
//   html: string;
// }>`}
                </CodeBlock>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-semibold mb-2">getTemplates()</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Gets all available templates.
                </p>
                <CodeBlock copyId="sdk-get-all">
                  {`await sdk.getTemplates(baseUrl?: string)

// Returns: Promise<Template[]>`}
                </CodeBlock>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-semibold mb-2">getTemplate(slug)</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Gets a specific template by slug.
                </p>
                <CodeBlock copyId="sdk-get-one">
                  {`await sdk.getTemplate(slug: string, baseUrl?: string)

// Returns: Promise<Template>`}
                </CodeBlock>
              </div>
            </div>
          </div>

          <Separator />

          {/* React Components */}
          <div>
            <h3 className="text-lg font-semibold mb-2">React Components</h3>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-2">
                  &lt;EverLetterTemplate /&gt;
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  React component that automatically renders a template.
                </p>
                <CodeBlock copyId="react-component-props">
                  {`<EverLetterTemplate
  slug: string                    // Required: Template slug
  variables?: TemplateVariable[]   // Optional: Template variables
  baseUrl?: string                 // Optional: Base URL
  className?: string               // Optional: CSS class
  loadingComponent?: ReactNode      // Optional: Custom loading UI
  errorComponent?: (error) => ReactNode  // Optional: Custom error UI
  onLoad?: (html: string) => void  // Optional: Load callback
  onError?: (error) => void        // Optional: Error callback
  autoLoad?: boolean               // Optional: Auto-load on mount (default: true)
/>`}
                </CodeBlock>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-semibold mb-2">
                  useEverLetterTemplate(options)
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  React hook for manual template control.
                </p>
                <CodeBlock copyId="react-hook-return">
                  {`const {
  html: string,                    // Rendered HTML
  loading: boolean,                // Loading state
  error: RenderTemplateError | null,  // Error object
  loadTemplate: () => Promise<void>,   // Manually load template
  reload: () => Promise<void>     // Reload template
} = useEverLetterTemplate({
  slug: string,                    // Required: Template slug
  variables?: TemplateVariable[],  // Optional: Template variables
  baseUrl?: string,                // Optional: Base URL
  autoLoad?: boolean               // Optional: Auto-load (default: true)
});`}
                </CodeBlock>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Handling */}
      <Card>
        <CardHeader>
          <CardTitle>Error Handling</CardTitle>
          <CardDescription>
            All methods throw RenderTemplateError objects with proper error
            handling
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeBlock copyId="error-handling">
            {`try {
  const result = await sdk.renderTemplate({
    slug: 'newsletter-template',
    variables: [{ key: 'title', value: 'Welcome!' }],
  });
} catch (error) {
  // error.status: HTTP status code (404, 403, 500, etc.)
  // error.message: Error message string
  console.error('Status:', error.status);
  console.error('Message:', error.message);
}`}
          </CodeBlock>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20 dark:border-green-800">
        <CardHeader>
          <CardTitle>Ready to Get Started?</CardTitle>
          <CardDescription>
            Check out the examples in the SDK directory or visit our GitHub
            repository for more information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>
              📦 <strong>SDK Location:</strong> <code>sdk/</code> directory
            </p>
            <p>
              📖 <strong>Full Documentation:</strong>{" "}
              <code>sdk/README.md</code>
            </p>
            <p>
              💡 <strong>Examples:</strong> <code>sdk/examples/</code> directory
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

