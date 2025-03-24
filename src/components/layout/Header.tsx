"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/layout/ThemeToggle';

type NavItem = {
  label: string;
  href: string;
  active?: boolean;
};

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Resume', href: '/resume' },
  { label: 'Projects', href: '/projects' },
  { label: 'Media', href: '/media' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-40">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-semibold text-xl">
            Alex Bordei
          </Link>
          <nav className="hidden md:flex gap-6 ml-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors", 
                  item.active && "text-gray-900 dark:text-white font-medium"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button 
            className="md:hidden text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
          <nav className="container mx-auto px-4 py-3 flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "py-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors",
                  item.active && "text-gray-900 dark:text-white font-medium"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
} 