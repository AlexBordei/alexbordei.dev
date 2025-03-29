import { supabase } from '@/lib/supabase';

export interface Project {
  id: number;
  title: string;
  description: string;
  long_description: string;
  technologies: string[];
  image_url: string;
  github_url?: string;
  live_url?: string;
  featured: boolean;
  category: string;
  created_at: string;
  updated_at: string;
}

interface GetProjectsParams {
  category?: string;
  search?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}

export const projectService = {
  async getProjects({ 
    category,
    search,
    featured,
    page = 1,
    limit = 9
  }: GetProjectsParams = {}) {
    try {
      let query = supabase
        .from('projects')
        .select('*', { count: 'exact' });

      if (category && category !== 'All') {
        query = query.eq('category', category);
      }

      if (search) {
        query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
      }

      if (featured !== undefined) {
        query = query.eq('featured', featured);
      }

      // Add pagination
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      const { data: projects, count, error } = await query
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      const totalPages = count ? Math.ceil(count / limit) : 0;

      return {
        projects: projects as Project[],
        total: count || 0,
        totalPages
      };
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  async getCategories() {
    try {
      const { data: categories, error } = await supabase
        .from('project_categories')
        .select('*');

      if (error) throw error;
      return categories;
    } catch (error) {
      console.error('Error fetching project categories:', error);
      throw error;
    }
  }
}; 