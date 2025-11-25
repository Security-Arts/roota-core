// /lib/types.ts

export type Locale = "en" | "es" | "ja";

export type PulseFilter = "all" | "1" | "3" | "5";
export type SortKey = "pulse" | "date";
export type SortDirection = "asc" | "desc";

export interface Idea {
  id: string;
  title: string;
  description: string;
  proof_hash?: string | null;
  pulse?: number | null;
  author?: string | null;
  slug?: string | null;
  created_at: string;
}
