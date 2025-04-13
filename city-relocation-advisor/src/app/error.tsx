'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to your error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Something went wrong!</h2>
        <p className="text-gray-300 mb-6">We apologize for the inconvenience.</p>
        <button
          onClick={() => reset()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
} 