import { supabase } from '../supabase';
import type { Database } from '../types';

export type BlogPost = Database['public']['Tables']['blog_posts']['Row'];
export type BlogCategory = Database['public']['Tables']['blog_categories']['Row'];

interface GetPostsParams {
  category?: string;
  tag?: string;
  search?: string;
  page?: number;
  limit?: number;
}

interface GetPostsResult {
  posts: (BlogPost & { blog_categories: BlogCategory })[];
  total: number;
  totalPages: number;
}

export const blogService = {
  async getPosts({ category, tag, search, page = 1, limit = 10 }: GetPostsParams = {}): Promise<GetPostsResult> {
    try {
      let query = supabase
        .from('blog_posts')
        .select(`
          *,
          blog_categories (
            id,
            name,
            slug,
            description
          )
        `, { count: 'exact' })
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      // Apply filters
      if (category) {
        query = query.eq('category_id', parseInt(category));
      }

      if (tag) {
        query = query.contains('tags', [tag]);
      }

      if (search) {
        query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%,content.ilike.%${search}%`);
      }

      // Apply pagination
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        posts: data as (BlogPost & { blog_categories: BlogCategory })[],
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      };
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  async getPost(id: number) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        blog_categories (
          id,
          name,
          slug,
          description
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as BlogPost & { blog_categories: BlogCategory };
  },

  async getPostBySlug(slug: string): Promise<BlogPost & { blog_categories: BlogCategory }> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          blog_categories (
            id,
            name,
            slug,
            description
          )
        `)
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) throw error;
      return data as BlogPost & { blog_categories: BlogCategory };
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  },

  async getCategories(): Promise<(BlogCategory & { post_count: number })[]> {
    try {
      const { data, error } = await supabase
        .from('blog_categories')
        .select(`
          *,
          post_count:blog_posts(count)
        `, { count: 'exact', head: false })
        .eq('blog_posts.status', 'published');

      if (error) throw error;
      
      // Filter out categories with no posts
      return data.filter(category => category.post_count > 0).sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  async getRecentPosts(limit: number = 3): Promise<(BlogPost & { blog_categories: BlogCategory })[]> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          blog_categories (
            id,
            name,
            slug,
            description
          )
        `)
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as (BlogPost & { blog_categories: BlogCategory })[];
    } catch (error) {
      console.error('Error fetching recent posts:', error);
      throw error;
    }
  },

  // Admin operations
  async createPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([post])
      .select()
      .single();

    if (error) throw error;
    return data as BlogPost;
  },

  async updatePost(id: number, post: Partial<BlogPost>) {
    const { data, error } = await supabase
      .from('blog_posts')
      .update({ ...post, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as BlogPost;
  },

  async deletePost(id: number) {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async createCategory(category: Omit<BlogCategory, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('blog_categories')
      .insert([category])
      .select()
      .single();

    if (error) throw error;
    return data as BlogCategory;
  },

  async updateCategory(id: number, category: Partial<BlogCategory>) {
    const { data, error } = await supabase
      .from('blog_categories')
      .update({ ...category, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as BlogCategory;
  },

  async deleteCategory(id: number) {
    const { error } = await supabase
      .from('blog_categories')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}; 