'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { FiArrowRight, FiClock, FiTag, FiSearch } from 'react-icons/fi';
import { blogService } from '@/lib/services/blog';
import type { BlogPost, BlogCategory } from '@/lib/services/blog';
import { SearchForm } from '@/components/blog/SearchForm';
import { Pagination } from '@/components/blog/Pagination';
import { BlogLoader } from '@/components/blog/BlogLoader';

// Memoize SearchForm to prevent unnecessary remounts
const MemoizedSearchForm = memo(SearchForm);

export default function Blog() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [posts, setPosts] = useState<(BlogPost & { blog_categories: BlogCategory })[]>([]);
  const [categories, setCategories] = useState<(BlogCategory & { post_count: number })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const currentCategory = searchParams.get('category') || undefined;
  const currentSearch = searchParams.get('search') || undefined;
  const currentTag = searchParams.get('tag') || undefined;
  const currentPage = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;

  const updateFilters = useCallback((updates: { 
    category?: string; 
    search?: string; 
    tag?: string;
    page?: number;
  }) => {
    // Prevent empty updates that would clear filters
    if (Object.keys(updates).length === 0 && searchParams.toString() === '') {
      return;
    }

    // If it's an empty search but we have other filters, ignore it
    if (Object.keys(updates).length === 1 && 
        'search' in updates && 
        updates.search === '' && 
        (searchParams.get('tag') || searchParams.get('category'))) {
      return;
    }

    const params = new URLSearchParams();

    if (updates.tag) {
      params.set('tag', updates.tag);
    } else if (updates.category) {
      params.set('category', updates.category);
    } else if (updates.search) {
      params.set('search', updates.search);
    }

    if (updates.page && updates.page > 1) {
      params.set('page', updates.page.toString());
    }

    const query = params.toString();
    const url = `${pathname}${query ? `?${query}` : ''}`;
    router.push(url);
  }, [router, pathname, searchParams]);

  // Load categories only once on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await blogService.getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };

    loadCategories();
  }, []);

  // Load posts when filters change
  useEffect(() => {
    let ignore = false;

    const loadPosts = async () => {
      try {
        setIsLoading(true);
        const postsData = await blogService.getPosts({
          category: currentCategory,
          search: currentSearch,
          tag: currentTag,
          page: currentPage
        });
        
        if (!ignore) {
          setPosts(postsData.posts);
          setTotalPages(postsData.totalPages);
        }
      } catch (error) {
        console.error('Error loading posts:', error);
        if (!ignore) {
          setError(error instanceof Error ? error.message : 'Failed to load blog posts');
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    loadPosts();

    return () => {
      ignore = true;
    };
  }, [currentCategory, currentSearch, currentTag, currentPage]);

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
          Error loading blog posts
        </h2>
        <p className="text-gray-600 dark:text-gray-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Blog</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-12">
          Thoughts, tutorials, and insights about programming, AI, and technology.
        </p>

        {/* Search form */}
        <div className="mb-8">
          <MemoizedSearchForm 
            initialSearch={currentSearch}
            initialCategory={currentCategory}
            categories={categories}
            onSearch={(search) => updateFilters({ search })}
            onCategory={(category) => updateFilters({ category })}
          />
        </div>

        {/* Filter by category */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex gap-2">
            <button
              onClick={() => updateFilters({})}
              className={`px-4 py-2 text-sm font-medium rounded-full ${
                !currentCategory && !currentSearch && !currentTag
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              } whitespace-nowrap transition-colors`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => updateFilters({ category: category.id.toString() })}
                className={`px-4 py-2 text-sm font-medium rounded-full ${
                  currentCategory === category.id.toString()
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                } whitespace-nowrap transition-colors`}
              >
                {category.name} ({category.post_count})
              </button>
            ))}
          </div>
        </div>

        {/* Blog posts */}
        {isLoading ? (
          <BlogLoader />
        ) : (
          <div className="space-y-12">
            {posts.map((post) => (
              <article 
                key={post.id} 
                className="border-b border-gray-200 dark:border-gray-800 pb-10 animate-fade-in"
              >
                <div className="mb-4 flex items-center text-sm text-gray-600 dark:text-gray-400 gap-4">
                  {post.published_at && (
                    <time dateTime={post.published_at}>
                      {new Date(post.published_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  )}
                  <div className="flex items-center gap-1">
                    <FiClock className="h-4 w-4" />
                    <span>{post.reading_time}</span>
                  </div>
                </div>
                
                <Link href={`/blog/${post.slug}`} className="block group">
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {post.excerpt}
                  </p>
                </Link>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags?.map((tag: string, index: number) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        updateFilters({ tag });
                      }}
                      className={`inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full 
                        ${currentTag === tag 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                        } transition-colors`}
                    >
                      <FiTag className="h-3 w-3" />
                      {tag}
                    </button>
                  ))}
                </div>
                
                <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-blue-600 dark:text-blue-500 font-medium group-hover:underline">
                  <span>Read more</span>
                  <FiArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {posts.length > 0 && (
          <div className="mt-12">
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              category={currentCategory}
              search={currentSearch}
              tag={currentTag}
            />
          </div>
        )}
      </div>
    </div>
  );
} 