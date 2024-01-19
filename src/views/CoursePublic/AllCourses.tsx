import React, { useEffect, useState } from 'react'
import Hero from '../../components/Hero'
import { getCourseList } from '../../api';
import { CourseList } from '../../Course';
import Navbar from '../../components/global/Navbar';

const AllCourses = () => {
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
    <div>
      <Navbar />
      <Hero />
      <div className='container mx-auto'>
        <CourseList courses={courses} title={"All Courses"} />
      </div>
    </div>
  )
}

export default AllCourses