import { getTemplateBySlug } from "@/actions/template-action";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { variables = [] }: { variables: { key: string; value: string }[] } =
    await req.json();

  const template = await getTemplateBySlug(slug);

  if (!template) {
    return NextResponse.json(
      { message: "Template not found" },
      { status: 404, headers: corsHeaders }
    );
  }

  if (template.proOnly === true) {
    return NextResponse.json(
      { message: "Template is pro you cant acces it " },
      { status: 403, headers: corsHeaders }
    );
  }

  let html = template.html;

  variables.forEach((v: any) => {
    const regex = new RegExp(`{{\\s*${v.key}\\s*}}`, "g");
    html = html.replace(regex, v.value || `{{${v.key}}}`);
  });

  return NextResponse.json(
    {
      slug: template.slug,
      name: template.name,
      html,
    },
    { status: 200, headers: corsHeaders }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}
