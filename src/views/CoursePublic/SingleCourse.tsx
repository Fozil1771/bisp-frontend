import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCoursePublicById } from '../../api';  // Replace with your actual API function
import { INITIAL_DATA } from '../../constants';
import { Editor } from '../../components/Editor';
import Loader from '../../components/Loader';
import Navbar from '../../components/global/Navbar';

const SingleCourse = () => {
  const { id } = useParams();
  console.log(useParams())
  const [course, setCourse] = useState(null);
  const [activeChapter, setActiveChapter] = useState(null);
  const [data, setData] = useState(INITIAL_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const fetchedCourse = await getCoursePublicById(id);
        setCourse(fetchedCourse);
        setActiveChapter(fetchedCourse.chapters[0]);  // Set the first chapter as active by default
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [loading]);

  const handleChapterClick = (chapter) => {
    setActiveChapter(chapter);
    setData(chapter.description);
    setLoading(true);
  };

  return (
    <>
      <Navbar />
      <div className='container mx-auto h-[100vh]'>

        {/* Sidebar */}
        {loading ? <Loader loading={loading} /> : (
          <div className='flex'>
            <div className="w-1/5 py-8 px-4 border-r h-[100vh]">
              <h2 className="text-xl font-semibold mb-4">Chapters</h2>
              <ul>
                {course?.chapters.map((chapter) => (
                  <li
                    key={chapter.id}
                    className={`mb-2 cursor-pointer p-2 rounded-md ${activeChapter?.id === chapter.id ? 'bg-cyan-500 text-white' : ''}`}
                    onClick={() => handleChapterClick(chapter)}
                  >
                    {chapter.title}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-grow p-8">
              <h1 className="text-2xl font-semibold mb-4">{course?.title}</h1>

              {/* Display Active Chapter Content */}
              {activeChapter && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">{activeChapter.title}</h2>

                  {data ? <Editor data={data} onChange={setData} editorblock="editorjs-container" /> :
                    <Editor data={INITIAL_DATA} onChange={setData} editorblock="editorjs-container" />
                  }
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SingleCourse;
