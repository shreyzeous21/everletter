import CardWrapper from "@/components/dashboard/CardWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { ArrowLeftIcon, XCircleIcon, CheckCircleIcon } from "lucide-react";

import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ slug: string }>;
}) {
  const { slug } = await searchParams;
  const slugValue = Array.isArray(slug) ? slug[0] : slug;

  const template = await prisma.template.findFirst({
    where: { slug: slugValue },
  });

  if (!template) {
    return (
      <CardWrapper title="Template Not Found">
        <div className="p-4">Template not found.</div>
      </CardWrapper>
    );
  }

  // -------------------------------
  // FIX 1: variables are an ARRAY
  // -------------------------------
  // -------------------------------
  // FIX: Make variables an array of {key, value}
  // -------------------------------
  const variablesArray: { key: string; value: string }[] = [];

  if (Array.isArray(template.variables)) {
    // already array of {key, value}
    template.variables.forEach((v: any) => {
      variablesArray.push({ key: v.key, value: v.value || "" });
    });
  } else if (
    typeof template.variables === "object" &&
    template.variables !== null
  ) {
    // convert object {title: "Shrey"} to array
    Object.entries(template.variables).forEach(([key, value]) => {
      variablesArray.push({ key, value: String(value) });
    });
  }

  // -------------------------------
  // FIX 2: Replace {{variable}} correctly
  // -------------------------------
  function replaceVariables(
    html: string,
    variables: { key: string; value: string }[]
  ) {
    let output = html;

    variables.forEach((v) => {
      if (!v.key) return;
      const regex = new RegExp(`{{\\s*${v.key}\\s*}}`, "g");
      output = output.replace(regex, v.value || `{{${v.key}}}`);
    });

    return output;
  }

  const processedHtml = replaceVariables(template.html, variablesArray);

  return (
    <CardWrapper title={`Template / ${template.name}`}>
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <Link href="/dashboard/templates">
          <Button variant="outline" size="sm">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </Link>
      </div>

      {/* Body */}
      <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT – Template Details */}
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-xl">{template.name}</h2>
              <Badge
                variant={template.isPublished ? "default" : "destructive"}
                className="text-sm font-normal flex items-center gap-2 px-2 py-1"
              >
                {template.isPublished ? (
                  <CheckCircleIcon className="w-4 h-4" />
                ) : (
                  <XCircleIcon className="w-4 h-4" />
                )}
                {template.isPublished ? "Published" : "Unpublished"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{template.category}</p>

            <p className="mt-3">
              <strong>Slug:</strong> {template.slug}
            </p>

            <p className="mt-3">
              <strong>Type:</strong>{" "}
              {template.proOnly ? "Pro Template" : "Free Template"}
            </p>

            <p className="mt-3">
              <strong>Created:</strong>{" "}
              {new Date(template.createdAt).toLocaleString()}
            </p>

            <p className="mt-1">
              <strong>Updated:</strong>{" "}
              {new Date(template.updatedAt).toLocaleString()}
            </p>
          </div>

          {/* Thumbnail */}
          {template.thumbnail && (
            <div className="border rounded-lg overflow-hidden">
              <img
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          {/* Variables */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3">Variables</h3>

            {variablesArray.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No variables found
              </p>
            ) : (
              <div className="space-y-2">
                {variablesArray.map((v: any) => (
                  <div
                    key={v.key}
                    className="flex justify-between border p-2 rounded-md"
                  >
                    <strong>{v.key}</strong>
                    <span className="text-sm break-all">{v.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — HTML PREVIEW */}
        <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
          <iframe
            className="w-full h-[900px]"
            srcDoc={
              processedHtml ||
              "<p style='text-align:center; padding:20px; color:#aaa;'>No HTML Found</p>"
            }
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </CardWrapper>
  );
}
