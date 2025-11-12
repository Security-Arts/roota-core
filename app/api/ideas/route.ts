// app/api/ideas/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic' // не дає Next збирати це статично

function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY // лишається лише на сервері
  if (!url || !key) return null
  return createClient(url, key)
}

// GET /api/ideas
export async function GET() {
  const supabase = getServerSupabase()
  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: 'Server not configured' },
      { status: 500 }
    )
  }

  const { data, error } = await supabase
    .from('ideas')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('GET /ideas error:', error)
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true, ideas: data }, { status: 200 })
}

// POST /api/ideas
export async function POST(req: Request) {
  const supabase = getServerSupabase()
  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: 'Server not configured' },
      { status: 500 }
    )
  }

  const body = await req.json()
  if (!body?.title) {
    return NextResponse.json({ ok: false, error: 'title is required' }, { status: 400 })
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
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true, idea: data }, { status: 201 })
}
