// app/api/ideas/[id]/pulse/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

type IdeaRow = {
  id: string;
  pulse: number | null;
  hive_id: string | null;
  title: string | null;
  slug: string | null;
};

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

  // 1) читаємо поточне значення + hive_id + title/slug для snapshot
  const { data: ideaRaw, error: ideaError } = await supabase
    .from("ideas")
    .select("id, pulse, hive_id, title, slug")
    .eq("id", id)
    .single();

  if (ideaError || !ideaRaw) {
    console.error("pulse: idea not found or select error:", ideaError);
    return NextResponse.json(
      { ok: false, error: "Idea not found" },
      { status: 404 }
    );
  }

  const idea = ideaRaw as IdeaRow;

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

  const { error: eventError } = await supabase.from("pulse_events").insert({
    idea_id: id,
    hive_id: idea.hive_id ?? null,
    delta,
    source: "ui", // зараз усе йде з інтерфейсу
    user_id: null, // додамо пізніше, коли буде auth
    agent_id: null, // для Bee-агентів
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
    // але pulse уже оновлений, тому не ламаємо відповідь
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
