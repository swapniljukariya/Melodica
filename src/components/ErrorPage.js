// src/pages/ErrorPage.jsx
import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">Oops!</h1>
      <p className="text-lg text-gray-700">Something went wrong.</p>
      {error && (
        <div className="text-red-500 mt-4">
          <p>Error: {error.status || 'Unknown'}</p>
          <p>{error.statusText || error.message}</p>
        </div>
      )}
      <a
        href="/"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go to Homepage
      </a>
    </div>
  );
};

export default ErrorPage;
