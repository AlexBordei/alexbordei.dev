'use client';

import { useCallback, useEffect, useState } from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { useSearchParams, useRouter } from 'next/navigation';
import { projectService } from '@/lib/services/projects';
import { ProjectLoader } from '@/components/projects/ProjectLoader';
import { SearchForm } from '@/components/projects/SearchForm';
import type { Project } from '@/lib/services/projects';
import Link from 'next/link';

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
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTechnology, setSelectedTechnology] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const category = searchParams.get('category') || '';
      const technology = searchParams.get('technology') || '';
      const search = searchParams.get('search') || '';
      setSelectedCategory(category);
      setSelectedTechnology(technology);
      setSearchQuery(search);

      const { projects } = await projectService.getProjects({ 
        category, 
        technology,
        search 
      });
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

  const fetchTechnologies = useCallback(async () => {
    try {
      const technologies = await projectService.getTechnologies();
      setTechnologies(technologies || []);
    } catch (error) {
      console.error('Error fetching technologies:', error);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
    fetchCategories();
    fetchTechnologies();
  }, [fetchProjects, fetchCategories, fetchTechnologies]);

  const updateURL = useCallback((params: { category?: string; technology?: string; search?: string }) => {
    const urlParams = new URLSearchParams();
    if (params.category) urlParams.set('category', params.category);
    if (params.technology) urlParams.set('technology', params.technology);
    if (params.search) urlParams.set('search', params.search);
    router.push(`/projects${urlParams.toString() ? `?${urlParams.toString()}` : ''}`);
  }, [router]);

  const handleCategoryClick = useCallback((category: string) => {
    setSelectedCategory(category);
    setSelectedTechnology('');
    setSearchQuery('');
    updateURL({ category });
  }, [updateURL]);

  const handleTechnologyClick = useCallback((technology: string) => {
    setSelectedTechnology(technology);
    setSelectedCategory('');
    setSearchQuery('');
    updateURL({ technology });
  }, [updateURL]);

  const handleSearch = useCallback((search: string) => {
    setSearchQuery(search);
    setSelectedCategory('');
    setSelectedTechnology('');
    updateURL({ search });
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
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Filter by Category</h3>
          <div className="flex flex-wrap gap-4">
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
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Filter by Technology</h3>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handleTechnologyClick('')}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedTechnology === ''
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              All
            </button>
            {technologies.map((tech) => (
              <button
                key={tech}
                onClick={() => handleTechnologyClick(tech)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedTechnology === tech
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
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
      )}
    </div>
  );
} 