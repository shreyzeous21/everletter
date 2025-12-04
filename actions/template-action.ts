"use server";

import { Role } from "@/lib/generated/prisma/enums";
import { getServerSession } from "@/lib/getServerSession";
import prisma from "@/lib/prisma";

export async function createTemplate(data: {
  name: string;
  thumbnail?: string;
  category?: string;
  html: string;
  slug: string;
  proOnly?: boolean;
  isPublished?: boolean;
  variables?: Record<string, any>;
}) {
  try {
    const session = await getServerSession();
    if (!session || session.user.role == Role.USER) {
      throw new Error("You are not authorized to create a template");
    }

    if (!data.name || !data.html) {
      throw new Error("Name and HTML are required");
    }

    return await prisma.template.create({
      data: {
        name: data.name,
        slug: data.slug,
        thumbnail: data.thumbnail,
        category: data.category,
        html: data.html,
        proOnly: data.proOnly,
        isPublished: data.isPublished,
        variables: data.variables,
      },
    });
  } catch (error) {
    console.error("Template creation failed:", error);
    throw new Error("Failed to create template. Please try again later.");
  }
}

export async function getAllTemplates() {
  try {
    return await prisma.template.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        thumbnail: true,
        html: true,
        category: true,
        slug: true,
        proOnly: true,
        variables: true,
        isPublished: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  } catch (error) {
    console.error("Failed to get all templates:", error);
    throw new Error("Failed to get all templates. Please try again later.");
  }
}

export async function getTemplateById(id: string) {
  try {
    const template = await prisma.template.findUnique({
      where: { id },
    });

    return template;
  } catch (error) {
    console.error("Failed to get template by id:", error);
    throw new Error("Failed to get template by id. Please try again later.");
  }
}

export async function getTemplateBySlug(slug: string) {
  try {
    return await prisma.template.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        html: true,
        slug: true,
        proOnly: true,
      },
    });
  } catch (error) {
    console.error("Failed to get template by slug:", error);
    throw new Error("Failed to get template by slug. Please try again later.");
  }
}

export async function updateTemplate(data: {
  id: string;
  name: string;
  thumbnail?: string;
  category?: string;
  html: string;
  slug: string;
  isPublished?: boolean;
  proOnly?: boolean;
  variables?: Record<string, any>;
}) {
  try {
    const session = await getServerSession();
    if (!session || session.user.role == Role.USER) {
      throw new Error("You are not authorized to update a template");
    }

    if (!data.id || !data.name || !data.html) {
      throw new Error("ID, name and HTML are required");
    }
    return await prisma.template.update({
      where: { id: data.id, name: data.name },
      data: {
        name: data.name,
        thumbnail: data.thumbnail,
        category: data.category,
        html: data.html,
        slug: data.slug,
        proOnly: data.proOnly,
        isPublished: data.isPublished,
        variables: data.variables,
      },
    });
  } catch (error) {
    console.error("Failed to update template:", error);
    throw new Error("Failed to update template. Please try again later.");
  }
}

export async function deleteTemplate(id: string) {
  try {
    // Step 1: Find template
    const template = await prisma.template.findUnique({
      where: { id },
      select: {
        id: true,
        isPublished: true,
      },
    });

    if (!template) {
      throw new Error("Template not found");
    }

    // Step 2: Check publish rule
    if (template.isPublished) {
      throw new Error("Template is published. You can't delete it.");
    }

    // Step 3: Delete template
    const deletedTemplate = await prisma.template.delete({
      where: { id },
    });

    return deletedTemplate;
  } catch (error: any) {
    console.error("Failed to delete template:", error);
    throw new Error(
      error.message || "Failed to delete template. Please try again later."
    );
  }
}

export async function togglePro(id: string) {
  try {
    const template = await getTemplateById(id);
    if (!template) {
      throw new Error("Template not found");
    }
    const updatedTemplate = await prisma.template.update({
      where: { id },
      data: { proOnly: !template.proOnly },
    });
    return updatedTemplate;
  } catch (error: any) {
    console.error("Failed to toggle pro:", error);
    throw new Error(
      error.message || "Failed to toggle pro. Please try again later."
    );
  }
}

export async function togglePublish(id: string) {
  try {
    const template = await getTemplateById(id);
    if (!template) {
      throw new Error("Template not found");
    }
    const updatedTemplate = await prisma.template.update({
      where: { id },
      data: { isPublished: !template.isPublished },
    });
    return updatedTemplate;
  } catch (error: any) {
    console.error("Failed to toggle publish:", error);
    throw new Error(
      error.message || "Failed to toggle publish. Please try again later."
    );
  }
}
