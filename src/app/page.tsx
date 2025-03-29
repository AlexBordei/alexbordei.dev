'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiGithub, FiExternalLink, FiCode, FiCpu, FiTrendingUp, FiMail } from 'react-icons/fi';
import { blogService } from '@/lib/services/blog';
import { projectService } from '@/lib/services/projects';
import type { BlogPost } from '@/lib/services/blog';
import type { Project } from '@/lib/services/projects';

const expertiseAreas = [
  {
    icon: FiCode,
    title: "Full Stack Development",
    description: "Building scalable web applications with modern technologies like React, Next.js, Node.js, and cloud platforms."
  },
  {
    icon: FiCpu,
    title: "AI & Machine Learning",
    description: "Developing intelligent solutions using cutting-edge AI technologies and machine learning algorithms."
  },
  {
    icon: FiTrendingUp,
    title: "Technical Leadership",
    description: "Leading development teams, architecting solutions, and implementing best practices for successful project delivery."
  }
];

export default function Home() {
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
  const [latestProjects, setLatestProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    async function fetchData() {
      try {
        const [postsData, projectsData] = await Promise.all([
          blogService.getPosts({ limit: 3 }),
          projectService.getProjects({ limit: 3 })
        ]);

        setLatestPosts(postsData.posts);
        setLatestProjects(projectsData.projects);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeStatus('loading');

    try {
      // TODO: Implement newsletter subscription
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setSubscribeStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Error subscribing:', error);
      setSubscribeStatus('error');
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Software Engineer <span className="text-blue-600 dark:text-blue-500">&</span> AI Educator
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Building innovative solutions with modern technologies and sharing knowledge through education.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/projects"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center gap-2 transition-colors"
              >
                View Projects
                <FiArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/blog"
                className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Read Blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Areas of Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {expertiseAreas.map((area, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center mb-4">
                  <area.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{area.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Projects Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Latest Projects</h2>
            <Link
              href="/projects"
              className="text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 font-medium inline-flex items-center gap-2"
            >
              View all projects
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all group"
              >
                <Link href={`/projects/${project.id}`} className="block">
                  {project.image_url && (
                    <div className="aspect-video bg-gray-100 dark:bg-gray-900">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies?.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-sm bg-gray-700/50 hover:bg-gray-700/70 rounded-full transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {project.category}
                      </span>
                      <div className="flex gap-3">
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FiGithub size={20} />
                          </a>
                        )}
                        {project.live_url && (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FiExternalLink size={20} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Latest Blog Posts</h2>
            <Link
              href="/blog"
              className="text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 font-medium inline-flex items-center gap-2"
            >
              View all posts
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="aspect-video bg-gray-100 dark:bg-gray-900">
                  {post.featured_image ? (
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20">
                      <span className="text-4xl font-bold text-blue-500/20 dark:text-blue-400/20">AB</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags?.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm bg-gray-700/50 hover:bg-gray-700/70 rounded-full transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiMail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Subscribe to My Newsletter</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Get the latest updates on AI, software development, and tech education delivered straight to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                disabled={subscribeStatus === 'loading'}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {subscribeStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {subscribeStatus === 'success' && (
              <p className="mt-4 text-green-600 dark:text-green-400">
                Thanks for subscribing! Please check your email to confirm.
              </p>
            )}
            {subscribeStatus === 'error' && (
              <p className="mt-4 text-red-600 dark:text-red-400">
                Oops! Something went wrong. Please try again.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
