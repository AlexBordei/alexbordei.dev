'use client';

import Link from 'next/link';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  category?: string;
  search?: string;
  tag?: string;
}

export function Pagination({ currentPage, totalPages, category, search, tag }: PaginationProps) {
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (search) params.set('search', search);
    if (tag) params.set('tag', tag);
    if (page > 1) params.set('page', page.toString());
    return `/blog${params.toString() ? `?${params.toString()}` : ''}`;
  };

  return (
    <nav className="flex items-center justify-center gap-2">
      {currentPage > 1 && (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <FiChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Link>
      )}

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={createPageUrl(page)}
            className={`inline-flex items-center justify-center w-8 h-8 text-sm font-medium rounded-lg ${
              page === currentPage
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      {currentPage < totalPages && (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          Next
          <FiChevronRight className="h-4 w-4 ml-1" />
        </Link>
      )}
    </nav>
  );
} 