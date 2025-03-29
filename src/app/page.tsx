import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiCode, FiCpu, FiTrendingUp, FiClock, FiTag } from 'react-icons/fi';
import { blogService } from '@/lib/services/blog';
import { type BlogPost } from '@/lib/supabase';

export default async function Home() {
  const posts = await blogService.getRecentPosts(3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Software Engineer <span className="text-blue-600 dark:text-blue-500">&</span> AI Educator
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Building innovative technology solutions and sharing knowledge about AI, programming, and digital transformation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/blog" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium inline-flex items-center gap-2 transition-colors"
              >
                Read the Blog
                <FiArrowRight className="h-4 w-4" />
              </Link>
              <Link 
                href="/contact" 
                className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 px-6 py-3 rounded-md font-medium transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Latest Articles
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Recent thoughts and insights about software development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: BlogPost) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full"
              >
                {post.featured_image ? (
                  <div className="relative w-full pt-[56.25%]">
                    <Image
                      src={`${post.featured_image.split('?')[0]}?fm=jpg&q=60&w=800&ixlib=rb-4.0.3`}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="relative w-full pt-[56.25%] bg-gray-100 dark:bg-gray-700">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-gray-400 dark:text-gray-500">
                        <FiCode className="w-12 h-12" />
                      </div>
                    </div>
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <FiClock className="mr-1" />
                    <span>{post.reading_time}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1">
                    {post.excerpt}
                  </p>
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        >
                          <FiTag className="mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              View All Articles
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Areas of Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Software Engineering",
                description: "Designing and building scalable applications with modern frameworks and best practices.",
                icon: <FiCode className="w-8 h-8 text-blue-600 dark:text-blue-500" />,
              },
              {
                title: "Artificial Intelligence",
                description: "Developing AI solutions and educating others on the possibilities of machine learning.",
                icon: <FiCpu className="w-8 h-8 text-blue-600 dark:text-blue-500" />,
              },
              {
                title: "Digital Transformation",
                description: "Helping businesses leverage technology to improve processes and create new opportunities.",
                icon: <FiTrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-500" />,
              },
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl font-bold mb-4 md:mb-0">Featured Projects</h2>
            <Link 
              href="/projects" 
              className="text-blue-600 dark:text-blue-500 font-medium inline-flex items-center gap-2 hover:underline"
            >
              View all projects
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "AI-Powered CRM System",
                description: "A customer relationship management system with integrated AI for better insights and automation.",
                tags: ["React", "Node.js", "TensorFlow", "AWS"],
                image: "/images/projects/project-1.jpg",
              },
              {
                title: "Tech Education Platform",
                description: "Online learning platform focused on programming and AI, with interactive courses and community features.",
                tags: ["Next.js", "Python", "Docker", "Firebase"],
                image: "/images/projects/project-2.jpg",
              },
            ].map((project, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video relative bg-gray-100 dark:bg-gray-700">
                  {/* Placeholder for project image */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    Project Image Placeholder
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex} 
                        className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-sm px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link 
                    href={`/projects/${index + 1}`} 
                    className="text-blue-600 dark:text-blue-500 font-medium inline-flex items-center gap-2 hover:underline"
                  >
                    View project
                    <FiArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-blue-50 dark:bg-blue-900/20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Subscribe to my newsletter for the latest blog posts, project updates, and tech insights.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
