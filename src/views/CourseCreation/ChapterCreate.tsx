import { useState } from 'react';
import { createCourseChapter } from '../../api';
import { Checkbox } from "primereact/checkbox";

import { INITIAL_DATA } from '../../constants';
import EditorQ from '../../components/Editor/QuilEditor';
// import { Editor } from 'primereact/editor';


const ChapterCreate = ({ course, setLoading, updateChapterList }) => {
  const { teacherId, id, html } = course;

  const [text, setText] = useState('');

  const [data, setData] = useState(INITIAL_DATA);
  const [formData, setFormData] = useState({
    title: '',
    isPublished: false,
    isFree: false,
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
      const newChapter = await createCourseChapter(teacherId, id, { ...formData, description: data, html: text });

      updateChapterList([...course.chapters, newChapter]);

      // setting the form data to initial state
      setText("");
      setFormData({
        title: '',
        isPublished: false,
        isFree: false,
      })
    } catch (error) {
      console.error('Error creating chapter:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="mx-auto p-6 bg-white rounded-md">
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
          {/* <Editor
            value={text}
            onTextChange={(e) => setText(e.htmlValue)}
            style={{ height: '320px' }}
          /> */}
          {/* <Editor data={data} onChange={setData} editorblock="editorjs-container" /> */}
          <EditorQ value={text} setValue={setText} />
        </div>

        {/* <div className="mb-4">
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
        </div> */}

        <div className="flex flex-wrap justify-content-center gap-3 mb-3">
          <div className="flex align-items-center">
            <Checkbox
              className='border rounded-md pb-2'
              inputId="isPublished"
              name="isPublished"
              onChange={handleChange}
              checked={formData.isPublished} />
            <label htmlFor="isPublished" className="ml-2">isPublished</label>
          </div>
          <div className="flex align-items-center">
            <Checkbox
              className='border rounded-md pb-2'
              inputId="isFree"
              name="isFree"
              onChange={handleChange} checked={formData.isFree} />
            <label htmlFor="isFree" className="ml-2">isFree</label>
          </div>
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
