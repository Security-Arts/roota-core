// app/api/ideas/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await supabase
    .from('ideas')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('GET /api/ideas error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ideas: data ?? [] });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description } = body;

    if (!title || typeof title !== 'string') {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('ideas')
      .insert({
        title,
        description: description || null,
        author: 'anon', // потім підчепимо реального юзера
      })
      .select('*')
      .single();

    if (error) {
      console.error('POST /api/ideas error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ idea: data }, { status: 201 });
  } catch (e: any) {
    console.error('POST /api/ideas exception:', e);
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}
