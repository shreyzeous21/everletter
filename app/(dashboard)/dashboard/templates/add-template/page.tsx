import CardWrapper from "@/components/dashboard/CardWrapper";
import TemplateCreateForm from "@/components/dashboard/templates/TemplateCreateForm";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <CardWrapper title="Templates / Create Template">
      <div className="p-4 border-b">
        <Link href="/dashboard/templates">
          <Button variant="outline" size="sm">
            <ArrowLeftIcon className="w-4 h-4" /> Go Back{" "}
          </Button>
        </Link>
      </div>
      <div className="p-4">
        <TemplateCreateForm />
      </div>
    </CardWrapper>
  );
}
