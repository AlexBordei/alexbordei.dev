import { notFound } from 'next/navigation';
import { FiClock, FiTag, FiArrowLeft, FiFolder } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import { blogService } from '@/lib/services/blog';
import { type BlogPost, type BlogCategory } from '@/lib/supabase';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPost({ params }: BlogPostPageProps) {
  let post: BlogPost & { blog_categories: BlogCategory };
  
  try {
    post = await blogService.getPostBySlug(params.slug);
  } catch (error) {
    notFound();
  }

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/blog"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-8"
        >
          <FiArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>

        <article>
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <time dateTime={post.published_at || ''}>
                {post.published_at && new Date(post.published_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <div className="flex items-center gap-1">
                <FiClock className="h-4 w-4" />
                <span>{post.reading_time}</span>
              </div>
              <div className="flex items-center gap-1">
                <FiFolder className="h-4 w-4" />
                <Link 
                  href={`/blog?category=${post.blog_categories.id}`}
                  className="hover:text-blue-600 dark:hover:text-blue-500"
                >
                  {post.blog_categories.name}
                </Link>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                >
                  <FiTag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Featured Image */}
            {post.featured_image && (
              <div className="relative w-full aspect-[2/1] mb-8 rounded-lg overflow-hidden">
                <Image
                  src={`${post.featured_image.split('?')[0]}?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3`}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized
                />
              </div>
            )}
          </header>

          {/* Content */}
          <div 
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
} 