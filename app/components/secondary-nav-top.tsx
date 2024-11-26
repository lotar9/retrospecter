import Link from 'next/link'

export default function SecondaryNavTop() {
  return (
    <div className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-12 flex items-center justify-between">
          {/* Connected Users Section */}
          <div className="flex -space-x-2 overflow-hidden">
            {/* Placeholder profile pictures - replace with actual user data */}
            <img
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User"
            />
            <img
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800"
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User"
            />
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 ring-2 ring-white dark:ring-gray-800">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">+3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
