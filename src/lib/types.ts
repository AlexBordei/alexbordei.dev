export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
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
      };
      blog_categories: {
        Row: {
          id: number;
          name: string;
          slug: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
      };
    };
  };
} 