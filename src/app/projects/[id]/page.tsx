'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { supabase } from '@/lib/supabase';
import type { Project } from '@/lib/services/projects';

export default function ProjectPage() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select(`
            *,
            project_categories (
              name
            )
          `)
          .eq('id', params.id)
          .single();

        if (error) throw error;

        setProject(data ? {
          ...data,
          category: data.project_categories?.name
        } : null);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchProject();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-8" />
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <p className="text-gray-600 dark:text-gray-400">
            The project you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {project.image_url && (
          <div className="aspect-video mb-8 rounded-lg overflow-hidden">
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>

        <div className="flex flex-wrap gap-4 items-center mb-6">
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

        <div className="flex flex-wrap gap-2 mb-8">
          {project.technologies?.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm bg-gray-700/50 hover:bg-gray-700/70 rounded-full transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-6">{project.description}</p>
          <div className="mt-8">
            {project.long_description}
          </div>
        </div>
      </div>
    </div>
  );
} 