// app/api/pulse/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, delta } = body as { id?: string; delta?: number };

    if (!id || typeof delta !== "number") {
      return NextResponse.json(
        { ok: false, error: "id and delta are required" },
        { status: 400 }
      );
    }

    // 1) забираємо поточний pulse
    const { data: idea, error: fetchError } = await supabase
      .from("ideas")
      .select("pulse")
      .eq("id", id)
      .single();

    if (fetchError || !idea) {
      return NextResponse.json(
        { ok: false, error: fetchError?.message || "Idea not found" },
        { status: 404 }
      );
    }

    const current = idea.pulse ?? 0;
    const nextPulse = current + delta;

    // 2) оновлюємо
    const { data: updated, error: updateError } = await supabase
      .from("ideas")
      .update({ pulse: nextPulse })
      .eq("id", id)
      .select("*")
      .single();

    if (updateError || !updated) {
      return NextResponse.json(
        { ok: false, error: updateError?.message || "Update failed" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { ok: true, idea: updated },
      { status: 200 }
    );
  } catch (e: any) {
    console.error("POST /api/pulse error:", e);
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 }
    );
  }
}

