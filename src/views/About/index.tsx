import React from 'react';
import Footer from '../../components/global/Footer';

const AboutPage: React.FC = () => {
  return (
    <>
      <div className="relative">
        <img
          className="w-full h-[720px] object-cover"
          src="https://images.unsplash.com/photo-1616531770192-6eaea74c2456?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  // Replace with your image URL
          alt="Slide 1"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
          <h2 className="text-4xl font-bold mb-2">About us</h2>
          <p className="text-lg">Explore Limitless Possibilities with Online Education</p>
        </div>
      </div>
      <div className="container mx-auto py-8">


        {/* Newsletter Form */}
        <div className="flex items-center justify-center">
          <form className="max-w-md w-full">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Subscribe to our Newsletter
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="Your Email"
                required
              />
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutPage;
