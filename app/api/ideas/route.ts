// app/api/ideas/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// 1. Ініціалізація клієнта Supabase через env (ти вже мав їх на проекті)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string // service role бо POST вставляє
)

// GET /api/ideas  -> повертає всі ідеї
export async function GET() {
  const { data, error } = await supabase
    .from('ideas')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('GET /ideas error:', error)
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true, ideas: data }, { status: 200 })
}


// POST /api/ideas -> створює нову ідею
// очікує body: { title, description, author }
export async function POST(req: Request) {
  const body = await req.json()

  // мінімальна валідація
  if (!body.title) {
    return NextResponse.json(
      { ok: false, error: 'title is required' },
      { status: 400 }
    )
  }

  const { data, error } = await supabase
    .from('ideas')
    .insert([
      {
        title: body.title,
        description: body.description ?? null,
        author: body.author ?? null,
        proof_hash: body.proof_hash ?? null,
        pulse: body.pulse ?? 0
      }
    ])
    .select('*')
    .single()

  if (error) {
    console.error('POST /ideas error:', error)
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json(
    { ok: true, idea: data },
    { status: 201 }
  )
}
