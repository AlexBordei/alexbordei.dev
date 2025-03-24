import Link from 'next/link';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "AI-Powered CRM System",
      description: "A customer relationship management system with integrated AI for better insights and automation.",
      longDescription: "This CRM system uses machine learning algorithms to analyze customer data and provide actionable insights. Features include automated customer segmentation, predictive analytics for sales forecasting, and intelligent task prioritization.",
      technologies: ["React", "Node.js", "TensorFlow", "MongoDB", "AWS"],
      image: "/images/projects/project-1.jpg",
      links: {
        live: "https://example.com/crm",
        github: "https://github.com/alexbordei/ai-crm"
      },
      featured: true
    },
    {
      id: 2,
      title: "Tech Education Platform",
      description: "Online learning platform focused on programming and AI, with interactive courses and community features.",
      longDescription: "A comprehensive learning platform that offers courses on programming, AI, and data science. Features include interactive coding exercises, progress tracking, community forums, and personalized learning paths.",
      technologies: ["Next.js", "Python", "Docker", "Firebase", "TailwindCSS"],
      image: "/images/projects/project-2.jpg",
      links: {
        live: "https://example.com/edutech",
        github: "https://github.com/alexbordei/tech-education"
      },
      featured: true
    },
    {
      id: 3,
      title: "Smart Home Management System",
      description: "IoT solution for monitoring and controlling home devices with voice commands and automation rules.",
      longDescription: "An integrated system that connects various IoT devices in a home environment. It provides a unified interface for monitoring and controlling devices, with support for voice commands, automation rules, and energy usage optimization.",
      technologies: ["React Native", "Node.js", "MQTT", "MongoDB", "TensorFlow Lite"],
      image: "/images/projects/project-3.jpg",
      links: {
        live: "https://example.com/smarthome",
        github: "https://github.com/alexbordei/smart-home"
      },
      featured: false
    },
    {
      id: 4,
      title: "Financial Analytics Dashboard",
      description: "Data visualization tool for financial metrics with predictive analytics capabilities.",
      longDescription: "A comprehensive dashboard that helps businesses track and analyze their financial metrics. It integrates with various accounting systems and provides real-time data visualization, trend analysis, and predictive forecasting.",
      technologies: ["Vue.js", "Flask", "D3.js", "PostgreSQL", "Docker"],
      image: "/images/projects/project-4.jpg",
      links: {
        live: "https://example.com/finance-analytics",
        github: "https://github.com/alexbordei/finance-analytics"
      },
      featured: false
    },
    {
      id: 5,
      title: "Health & Fitness Tracker",
      description: "Mobile app for tracking workouts, nutrition, and health metrics with AI-powered recommendations.",
      longDescription: "A comprehensive mobile application that helps users track their fitness activities, nutrition intake, and health metrics. It provides AI-powered recommendations for workout routines and meal plans based on user goals and progress.",
      technologies: ["React Native", "Node.js", "TensorFlow", "MongoDB", "AWS"],
      image: "/images/projects/project-5.jpg",
      links: {
        live: "https://example.com/health-tracker",
        github: "https://github.com/alexbordei/health-tracker"
      },
      featured: false
    },
    {
      id: 6,
      title: "Content Management System",
      description: "Headless CMS with API-first approach for managing digital content across multiple platforms.",
      longDescription: "A modern headless CMS that provides a flexible and scalable solution for managing digital content. It follows an API-first approach, allowing content to be delivered to any platform or device through RESTful APIs.",
      technologies: ["Next.js", "GraphQL", "Node.js", "PostgreSQL", "Redis"],
      image: "/images/projects/project-6.jpg",
      links: {
        live: "https://example.com/cms",
        github: "https://github.com/alexbordei/headless-cms"
      },
      featured: false
    }
  ];
  
  const categories = ["All", "Web Development", "Mobile", "AI", "IoT", "Data Visualization"];

  return (
    <div className="container py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Projects</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-12 max-w-3xl">
          Here are some of the projects I've worked on, showcasing my expertise in software development, AI integration, and digital solutions.
        </p>

        {/* Categories filter */}
        <div className="mb-10 overflow-x-auto pb-2">
          <div className="flex gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 text-sm font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 whitespace-nowrap"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-video relative bg-gray-100 dark:bg-gray-700">
                {/* Placeholder for project image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  Project Image Placeholder
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span 
                      key={index} 
                      className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-sm px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-sm px-3 py-1 rounded-full">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <Link 
                    href={`/projects/${project.id}`} 
                    className="text-blue-600 dark:text-blue-500 font-medium hover:underline"
                  >
                    View details
                  </Link>
                  
                  <div className="flex items-center gap-3">
                    {project.links.github && (
                      <a 
                        href={project.links.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        aria-label="GitHub repository"
                      >
                        <FiGithub className="h-5 w-5" />
                      </a>
                    )}
                    {project.links.live && (
                      <a 
                        href={project.links.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        aria-label="Live demo"
                      >
                        <FiExternalLink className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 