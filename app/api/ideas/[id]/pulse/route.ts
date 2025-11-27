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

  // 1) читаємо поточне значення + hive_id
  const { data: idea, error: ideaError } = await supabase
    .from("ideas")
    .select("id, pulse, hive_id")
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

  // 2) оновлюємо поле pulse в ideas
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

  // 3) логуємо подію в pulse_events
  const userAgent = req.headers.get("user-agent") ?? null;
const { error: eventError } = await supabase
  .from("pulse_events")
  .insert({
    idea_id: id,
    hive_id: idea.hive_id ?? null,
    delta,
    source: "ui",     // теперішнє джерело
    user_id: null,    // додамо після auth
    agent_id: null,   // для майбутніх Bee-агентів
    context: {
      user_agent: userAgent,
      via: "roota-core-ui",
    },
    idea_title_snapshot: idea.title,
    idea_slug_snapshot: idea.slug,
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
