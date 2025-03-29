import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  published_at: string | null;
  reading_time: string | null;
  tags: string[] | null;
  author: string;
  featured_image: string | null;
  status: 'draft' | 'published';
  category_id: number | null;
  created_at: string;
  updated_at: string;
};

export type BlogCategory = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  post_count?: number;
}; 