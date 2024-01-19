// CourseCreate.tsx

import React, { useState } from 'react';
import { createCourse } from '../../api';
import { redirect, useParams } from 'react-router-dom';

const CourseCreate: React.FC = () => {
  const { teacherId } = useParams();
  const [courseData, setCourseData] = useState({
    title: '',
    type: '',
    limit: 0,
    view: '',
    description: '',
    price: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const parsedValue = name === 'limit' || name === 'price' ? Number(value) : value;
    console.log(parsedValue)
    setCourseData((prevData) => ({ ...prevData, [name]: parsedValue }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Call the API to create a course
      console.log(courseData)
      await createCourse({ ...courseData, teacherId: teacherId });
      redirect(`/profile`);
      console.log('Course created:', courseData);
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Create a New Course</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={courseData.title}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            type="textarea"
            id="description"
            name="description"
            value={courseData.description}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            id="type"
            name="type"
            value={courseData.type}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          >
            <option value="" disabled>Select a type</option>
            <option value="english">English</option>
            {/* Add more options as needed */}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="view" className="block text-sm font-medium text-gray-700">
            View
          </label>
          <select
            id="view"
            name="view"
            value={courseData.view}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          >
            <option value="" disabled>Select a type</option>
            <option value="english">Basic (Default)</option>
            <option value="template-1">Template 1</option>
            <option value="template-2">Template 2</option>
            {/* Add more options as needed */}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="limit" className="block text-sm font-medium text-gray-700">
            Limit
          </label>
          <input
            type="number"
            id="limit"
            name="limit"
            min={10}
            defaultValue={10}
            value={courseData.limit}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={courseData.price}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Create Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseCreate;
