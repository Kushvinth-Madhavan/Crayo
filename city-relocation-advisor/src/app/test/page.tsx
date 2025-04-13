'use client';

import { useState } from 'react';

export default function TestPage() {
  const [response, setResponse] = useState<string>('');
  const [error, setError] = useState<string>('');

  const testApi = async () => {
    try {
      const res = await fetch('/api/chat/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentLocation: 'New York',
          desiredLocation: 'Los Angeles'
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
      setError('');
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResponse('');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">API Test Page</h1>
      <button
        onClick={testApi}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Test API
      </button>
      {response && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Response:</h2>
          <pre className="p-4 bg-gray-100 rounded overflow-auto max-h-96">
            {response}
          </pre>
        </div>
      )}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          <h2 className="font-semibold mb-2">Error:</h2>
          {error}
        </div>
      )}
    </div>
  );
} 