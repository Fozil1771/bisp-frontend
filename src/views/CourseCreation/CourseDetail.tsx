import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCourseByTeacher } from '../../api';
import CourseChapters from './CourseChapters';
import { BreadCrumb } from 'primereact/breadcrumb';

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

  console.log("course", course);

  if (loading) {
    return <p>Loading...</p>;
  }


  return (


    <div className="max-w-7xl mx-auto px-4">
      {/* <Link to={'/profile'} className='my-10 p-4 block border cursor-pointer border-gray-300 rounded-md w-max' > Back to courses</Link> */}
      <BreadCrumb
        className='px-0'
        model={
          [
            { label: 'Dasboard', url: '/profile' },
            { label: course.title, }
          ]
        }
        home={{ icon: 'pi pi-home', url: '/' }}
      />
      <div className='mt-4'>
        <img
          className="w-full h-[350px] object-cover mb-4 rounded-md"
          src={`http://localhost:3003/public/course/${course.banner}`}
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
