'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewIdeaPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to create idea');
      } else {
        router.push(`/idea/${data.idea.id}`);
      }
    } catch (err: any) {
      setError(err.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <div className="max-w-xl mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="text-sm text-gray-400 hover:text-gray-200 mb-4"
        >
          ← Back
        </button>

        <h1 className="text-2xl font-semibold mb-4">New Idea</h1>
        <p className="text-sm text-gray-400 mb-6">
          Дай ідеї назву, короткий опис — proof та pulse додамо далі.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input
              className="w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-sm outline-none focus:border-emerald-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Energy Storage Airbnb"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              className="w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-sm outline-none focus:border-emerald-500 min-h-[120px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Маркетплейс, де власники батарей здають надлишкову ємність бізнесам..."
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-md bg-emerald-500 text-sm font-medium hover:bg-emerald-400 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Create Idea'}
          </button>
        </form>
      </div>
    </main>
  );
}
