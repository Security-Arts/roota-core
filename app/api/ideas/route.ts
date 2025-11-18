// app/api/ideas/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("ideas")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching ideas:", error);
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, ideas: data ?? [] });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, proof_hash, author, pulse } = body || {};

    if (!title || !description || !proof_hash) {
      return NextResponse.json(
        {
          ok: false,
          error: "title, description and proof_hash are required",
        },
        { status: 400 }
      );
    }

    const insertPayload = {
      title,
      description,
      proof_hash,
      author: author || null,
      pulse: typeof pulse === "number" ? pulse : 1,
    };

    const { data, error } = await supabase
      .from("ideas")
      .insert([insertPayload])
      .select()
      .single();

    if (error) {
      console.error("Error inserting idea:", error);
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, idea: data }, { status: 201 });
  } catch (e: any) {
    console.error("Error in POST /api/ideas:", e);
    return NextResponse.json(
      { ok: false, error: e?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
