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
import { Copy, Check, Key } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

export default function API() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.BETTER_AUTH_URL || "https://everletter.vercel.app";

  // API Base URL - No authentication required
  const apiUrl = `${baseUrl}/api/templates`;

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
  }: {
    children: React.ReactNode;
    copyId?: string;
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

  const ResponseExample = ({ json }: { json: object }) => (
    <CodeBlock copyId={`response-${JSON.stringify(json).slice(0, 20)}`}>
      {JSON.stringify(json, null, 2)}
    </CodeBlock>
  );

  return (
    <div className="space-y-6">
      {/* API Endpoint Section */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5 text-primary" />
            <CardTitle>API Endpoint</CardTitle>
          </div>
          <CardDescription>
            Base API URL -{" "}
            <span className="font-semibold text-green-600">
              No authentication required
            </span>
            . Free to use!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <div className="flex-1 relative group">
              <div className="bg-background border rounded-lg p-4 pr-12">
                <code className="text-sm font-mono break-all select-all">
                  {apiUrl}
                </code>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-1/2 -translate-y-1/2 right-2 h-8 w-8 p-0"
                onClick={() => copyToClipboard(apiUrl, "api-url", "API URL")}
              >
                {copiedId === "api-url" ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Get All Templates */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="font-mono">
              GET -
            </Badge>
            <CardTitle className="font-mono text-lg">/api/templates</CardTitle>
          </div>
          <CardDescription>
            Retrieve all available templates from the API
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="">
            <h3 className="text-sm font-semibold mb-2">Request</h3>
            <CodeBlock copyId="get-all-request">
              {`fetch('${baseUrl}/api/templates', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`}
            </CodeBlock>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-semibold mb-2">Response</h3>
            <div className="space-y-2 mb-3">
              <Badge variant="secondary" className="font-mono">
                200 OK
              </Badge>
            </div>
            <ResponseExample
              json={{
                data: [
                  {
                    id: "clx123abc",
                    name: "Newsletter Template",
                    slug: "newsletter-template",
                    thumbnail: "https://example.com/thumb.jpg",
                    category: "Newsletter",
                    html: "<html>...</html>",
                    proOnly: false,
                    isPublished: true,
                    variables: { name: "string", email: "string" },
                    createdAt: "2024-01-15T10:30:00Z",
                    updatedAt: "2024-01-15T10:30:00Z",
                  },
                ],
              }}
            />
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-semibold mb-2">Error Responses</h3>
            <div className="space-y-3">
              <div>
                <Badge variant="destructive" className="font-mono mb-2">
                  500 Internal Server Error
                </Badge>
                <ResponseExample
                  json={{
                    message: "Failed to get templates",
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Get Template by Slug */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="font-mono">
              GET
            </Badge>
            <CardTitle className="font-mono text-lg">
              /api/templates/[slug]
            </CardTitle>
          </div>
          <CardDescription>
            Retrieve a specific template by its slug (URL-friendly identifier).{" "}
            <span className="font-semibold text-green-600">
              Free to use - no authentication required
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold mb-2">Parameters</h3>
            <div className="bg-muted p-3 rounded-lg">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <code className="font-mono text-primary">slug</code>
                  <Badge variant="outline" className="text-xs">
                    required
                  </Badge>
                  <span className="text-muted-foreground">
                    - Template slug (URL-friendly identifier, e.g.,
                    "newsletter-template")
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-semibold mb-2">Request</h3>
            <CodeBlock copyId="get-by-slug-request">
              {`fetch('${baseUrl}/api/templates/newsletter-template', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`}
            </CodeBlock>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-semibold mb-2">Response</h3>
            <div className="space-y-2 mb-3">
              <Badge variant="secondary" className="font-mono">
                200 OK
              </Badge>
            </div>
            <ResponseExample
              json={{
                id: "clx123abc",
                name: "Newsletter Template",
                slug: "newsletter-template",
                thumbnail: "https://example.com/thumb.jpg",
                category: "Newsletter",
                html: "<html>...</html>",
                proOnly: false,
                isPublished: true,
                variables: { name: "string", email: "string" },
                createdAt: "2024-01-15T10:30:00Z",
                updatedAt: "2024-01-15T10:30:00Z",
              }}
            />
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-semibold mb-2">Error Responses</h3>
            <div className="space-y-3">
              <div>
                <Badge variant="destructive" className="font-mono mb-2">
                  403 Forbidden
                </Badge>
                <ResponseExample
                  json={{
                    message: "Template is pro you cant acces it",
                  }}
                />
              </div>
              <div>
                <Badge variant="destructive" className="font-mono mb-2">
                  404 Not Found
                </Badge>
                <ResponseExample
                  json={{
                    message: "Template not found",
                  }}
                />
              </div>
              <div>
                <Badge variant="destructive" className="font-mono mb-2">
                  500 Internal Server Error
                </Badge>
                <ResponseExample
                  json={{
                    message: "Failed to get template by slug",
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Render Template */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="font-mono">
              POST
            </Badge>
            <CardTitle className="font-mono text-lg">
              /api/templates/[slug]/render
            </CardTitle>
          </div>
          <CardDescription>
            Render a template with dynamic variables. Perfect for embedding templates in your website.{" "}
            <span className="font-semibold text-green-600">
              Free to use - no authentication required
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold mb-2">Parameters</h3>
            <div className="bg-muted p-3 rounded-lg">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <code className="font-mono text-primary">slug</code>
                  <Badge variant="outline" className="text-xs">
                    required
                  </Badge>
                  <span className="text-muted-foreground">
                    - Template slug (URL-friendly identifier)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-semibold mb-2">Request Body</h3>
            <CodeBlock copyId="render-request-body">
              {`{
  "variables": [
    { "key": "title", "value": "Welcome!" },
    { "key": "description", "value": "This is a newsletter" },
    { "key": "cta_text", "value": "Get Started" },
    { "key": "cta_url", "value": "https://example.com" }
  ]
}`}
            </CodeBlock>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-semibold mb-2">Request</h3>
            <CodeBlock copyId="render-request">
              {`fetch('${baseUrl}/api/templates/newsletter-template/render', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    variables: [
      { key: 'title', value: 'Welcome!' },
      { key: 'description', value: 'This is a newsletter' },
    ],
  }),
})
  .then(response => response.json())
  .then(data => {
    // Use data.html to render the template
    document.getElementById('container').innerHTML = data.html;
  })
  .catch(error => console.error('Error:', error));`}
            </CodeBlock>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-semibold mb-2">Response</h3>
            <div className="space-y-2 mb-3">
              <Badge variant="secondary" className="font-mono">
                200 OK
              </Badge>
            </div>
            <ResponseExample
              json={{
                slug: "newsletter-template",
                name: "Newsletter Template",
                html: "<html><body><h1>Welcome!</h1><p>This is a newsletter</p></body></html>",
              }}
            />
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-semibold mb-2">Error Responses</h3>
            <div className="space-y-3">
              <div>
                <Badge variant="destructive" className="font-mono mb-2">
                  403 Forbidden
                </Badge>
                <ResponseExample
                  json={{
                    message: "Template is pro you cant acces it",
                  }}
                />
              </div>
              <div>
                <Badge variant="destructive" className="font-mono mb-2">
                  404 Not Found
                </Badge>
                <ResponseExample
                  json={{
                    message: "Template not found",
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Template Schema */}
      <Card>
        <CardHeader>
          <CardTitle>Template Schema</CardTitle>
          <CardDescription>
            The structure of a template object returned by the API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeBlock copyId="template-schema">
            {`interface Template {
  id: string;              // Unique identifier (CUID)
  name: string;            // Template name
  slug: string;            // URL-friendly identifier
  thumbnail?: string;       // Thumbnail image URL
  category?: string;       // Template category
  html: string;            // HTML content of the template
  proOnly: boolean;        // Whether template requires pro access
  isPublished: boolean;    // Publication status
  variables?: {            // Dynamic variables for template
    [key: string]: any;
  };
  createdAt: string;       // ISO 8601 timestamp
  updatedAt: string;       // ISO 8601 timestamp
}`}
          </CodeBlock>
        </CardContent>
      </Card>

      {/* SDK Section */}
      <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🚀</span>
            <span>SDK Available</span>
          </CardTitle>
          <CardDescription>
            Use our official SDK for easy integration. Works with React, Vue, and vanilla JavaScript.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold mb-2">Installation</h3>
            <CodeBlock copyId="sdk-install">
              {`npm install @shreyzeous21/everletter-sdk`}
            </CodeBlock>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-semibold mb-2">React Example</h3>
            <CodeBlock copyId="sdk-react-example">
              {`import { EverLetterTemplate } from '@shreyzeous21/everletter-sdk/react';

function MyComponent() {
  return (
    <EverLetterTemplate
      slug="newsletter-template"
      variables={[
        { key: "title", value: "Welcome!" },
        { key: "description", value: "Newsletter content" },
      ]}
      baseUrl="${baseUrl}"
    />
  );
}`}
            </CodeBlock>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-semibold mb-2">Vanilla JavaScript Example</h3>
            <CodeBlock copyId="sdk-vanilla-example">
              {`import { EverLetterSDK } from '@shreyzeous21/everletter-sdk';

const sdk = new EverLetterSDK({
  baseUrl: '${baseUrl}'
});

const result = await sdk.renderTemplate({
  slug: 'newsletter-template',
  variables: [
    { key: 'title', value: 'Welcome!' },
  ],
});

document.getElementById('container').innerHTML = result.html;`}
            </CodeBlock>
          </div>

          <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <p className="text-sm">
              📖 <strong>Full Documentation:</strong> Check out the{" "}
              <code className="text-xs bg-white dark:bg-gray-800 px-1 rounded">sdk/README.md</code>{" "}
              file for complete SDK documentation and examples.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
