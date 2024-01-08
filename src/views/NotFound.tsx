import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-md text-center">
        <h2 className="text-2xl font-semibold mb-6">404 - Not Found</h2>
        <p className="text-gray-800">
          The page you are looking for does not exist or may have been moved.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
