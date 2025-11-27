// app/api/ideas/[id]/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { ok: false, error: "Idea id is required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("ideas")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error("GET /api/ideas/[id] error:", error);
    return NextResponse.json(
      { ok: false, error: "Idea not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(data, { status: 200 });
}
