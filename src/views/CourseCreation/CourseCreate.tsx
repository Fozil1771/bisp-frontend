// CourseCreate.tsx

import React, { useEffect, useState } from 'react';
import { createCourse, uploadCourseImage } from '../../api';
import { Navigate, redirect, useNavigate, useParams } from 'react-router-dom';
import Compressor from 'compressorjs';
import axios from 'axios';

const CourseCreate: React.FC = () => {
  const { teacherId } = useParams();
  const navigate = useNavigate();

  const [courseImage, setCourseImage] = useState();
  const [courseImageCompressed, setCourseImageCompressed] = useState();
  const [preview, setPreview] = useState()


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
    setCourseData((prevData) => ({ ...prevData, [name]: parsedValue }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Define promises for compressing image and creating course
      const compressPromise = new Promise((resolve, reject) => {
        new Compressor(courseImage, {
          quality: 0.8,
          success: async (banner) => {
            const formData = new FormData();
            formData.append('banner', banner);
            formData.append('title', courseData.title);

            try {
              const response = await axios.post('http://localhost:3003/api/course/image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
              });
              resolve(response.data);
            } catch (error) {
              reject(error);
            }
          },
        });
      });

      const createCoursePromise = createCourse({ ...courseData, teacherId: teacherId, banner: `${courseData.title.split(" ").join("_")}_banner.jpg` });

      // Wait for both promises to settle
      const results = await Promise.allSettled([compressPromise, createCoursePromise]);

      // Check if any promise failed
      const errors = results.filter(result => result.status === 'rejected');
      if (errors.length > 0) {
        errors.forEach(error => console.error('Error:', error.reason));
        // Handle failure
      } else {
        navigate('/profile');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (!courseImage) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(courseImage)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [courseImage])

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Create a New Course</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <div className="flex items-center justify-center max-w-sm">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">

              {!courseImage && (
                <>
                  <span>Upload Cover Image</span>
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG (MAX. 800x400px)</p>
                  </div>
                </>

              )}
              {courseImage && (
                <>

                  <img src={preview} className='w-72 h-48 object-cover' />
                  <p>{courseImage?.name}</p>
                </>
              )}
              <input
                id="dropzone-file"
                type="file"
                accept="image/*"
                className="hidden"
                name="image"
                onChange={(e) => setCourseImage(e.target.files[0])} />
            </label>
          </div>

        </div>
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

      {/* <img src="http://localhost:3003/public/uploads/9cdfe1c73d7b70b673a5495030b2faad" alt="" /> */}
    </div>
  );
};

export default CourseCreate;
