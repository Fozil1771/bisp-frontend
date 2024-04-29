import React, { useEffect, useState } from 'react'
import Hero from '../../components/Hero'
import { getCourseList } from '../../api';
import { CourseList } from '../../Course';
import Navbar from '../../components/global/Navbar';
import Footer from '../../components/global/Footer';
import CourseCollection from './CourseCollection';

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
    <>
      <Navbar />
      <div className='container mx-auto'>
        {/* <CourseList courses={courses} title={"All Courses"} /> */}
        <CourseCollection courses={courses} />
      </div>
      <Footer />
    </>
  )
}

export default AllCourses