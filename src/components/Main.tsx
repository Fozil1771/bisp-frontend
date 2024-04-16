import { useEffect } from 'react'
import { getCourseList } from '../api';
import Hero from './Hero';
import Counters from './Counters';
import { CourseList } from '../Course';
import { useDispatch, useSelector } from 'react-redux';
import { setCoursesAction } from '../store/Course/courseAction';
import FeaturedCoursesList from '../Course/FeaturedCourseList';

const Main = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.course_list);
  console.log("courses1", courses)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataCourses = await getCourseList();
        dispatch(setCoursesAction(dataCourses));
        console.log("fetching data")
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Hero />
      <div className='container mx-auto'>
        <FeaturedCoursesList courses={courses} title={"Featured Courses"} />
        <Counters />
      </div>
    </>
  )
}

export default Main