import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCourseByTeacher } from '../../api';
import CourseChapters from './CourseChapters';

const CourseDetail = () => {
  const { id, teacherId } = useParams();
  console.log(id, teacherId)
  const [course, setCourse] = useState({});
  const [chaptersView, setChaptersView] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchCourseDetails = async () => {
      try {
        setLoading(true)
        // Fetch course details from your API or database
        const data = await getCourseByTeacher(teacherId, id);
        setCourse(data); // Set the course state with fetched data
      } catch (error) {
        console.error('Error fetching course details:', error);
      } finally {
        setLoading(false)
      }
    };

    fetchCourseDetails();
  }, [id]);


  if (loading) {
    return <p>Loading...</p>;
  }

  console.log(course);


  return (


    <div className="container mx-auto">
      <Link to={'/profile'} className='my-10 p-4 block border cursor-pointer border-gray-300 rounded-md w-max'>Back to courses</Link>
      <div>
        <img
          className="w-full h-[350px] object-cover mb-4 rounded-md"
          src={`http://localhost:3003/public/uploads/${course.banner}`}
          alt={`Image for ${course.title}`}
        />
        <h1 className="text-3xl font-semibold mb-4">{course.title}</h1>
        <p className="text-gray-500 mb-2">{course.description}</p>
        <p className="text-gray-500 mb-2">Enrolled Students: {course.participants?.length}</p>
        <p className="text-gray-500 mb-2">Price: ${course.price}</p>


        <button className='btn' onClick={() => setChaptersView(!chaptersView)}>View Chapters</button>

        {
          chaptersView && <CourseChapters course={course} chapters={course.chapters} />
        }
      </div>
    </div>

  );
};

export default CourseDetail;
