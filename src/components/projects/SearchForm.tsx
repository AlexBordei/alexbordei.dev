'use client';

import { useState, useEffect, memo } from 'react';
import { FiSearch } from 'react-icons/fi';

interface SearchFormProps {
  initialSearch?: string;
  onSearch: (search: string) => void;
  placeholder?: string;
}

function SearchFormComponent({ 
  initialSearch = '', 
  onSearch,
  placeholder = 'Search projects...'
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

  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 pl-10 text-sm border rounded-lg dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
    </div>
  );
}

export const SearchForm = memo(SearchFormComponent); 