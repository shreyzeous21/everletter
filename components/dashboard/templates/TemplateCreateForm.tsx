"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useForm, Controller, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTemplate } from "@/hooks/use-template";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Eye } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import slugify from "slugify";
// Validation Schema
const createTemplateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  html: z.string().min(1, "HTML template is required"),
  slug: z.string().min(1, "Slug is required"),
  image: z.string().min(1, "Thumbnail is required"),
  proOnly: z.boolean(),
  variables: z
    .array(
      z.object({
        key: z.string().min(1, "Variable key is required"),
        value: z.string().optional(),
      })
    )
    .optional(),
  isPublished: z.boolean().optional(),
});

type CreateTemplateValues = z.infer<typeof createTemplateSchema>;

export default function TemplateCreatePageForm() {
  const { createTemplateMutation } = useTemplate();
  const router = useRouter();

  // Auto-generate slug from name

  const form = useForm<CreateTemplateValues>({
    resolver: zodResolver(createTemplateSchema),
    defaultValues: {
      name: "",
      category: "",
      html: "",
      image: "",
      slug: "",
      proOnly: false,
      variables: [],
      isPublished: true,
    },
  });

  useEffect(() => {
    const name = form.watch("name");

    if (name) {
      const slug = slugify(name, {
        lower: true,
        strict: true,
        trim: true,
      });

      form.setValue("slug", slug, { shouldDirty: true });
    }
  }, [form.watch("name")]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variables",
  });

  const watchHtml = form.watch("html");
  const watchVariables = form.watch("variables");
  const imagePreview = form.watch("image");
  const loading = form.formState.isSubmitting;

  // Live HTML preview with variable replacement
  const htmlPreview = useMemo(() => {
    let processedHtml = watchHtml;

    // Replace {{variableKey}} with actual values in real-time
    watchVariables?.forEach((variable) => {
      if (variable.key) {
        const regex = new RegExp(`{{\\s*${variable.key}\\s*}}`, "g");
        processedHtml = processedHtml.replace(
          regex,
          variable.value || `{{${variable.key}}}`
        );
      }
    });

    return processedHtml;
  }, [watchHtml, watchVariables]);

  // Image uploader
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () =>
      form.setValue("image", reader.result as string, { shouldDirty: true });

    reader.readAsDataURL(file);
  }

  // Submit Handler
  async function onSubmit(data: CreateTemplateValues) {
    try {
      const variablesObj: Record<string, any> = {};
      data.variables?.forEach((v) => (variablesObj[v.key] = v.value));

      await createTemplateMutation.mutateAsync({
        name: data.name,
        category: data.category,
        html: data.html,
        proOnly: data.proOnly,
        slug: data.slug || slugify(data.name, { lower: true, strict: true, trim: true }),
        thumbnail: data.image || "",
        variables: variablesObj,
      });

      form.reset();
      router.push("/dashboard/templates");
    } catch (err: any) {
      toast.error(err.message || "Failed to create template");
    }
  }

  return (
    <div className="mx-auto ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Section → Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Template</CardTitle>
              <CardDescription>
                Use {`{{variableName}}`} syntax in HTML to create dynamic
                variables
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Name + Category */}
                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Template Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Newsletter Template"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Business, Tech, Finance..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Slug</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="auto-generated-slug"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Thumbnail */}
                  <FormItem>
                    <FormLabel>Thumbnail</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="cursor-pointer"
                      />
                    </FormControl>
                    <FormMessage />

                    {imagePreview && (
                      <div className="relative mt-3">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-48 rounded-lg border object-cover shadow-sm"
                        />
                      </div>
                    )}
                  </FormItem>

                  {/* HTML Editor */}
                  <FormField
                    control={form.control}
                    name="html"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>HTML Template</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={12}
                            placeholder={`<div>\n  <h1>{{title}}</h1>\n  <p>{{description}}</p>\n</div>`}
                            className="resize-none font-mono text-sm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Pro Toggle */}
                  <FormField
                    control={form.control}
                    name="proOnly"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Pro Template
                          </FormLabel>
                          <p className="text-sm text-muted-foreground">
                            Only available for premium users
                          </p>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Published Toggle */}

                  <FormField
                    control={form.control}
                    name="isPublished"
                    render={({ field }) => (
                      <FormItem className="flex justify-between p-4 border rounded-lg">
                        <div>
                          <FormLabel>Published</FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Variables */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Template Variables
                      </CardTitle>
                      <CardDescription>
                        Define variables that will be replaced in the HTML
                        preview
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {fields.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No variables yet. Add one to get started!
                        </p>
                      )}

                      {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-3 items-start">
                          <div className="flex-1">
                            <Controller
                              control={form.control}
                              name={`variables.${index}.key`}
                              render={({ field, fieldState }) => (
                                <div>
                                  <Input
                                    {...field}
                                    placeholder="title"
                                    className={
                                      fieldState.error ? "border-red-500" : ""
                                    }
                                  />
                                  {fieldState.error && (
                                    <p className="text-xs text-red-500 mt-1">
                                      {fieldState.error.message}
                                    </p>
                                  )}
                                </div>
                              )}
                            />
                          </div>

                          <div className="flex-1">
                            <Controller
                              control={form.control}
                              name={`variables.${index}.value`}
                              render={({ field }) => (
                                <Input {...field} placeholder="Default value" />
                              )}
                            />
                          </div>

                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(index)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => append({ key: "", value: "" })}
                        className="w-full"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Variable
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Submit */}
                  <Button
                    disabled={loading}
                    type="submit"
                    className="w-full"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>Create Template</>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Right Section → Live HTML Preview */}
        <div className="lg:sticky lg:top-6 h-fit">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                <CardTitle>Live Preview</CardTitle>
              </div>
              <CardDescription>
                Variables update in real-time as you type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden bg-white shadow-inner">
                <iframe
                  className="w-full h-[700px]"
                  srcDoc={
                    htmlPreview ||
                    "<p style='text-align:center; color:#888; padding:20px;'>Start typing HTML to see preview...</p>"
                  }
                  sandbox="allow-scripts"
                  title="HTML Preview"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
