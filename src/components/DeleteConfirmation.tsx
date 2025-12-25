import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmationProps {
  isOpen: boolean;
  recipeName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmation({
  isOpen,
  recipeName,
  onConfirm,
  onCancel
}: DeleteConfirmationProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6 transition-colors duration-300">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">
          Delete Recipe?
        </h2>

        <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
          Are you sure you want to delete <span className="font-semibold text-gray-900 dark:text-white">"{recipeName}"</span>? This action cannot be undone.
        </p>

        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium shadow-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
