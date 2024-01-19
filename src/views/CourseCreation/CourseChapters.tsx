import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Editor } from '../../components/Editor';
import { createCourseChapter, deleteCourseChapter } from '../../api';
import ChapterCreate from './ChapterCreate';
import { INITIAL_DATA } from '../../constants';
import Loader from '../../components/Loader';



const CourseChapters = (course) => {
  const { chapters } = course;
  const { id, teacherId } = course.course;
  console.log(course)
  const [activeChapter, setActiveChapter] = useState(chapters[0]);
  const [data, setData] = useState(INITIAL_DATA);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setLoading(false);
      setData(activeChapter.description);
    }, 500);
  }, [loading, activeChapter]);

  const handleChapterView = (chapter) => {
    setActiveChapter(chapter);
    setData(chapter.description);
    setLoading(true);
  }

  const handleDeleteChapter = async (chapterId: string) => {
    try {
      await deleteCourseChapter(teacherId, id, chapterId);
      setLoading(true);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
      window.location.reload();
    }
  }

  return (
    <div className="flex mt-5">
      <div className="w-1/5 border-r px-3">
        <h2 className="text-xl font-semibold mb-4">Chapters</h2>
        <ul>
          {loading ? (
            <Loader loading={loading} />
          ) : <>
            {chapters.length > 0 && chapters?.map((chapter) => (
              <li key={chapter.id}
                className={
                  `mb-2 cursor-pointer p-2 rounded-md ${activeChapter && activeChapter?.id === chapter.id ? 'bg-cyan-500 text-white' : ''}`
                }
                onClick={() => handleChapterView(chapter)}>
                {chapter.title}
              </li>
            ))}
            <button className='p-2 rounded-md bg-green-500 text-white' onClick={() => setActiveChapter(null)}>
              {loading ? 'Creating...' : 'Create Chapter'}
            </button>
          </>}
        </ul>
      </div>
      {/* Chapter content in the main body */}
      <div className="flex-grow px-3">
        {loading ? (
          <Loader loading={loading} />
        ) : (
          <>
            {
              chapters.length > 0 && activeChapter ? <>
                <h2 className="text-xl font-semibold mb-4">{activeChapter.title}</h2>
                <div>
                  {data ? <Editor data={data} onChange={setData} editorblock="editorjs-container" /> :
                    <Editor data={INITIAL_DATA} onChange={setData} editorblock="editorjs-container" />
                  }
                  <div className='flex justify-between'>
                    <button
                      className="border px-4 py-2 rounded-md bg-green-500 text-white"
                      onClick={() => {
                        alert(JSON.stringify(data));
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => handleDeleteChapter(activeChapter.id)}
                      className="border px-4 py-2 rounded-md bg-red-500 text-white">Delete</button>
                  </div>
                </div>
              </> : chapters.length > 0 || chapters && !activeChapter ? <>

                <ChapterCreate course={course} setLoading={setLoading} />
              </> : 'You have not created any chapters yet.'
            }
          </>
        )}


      </div>
    </div >
  );
};

export default CourseChapters;
