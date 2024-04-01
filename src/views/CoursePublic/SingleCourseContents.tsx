import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCoursePublicById } from '../../api';  // Replace with your actual API function
import { INITIAL_DATA } from '../../constants';
import { Editor } from '../../components/Editor';
import Loader from '../../components/Loader';
import Navbar from '../../components/global/Navbar';

const SingleCourseContents = () => {
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
        setActiveChapter(fetchedCourse.chapters[0]);
        setData(fetchedCourse.chapters[0].description);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course:', error);
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

  const disableEdting = () => {
    let editable_elements = document.querySelectorAll("[contenteditable=true]");
    editable_elements.forEach(el => el.removeAttribute("contenteditable"))

    let icon_settings = document.querySelectorAll('.ce-toolbar__settings-btn');
    icon_settings.forEach(el => el.remove())
  }

  return (
    <>
      <Navbar />
      <div className='container mx-auto h-[100vh]'>
        <Link to={`/course/${id}`} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md inline-block mt-5">
          Back to Course
        </Link>
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

                  {loading ? <Loader loading={loading} /> : <Editor data={data} onReady={disableEdting} onChange={setData} editorblock="editorjs-container-single" />}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SingleCourseContents;
