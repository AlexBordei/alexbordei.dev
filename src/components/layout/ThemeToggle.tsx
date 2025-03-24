"use client";

import React from 'react';
import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // After mounting, we can access the theme
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9"></div>; // Placeholder with same dimensions
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Toggle dark mode"
    >
      {theme === 'dark' ? (
        <FiSun className="h-5 w-5 text-yellow-500" />
      ) : (
        <FiMoon className="h-5 w-5 text-gray-700" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
} 