import React from "react";
import CardWrapper from "@/components/dashboard/CardWrapper";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import TemplateEditForm from "@/components/dashboard/templates/TemplateEditForm";

export default async function EditTemplatePage({
  searchParams,
}: {
  searchParams: Promise<{ slug: string }>;
}) {
  const { slug } = await searchParams;

  const template = await prisma.template.findFirst({
    where: { slug },
  });

  return (
    <CardWrapper title="Templates / Edit Template">
      <div className="p-4 border-b">
        <Link href="/dashboard/templates">
          <Button variant="outline" size="sm">
            <ArrowLeftIcon className="w-4 h-4" /> Go Back{" "}
          </Button>
        </Link>
      </div>
      <div className="p-4">
        <TemplateEditForm template={template} />
      </div>
    </CardWrapper>
  );
}
