import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published_at: string | null;
  reading_time: string;
  tags: string[];
  author: string;
  featured_image?: string | null;
  status: 'draft' | 'published';
  category_id: number;
  created_at: string;
  updated_at: string;
};

export type BlogCategory = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
  updated_at: string;
}; 