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
  technology?: string;
  search?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}

export const projectService = {
  async getProjects({ 
    category,
    technology,
    search,
    featured,
    page = 1,
    limit = 9
  }: GetProjectsParams = {}) {
    try {
      let query = supabase
        .from('projects')
        .select(`
          *,
          project_categories (
            name
          )
        `, { count: 'exact' });

      if (category) {
        query = query.eq('project_categories.name', category);
      }

      if (technology) {
        query = query.contains('technologies', [technology]);
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

      const { data, count, error } = await query
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      const projects = data?.map(project => ({
        ...project,
        category: project.project_categories?.name
      }));

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
  },

  async getTechnologies() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('technologies');

      if (error) throw error;

      // Flatten and deduplicate technologies
      const technologies = [...new Set(
        data?.flatMap(project => project.technologies || [])
      )].sort();

      return technologies;
    } catch (error) {
      console.error('Error fetching project technologies:', error);
      throw error;
    }
  }
}; 