import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { enrollToCourse, getCoursePublicById } from '../../api';
import Loader from '../../components/Loader';
import Navbar from '../../components/global/Navbar';
import { useSelector } from 'react-redux';
import { IAuthState } from '../../types';

const SingleCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const user = useSelector((state: IAuthState) => state.auth?.user);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const fetchedCourse = await getCoursePublicById(id);
        setCourse(fetchedCourse);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    fetchCourse();

  }, [id]);

  if (user.userType == 'student') {

    console.log(course?.participants.filter((participant) => participant.id === user.id)[0])
    if (course?.participants?.includes(user.id)) {
      setIsEnrolled(true);
    }
  }


  const handleSubscribeToCourse = async (course) => {
    try {
      const response = await enrollToCourse(user.id, course.id);
      console.log(response);
    } catch (error) {
      console.error('Error subscribing to course:', error);
    }
  }

  return (
    <>
      <Navbar />
      <div className='container mx-auto h-[100vh]'>
        {/* Sidebar */}
        {loading ? <Loader loading={loading} /> : (
          <>
            <div className="flex flex-col md:flex-row md:justify-between mt-5">
              {/* Course Details */}
              <div className="md:w-3/4">
                <h1 className="text-3xl font-bold mb-4">{course?.title}</h1>
                <p className="text-lg mb-4">{course?.description}</p>
                <p className="text-lg">Type: {course?.type}</p>
                <p className="text-lg">Price: ${course?.price}</p>

                {user.userType == 'student' && !course?.participants.filter((participant) => participant.id === user.id)[0] && <button onClick={() => { handleSubscribeToCourse(course) }} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md inline-block">
                  Subscribe to Course
                </button>}
              </div>
              {/* Link to Chapters */}
              <div className="md:w-1/4 mt-4 md:mt-0">
                {user.userType == 'student' && course?.participants.filter((participant) => participant.id === user.id)[0] &&
                  <Link to={`/course/${id}/chapters`} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md inline-block">
                    View Chapters
                  </Link>
                }

                {user.userType == 'teacher' &&
                  <Link to={`/course/${id}/chapters`} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md inline-block">
                    View Chapters
                  </Link>
                }
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SingleCourse;
