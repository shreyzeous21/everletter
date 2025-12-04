import TemplateManager from "@/components/dashboard/templates/TemplateManager";
import { getServerAuth } from "@/lib/getServerSession";
import React from "react";

export default async function page() {
  await getServerAuth();
  return <TemplateManager />;
}
