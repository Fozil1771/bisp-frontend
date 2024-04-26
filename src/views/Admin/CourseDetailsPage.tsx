import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import Loader from "../../components/Loader";

const CourseDetailsPage = () => {
  const { courseId } = useParams();

  const user = useSelector((state) => state.auth.user)
  const selectedCourseData = useSelector((state) => state.courses.course_list)
  const course = selectedCourseData.filter((course) => course.id == courseId)[0];

  const [activeChapter, setActiveChapter] = useState(course.chapters[0]);

  const [loading, setLoading] = useState(true);
  const [text, setText] = useState(course.chapters[0]?.html);
  const [showMenu, setShowMenu] = useState(false)



  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [loading]);

  const handleChapterClick = (chapter) => {
    console.log(chapter.title)
    setActiveChapter(chapter);
    setText(chapter.html)
    setShowMenu(false)
    // setLoading(true);
  };

  if (course.chapters.length == 0) return <h1 className="text-center">No chapters found</h1>;

  return (
    <div>
      {loading ? <Loader loading={loading} /> : (

        <>
          <div className="flex items-baseline gap-4">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className={`md:hidden ${!showMenu ? 'block' : 'hidden'} inline-flex items-center justify-center mt-4 rounded-md text-gray-400 focus:outline-none focus:bg-gray-700 focus:text-white`}
            >
              {/* Menu open: "hidden", Menu closed: "block" */}
              <svg
                className="block h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Menu open: "block", Menu closed: "hidden" */}
              <svg
                className="hidden h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className='flex justify-between w-full md:gap-8'>

              <div
                className={`${showMenu ? 'translate-x-0' : '-translate-x-full md:-translate-x-0'} absolute top-[60px] left-0 max-w-[75%] md:relative md:top-0 md:max-w-full bg-white border md:border-0 w-full md:w-1/5 py-8 px-4 border-r md:border-r-0 md:border-b h-[100vh] md:h-auto md:max-h-[80vh] md:overflow-y-auto`}>
                <div className='flex justify-between align-middle mb-4'>
                  <h2 className="text-xl font-semibold mb-0">Chapters</h2>
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className={`${!showMenu ? 'hidden' : 'block'} text-xl inline-flex items-center justify-center rounded-md text-gray-400 focus:outline-none focus:bg-gray-700 focus:text-white`}
                  >x</button>
                </div>
                <ul>
                  {course?.chapters.map((chapter) => (
                    <li
                      key={chapter.id}
                      className={`mb-2 cursor-pointer p-2 rounded-md ${activeChapter?.id === chapter.id ? 'bg-cyan-500 text-white' : ''} ${(user.userType !== "admin" && !chapter.isFree) ? 'flex justify-between items-center bg-gray-200 text-gray-700' : ''}`}
                      onClick={() => handleChapterClick(chapter)}
                    >
                      <span>{chapter.title}</span>
                      {(user.userType !== "admin" && !chapter.isFree) && <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                      </svg>
                      </span>}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex-grow">
                <h1 className="text-2xl font-semibold mb-4">{course?.title}</h1>

                {/* Display Active Chapter Content */}
                {activeChapter && (
                  <div className='course-chapter--countent'>
                    <h2 className="text-xl font-semibold mb-2">{activeChapter.title}</h2>

                    <div className="mb-4">
                      {parse(activeChapter?.html)}
                    </div>


                  </div>

                )}
              </div>

            </div>
          </div>
        </>

      )}
    </div>
  )
}

export default CourseDetailsPage

