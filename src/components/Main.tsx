import { useEffect, useState } from 'react'
import { getCourseList } from '../api';
import Hero from './Hero';
import Counters from './Counters';
import { CourseList } from '../Course';
import Navbar from './global/Navbar';

const Main = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataCourses = await getCourseList();
        setCourses(dataCourses);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [])
  return (
    <>
      <Hero />
      <div className='container mx-auto'>
        <CourseList courses={courses} title={"Featured Courses"} />
        <Counters />
      </div>
    </>
  )
}

export default Main