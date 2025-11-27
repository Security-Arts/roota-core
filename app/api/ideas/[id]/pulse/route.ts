// app/api/ideas/[id]/pulse/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(
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

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const delta = Number(body?.delta);
  if (delta !== 1 && delta !== -1) {
    return NextResponse.json(
      { ok: false, error: "delta must be +1 or -1" },
      { status: 400 }
    );
  }

  const { data: idea, error: ideaError } = await supabase
    .from("ideas")
    .select("id, pulse")
    .eq("id", id)
    .single();

  if (ideaError || !idea) {
    console.error("pulse: idea not found or select error:", ideaError);
    return NextResponse.json(
      { ok: false, error: "Idea not found" },
      { status: 404 }
    );
  }

  const currentPulse = idea.pulse ?? 0;
  const newPulse = currentPulse + delta;

  const { error: updateError } = await supabase
    .from("ideas")
    .update({ pulse: newPulse })
    .eq("id", id);

  if (updateError) {
    console.error("pulse: update error:", updateError);
    return NextResponse.json(
      { ok: false, error: "Failed to update pulse" },
      { status: 500 }
    );
  }

  const { error: eventError } = await supabase
    .from("pulse_events")
    .insert({
      idea_id: id,
      delta,
    });

  if (eventError) {
    console.error(
      "pulse: event insert error (pulse updated anyway):",
      eventError
    );
  }

  return NextResponse.json(
    {
      ok: true,
      idea_id: id,
      pulse: newPulse,
    },
    { status: 200 }
  );
}
