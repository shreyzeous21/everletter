"use client";

import { EverLetterTemplate } from "@/sdk/react/EverLetterTemplate";
import { useEverLetterTemplate } from "@/sdk/react/EverLetterTemplate";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default function Showcase() {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:3000";

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>SDK Showcase</CardTitle>
          <CardDescription>
            Test the EverLetter SDK locally. Make sure you have a template with
            slug "shrey" or change it to match your template.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="component" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="component">Using Component</TabsTrigger>
              <TabsTrigger value="hook">Using Hook</TabsTrigger>
            </TabsList>

            <TabsContent value="component" className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-2">
                  Example: Using EverLetterTemplate Component
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  This component automatically loads and renders the template.
                  Change the slug and variables to match your template.
                </p>
                <div className="border rounded-lg p-4 bg-muted/50">
                  <EverLetterTemplate
                    slug="shrey"
                    variables={[
                      { key: "title", value: "Shrey" },
                      { key: "description", value: "Galgotian Buddy" },
                      { key: "cta_text", value: "Galgotian Buddy" },
                      { key: "cta_url", value: "https://www.google.com" },
                    ]}
                    baseUrl={baseUrl}
                    className="border rounded-lg p-5 bg-background"
                    onLoad={(html) => {
                      console.log("✅ Template loaded successfully!", html);
                    }}
                    onError={(error) => {
                      console.error("❌ Error loading template:", error);
                    }}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="hook" className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-2">
                  Example: Using useEverLetterTemplate Hook
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  This example uses the hook for more control over loading and
                  error states.
                </p>
                <HookExample baseUrl={baseUrl} />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Testing Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <strong>1. Make sure your dev server is running:</strong>
          </p>
          <code className="block p-2 bg-muted rounded">npm run dev</code>

          <p className="mt-4">
            <strong>2. Update the template slug:</strong>
          </p>
          <p className="text-muted-foreground">
            Change "shrey" to match one of your actual template slugs. You can
            find your templates at <code>/dashboard/templates</code>
          </p>

          <p className="mt-4">
            <strong>3. Update variables:</strong>
          </p>
          <p className="text-muted-foreground">
            Make sure the variable keys (title, description, cta_text, cta_url)
            match the variables defined in your template.
          </p>

          <p className="mt-4">
            <strong>4. Check the console:</strong>
          </p>
          <p className="text-muted-foreground">
            Open browser DevTools (F12) to see success/error messages.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// Hook Example Component
function HookExample({ baseUrl }: { baseUrl: string }) {
  const { html, loading, error, reload } = useEverLetterTemplate({
    slug: "shrey",
    variables: [
      { key: "title", value: "Shrey" },
      { key: "description", value: "Galgotian Buddy" },
      { key: "cta_text", value: "Galgotian Buddy" },
      { key: "cta_url", value: "https://www.google.com" },
    ],
    baseUrl: baseUrl,
    autoLoad: true,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button onClick={reload} size="sm" variant="outline">
          Reload Template
        </Button>
        {loading && (
          <span className="text-sm text-muted-foreground">Loading...</span>
        )}
        {error && (
          <span className="text-sm text-destructive">
            Error: {error.message} (Status: {error.status})
          </span>
        )}
        {!loading && !error && (
          <span className="text-sm text-green-600">
            ✅ Loaded successfully!
          </span>
        )}
      </div>

      <div className="border rounded-lg p-5 bg-background min-h-[200px]">
        {loading && <p>Loading template...</p>}
        {error && (
          <div className="text-destructive">
            <p>Error: {error.message}</p>
            <p className="text-sm">Status: {error.status}</p>
          </div>
        )}
        {!loading && !error && (
          <div dangerouslySetInnerHTML={{ __html: html }} />
        )}
      </div>
    </div>
  );
}
