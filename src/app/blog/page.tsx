import Link from 'next/link';
import { FiArrowRight, FiClock, FiTag } from 'react-icons/fi';

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with Next.js and AI Integration",
      excerpt: "Learn how to set up a modern web application with Next.js and integrate AI capabilities for enhanced user experiences.",
      date: "March 20, 2024",
      readingTime: "6 min read",
      tags: ["Next.js", "AI", "Web Development"],
      slug: "getting-started-with-nextjs-and-ai"
    },
    {
      id: 2,
      title: "The Future of AI in Software Development",
      excerpt: "Exploring how artificial intelligence is transforming the software development landscape and what it means for developers.",
      date: "March 15, 2024",
      readingTime: "8 min read",
      tags: ["AI", "Software Development", "Future Tech"],
      slug: "future-of-ai-in-software-development"
    },
    {
      id: 3,
      title: "Productivity Hacks for Developers",
      excerpt: "Discover practical techniques and tools to boost your productivity as a software developer.",
      date: "March 10, 2024",
      readingTime: "5 min read",
      tags: ["Productivity", "Developer Tools", "Workflow"],
      slug: "productivity-hacks-for-developers"
    },
    {
      id: 4,
      title: "Building a Successful Tech Freelancing Career",
      excerpt: "Tips and strategies for establishing and growing your freelance career in the technology sector.",
      date: "March 5, 2024",
      readingTime: "7 min read",
      tags: ["Freelancing", "Career", "Business"],
      slug: "building-successful-tech-freelancing-career"
    }
  ];

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Blog</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-12">
          Thoughts, tutorials, and insights about programming, AI, and technology.
        </p>

        {/* Filter by tag */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex gap-2">
            {['All', 'AI', 'Web Development', 'Productivity', 'Freelancing', 'Career'].map((tag) => (
              <button
                key={tag}
                className="px-4 py-2 text-sm font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 whitespace-nowrap"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Blog posts */}
        <div className="space-y-12">
          {blogPosts.map((post) => (
            <article key={post.id} className="border-b border-gray-200 dark:border-gray-800 pb-10">
              <Link href={`/blog/${post.slug}`} className="block group">
                <div className="mb-4 flex items-center text-sm text-gray-600 dark:text-gray-400 gap-4">
                  <time dateTime="2023-03-20">{post.date}</time>
                  <div className="flex items-center gap-1">
                    <FiClock className="h-4 w-4" />
                    <span>{post.readingTime}</span>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
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
                
                <div className="flex items-center text-blue-600 dark:text-blue-500 font-medium group-hover:underline">
                  <span>Read more</span>
                  <FiArrowRight className="ml-2 h-4 w-4" />
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
} 