import { getTemplateBySlug } from "@/actions/template-action";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const template = await getTemplateBySlug(slug);
    if (template?.proOnly === true) {
      return NextResponse.json(
        { message: "Template is pro you cant acces it " },
        { status: 403, headers: corsHeaders }
      );
    }

    if (!template) {
      return NextResponse.json(
        { message: "Template not found" },
        { status: 404, headers: corsHeaders }
      );
    }
    return NextResponse.json(template, { status: 200, headers: corsHeaders });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to get template by slug" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}
