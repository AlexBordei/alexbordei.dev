import Link from 'next/link';
import { FiGithub, FiLinkedin, FiYoutube } from 'react-icons/fi';
import { SiTiktok } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="font-semibold text-xl">
              Alex Bordei
            </Link>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Software Engineer & AI Educator
            </p>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Based in Bucharest, Romania
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/media" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Media
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/alexbordei"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <FiGithub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/alexbordei"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://youtube.com/@alexbordei"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <FiYoutube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
              <a
                href="https://tiktok.com/@alexbordei"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <SiTiktok className="h-5 w-5" />
                <span className="sr-only">TikTok</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-10 border-t border-gray-200 dark:border-gray-800 pt-6 text-center text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Alex Bordei. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 