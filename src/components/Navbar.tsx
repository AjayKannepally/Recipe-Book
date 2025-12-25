import { Search, Moon, Sun, Plus } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddRecipe: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Navbar({
  searchQuery,
  onSearchChange,
  onAddRecipe,
  darkMode,
  onToggleDarkMode
}: NavbarProps) {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
              <span className="text-2xl">🍳</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Recipe Box
            </h1>
          </div>

          <div className="flex items-center space-x-4 flex-1 max-w-xl mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-colors duration-300"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-6 h-6 text-yellow-400" />
              ) : (
                <Moon className="w-6 h-6 text-gray-600" />
              )}
            </button>

            <button
              onClick={onAddRecipe}
              className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105 shadow-md"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">Add Recipe</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
