// app/idea/[id]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';

type Idea = {
  id: string;
  title: string;
  description: string | null;
  pulse: number;
  author: string | null;
  created_at: string;
};

export default async function IdeaPage({ params }: { params: { id: string } }) {
  const { data, error } = await supabase
    .from('ideas')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !data) {
    console.error('Idea fetch error:', error);
    notFound();
  }

  const idea = data as Idea;

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-4 flex items-center justify-between">
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-200">
            ← Back to feed
          </Link>
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-400 mb-1">Pulse</span>
            <span className="text-2xl font-semibold text-emerald-400">
              {idea.pulse ?? 0}
            </span>
          </div>
        </div>

        <h1 className="text-2xl font-semibold mb-2">{idea.title}</h1>
        <p className="text-xs text-gray-500 mb-4">
          by {idea.author || 'anon'} • {new Date(idea.created_at).toLocaleString()}
        </p>

        {idea.description && (
          <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">
            {idea.description}
          </p>
        )}

        {/* Тут далі додамо блок Proof та живий Pulse */}
      </div>
    </main>
  );
}

