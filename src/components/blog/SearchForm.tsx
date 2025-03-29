'use client';

import { useState, useEffect, memo } from 'react';
import { FiSearch } from 'react-icons/fi';
import type { BlogCategory } from '@/lib/services/blog';

interface SearchFormProps {
  initialSearch?: string;
  initialCategory?: string;
  categories: (BlogCategory & { post_count: number })[];
  onSearch: (search: string) => void;
  onCategory: (category: string) => void;
}

function SearchFormComponent({ 
  initialSearch = '', 
  initialCategory = '', 
  categories,
  onSearch,
  onCategory 
}: SearchFormProps) {
  const [search, setSearch] = useState(initialSearch);
  const [isInitialMount, setIsInitialMount] = useState(true);

  useEffect(() => {
    if (isInitialMount) {
      setIsInitialMount(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      onSearch(search);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search, onSearch, isInitialMount]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    onCategory(newCategory);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 pl-10 text-sm border rounded-lg dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
      <select
        value={initialCategory}
        onChange={handleCategoryChange}
        className="block w-full sm:w-48 pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-800"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export const SearchForm = memo(SearchFormComponent); 