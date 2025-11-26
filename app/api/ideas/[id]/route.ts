// app/api/ideas/[id]/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const { data, error } = await supabase
    .from("ideas")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("GET /api/ideas/[id] error:", error);
    return NextResponse.json(
      { ok: false, error: "Idea not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { ok: true, idea: data },
    { status: 200 }
  );
}
