import React from 'react';
import CourseCard from './CourseCard';

interface Course {
  id: string;
  title: string;
  description: string;
  banner: string; // Add imageUrl to your Course interface
}

interface CoursesListProps {
  courses: Course[];
}

const CoursesList: React.FC<CoursesListProps> = ({ courses, title }) => {
  console.log(courses)
  return (
    <>
      <h2 className='text-2xl font-semibold mt-8'>{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-4">
        {courses?.map((course) => (
          <CourseCard
            key={course.id}
            courseId={course.id}
            title={course.title}
            description={course.description}
            banner={course.banner}
          />
        ))}
      </div>
    </>
  );
};

export default CoursesList;
