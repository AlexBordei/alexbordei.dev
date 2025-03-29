'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiCode, FiCpu, FiTrendingUp, FiClock, FiTag, FiGithub, FiExternalLink } from 'react-icons/fi';
import { blogService } from '@/lib/services/blog';
import { projectService } from '@/lib/services/projects';
import type { BlogPost } from '@/lib/services/blog';
import type { Project } from '@/lib/services/projects';

export default function Home() {
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
  const [latestProjects, setLatestProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          I'm a software engineer passionate about building modern web applications.
          Here you'll find my latest projects and blog posts about software development.
        </p>
      </div>

      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest Projects</h2>
          <Link
            href="/projects"
            className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
          >
            View all projects
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
            >
              <Link href={`/projects/${project.id}`} className="block">
                {project.image_url && (
                  <div className="aspect-video bg-gray-100 dark:bg-gray-900">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies?.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
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

      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest Blog Posts</h2>
          <Link
            href="/blog"
            className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
          >
            View all posts
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
            >
              {post.featured_image && (
                <div className="aspect-video bg-gray-100 dark:bg-gray-900">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags?.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
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
    </div>
  );
}
