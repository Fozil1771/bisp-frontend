// Footer.tsx

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 ">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold">Learn Online</p>
            <p className="text-sm">© {new Date().getFullYear()} All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              Terms of Service
            </a>
            {/* Add more links as needed */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
