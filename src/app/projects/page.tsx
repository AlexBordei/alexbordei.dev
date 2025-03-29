'use client';

import { useCallback, useEffect, useState } from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { useSearchParams, useRouter } from 'next/navigation';
import { projectService } from '@/lib/services/projects';
import { ProjectLoader } from '@/components/projects/ProjectLoader';
import { SearchForm } from '@/components/projects/SearchForm';
import type { Project } from '@/lib/services/projects';

interface Category {
  id: number;
  name: string;
}

export default function Projects() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const category = searchParams.get('category') || '';
      const search = searchParams.get('search') || '';
      setSelectedCategory(category);
      setSearchQuery(search);

      const { projects } = await projectService.getProjects({ category, search });
      setProjects(projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  const fetchCategories = useCallback(async () => {
    try {
      const categories = await projectService.getCategories();
      setCategories(categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
    fetchCategories();
  }, [fetchProjects, fetchCategories]);

  const updateURL = useCallback((category: string, search: string) => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (search) params.set('search', search);
    router.push(`/projects${params.toString() ? `?${params.toString()}` : ''}`);
  }, [router]);

  const handleCategoryClick = useCallback((category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
    updateURL(category, '');
  }, [updateURL]);

  const handleSearch = useCallback((search: string) => {
    setSearchQuery(search);
    setSelectedCategory('');
    updateURL('', search);
  }, [updateURL]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Projects</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore my portfolio of projects spanning web development, mobile apps, and more.
          Each project showcases different technologies and solutions to real-world problems.
        </p>
      </div>

      <div className="mb-8">
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <button
            onClick={() => handleCategoryClick('')}
            className={`px-4 py-2 rounded-full transition-all ${
              selectedCategory === ''
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === category.name
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="max-w-md mx-auto mb-8">
          <SearchForm
            initialSearch={searchQuery}
            onSearch={handleSearch}
            placeholder="Search projects..."
          />
        </div>
      </div>

      {loading ? (
        <ProjectLoader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
            >
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
                      >
                        <FiExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 