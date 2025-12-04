"use client";

import { useEffect, useMemo } from "react";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import slugify from "slugify";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Eye, Plus, Trash2 } from "lucide-react";

import { useTemplate } from "@/hooks/use-template";

const schema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  slug: z.string().min(1),
  image: z.string().optional(),
  html: z.string().min(1),
  proOnly: z.boolean(),
  variables: z
    .array(
      z.object({
        key: z.string().min(1),
        value: z.string().optional(),
      })
    )
    .optional(),
  isPublished: z.boolean().optional(),
});

export default function TemplateEditForm({ template }: { template: any }) {
  const router = useRouter();
  const { updateTemplateMutation } = useTemplate();

  // -------------------------------
  // FIX: Make variables an array of {key, value}
  // -------------------------------
  const variablesArray: { key: string; value: string }[] = [];
  if (Array.isArray(template.variables)) {
    template.variables.forEach((v: any) => {
      variablesArray.push({ key: v.key, value: v.value || "" });
    });
  }
  if (typeof template.variables === "object" && template.variables !== null) {
    Object.entries(template.variables).forEach(([key, value]) => {
      variablesArray.push({ key, value: String(value) });
    });
  }

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: template.name,
      category: template.category,
      slug: template.slug,
      image: template.thumbnail,
      html: template.html,
      proOnly: template.proOnly,
      variables: variablesArray,
      isPublished: template.isPublished,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variables",
  });

  const watchHtml = form.watch("html");
  const watchVariables = form.watch("variables");
  const imagePreview = form.watch("image");

  useEffect(() => {
    const name = form.watch("name");
    if (name) {
      form.setValue(
        "slug",
        slugify(name, {
          lower: true,
          strict: true,
          trim: true,
          replacement: "-",
          locale: "en",
        })
      );
    }
  }, [form.watch("name")]);

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

  // Live Preview
  const htmlPreview = useMemo(() => {
    let html = watchHtml || "";

    (watchVariables || []).forEach((v) => {
      if (!v.key) return;
      html = html.replace(
        new RegExp(`{{\\s*${v.key}\\s*}}`, "g"),
        v.value || `{{${v.key}}}`
      );
    });

    return html;
  }, [watchHtml, watchVariables]);

  // update action
  async function onSubmit(data: any) {
    try {
      await updateTemplateMutation.mutateAsync({
        ...data,
        thumbnail: data.image,
        id: template.id,
      });

      router.push("/dashboard/templates");
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
      {/* LEFT = FORM */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Edit Template</CardTitle>
            <CardDescription>
              Update fields & see changes in live preview
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
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                          <Input {...field} />
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
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Thumbnail */}
                <FormField
                  control={form.control}
                  name="image"
                  render={() => (
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

                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-48 mt-3 rounded-lg object-cover border shadow"
                        />
                      )}

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* HTML */}
                <FormField
                  control={form.control}
                  name="html"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>HTML Template</FormLabel>
                      <FormControl>
                        <Textarea rows={12} {...field} className="font-mono" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* PRO */}
                <FormField
                  control={form.control}
                  name="proOnly"
                  render={({ field }) => (
                    <FormItem className="flex justify-between p-4 border rounded-lg">
                      <div>
                        <FormLabel>Pro Template</FormLabel>
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

                {/* VARIABLES */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Template Variables
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {fields.map((field, index) => (
                      <div className="flex gap-3" key={field.id}>
                        <Input
                          placeholder="key"
                          {...form.register(`variables.${index}.key`)}
                        />
                        <Input
                          placeholder="value"
                          {...form.register(`variables.${index}.value`)}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => remove(index)}
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

                {/* SUBMIT */}
                <Button type="submit" className="w-full">
                  Save Changes
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {/* RIGHT = LIVE PREVIEW */}
      <div className="lg:sticky lg:top-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              <CardTitle>Live Preview</CardTitle>
            </div>
          </CardHeader>

          <CardContent>
            <iframe
              className="w-full h-[700px] border rounded-xl shadow"
              srcDoc={htmlPreview}
              sandbox="allow-scripts"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
