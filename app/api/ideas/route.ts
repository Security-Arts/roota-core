// app/api/ideas/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("ideas")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("GET /api/ideas error:", error);
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { ok: true, ideas: data ?? [] },
    { status: 200 }
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, author, proof_hash, pulse } = body;

    if (!title || typeof title !== "string") {
      return NextResponse.json(
        { ok: false, error: "Title is required" },
        { status: 400 }
      );
    }

    if (!description || typeof description !== "string") {
      return NextResponse.json(
        { ok: false, error: "Description is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("ideas")
      .insert({
        title: title.trim(),
        description: description.trim(),
        author: author ?? null,
        proof_hash: proof_hash ?? null,
        pulse: typeof pulse === "number" ? pulse : 1,
      })
      .select("*")
      .single();

    if (error) {
      console.error("POST /api/ideas error:", error);
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { ok: true, idea: data },
      { status: 201 }
    );
  } catch (e: any) {
    console.error("POST /api/ideas exception:", e);
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 }
    );
  }
}
