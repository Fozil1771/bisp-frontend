import { useState } from 'react';
import { createCourseChapter } from '../../api';
import { Editor } from '../../components/Editor';
import { INITIAL_DATA } from '../../constants';

const ChapterCreate = ({ course, setLoading }) => {
  const { teacherId, id } = course.course;

  const [data, setData] = useState(INITIAL_DATA);
  const [formData, setFormData] = useState({
    title: '',
    isPublished: false,
    isFree: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(teacherId, id)
      // Call the API to create a chapter
      const newChapter = await createCourseChapter(teacherId, id, { ...formData, description: data });
      console.log('Chapter created:', newChapter);
      // Reload or redirect to the course chapters page
    } catch (error) {
      console.error('Error creating chapter:', error);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };


  return (
    <div className="mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create New Course Chapter</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-600">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-600">
            Description
          </label>
          <Editor data={data} onChange={setData} editorblock="editorjs-container" />

        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              id="isPublished"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-600">Published</span>
          </label>
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              id="isFree"
              name="isFree"
              checked={formData.isFree}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-600">Free</span>
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Create Chapter
        </button>
      </form>
    </div>
  );
};

export default ChapterCreate;
