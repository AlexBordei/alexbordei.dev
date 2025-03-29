export function ProjectLoader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div 
          key={i}
          className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm animate-pulse"
        >
          <div className="aspect-video bg-gray-200 dark:bg-gray-700" />
          <div className="p-6">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-3/4" />
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {[1, 2, 3].map((j) => (
                <div 
                  key={j}
                  className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"
                />
              ))}
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
              <div className="flex gap-3">
                <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 