import { useEffect, useState } from "react";
import { IUser } from "../../types";
import { getAllCoursesByTeacher, getAllEnrolledStudentsByTeacher } from "../../api";
import { Link } from "react-router-dom";
import { truncateText } from "../../utils";
import Avatar from '../../assets/avatar.jpg'

interface IProps {
  user: IUser;
}

const Teacher: React.FC<IProps> = ({ user }) => {
  const [participants, setParticipants] = useState([]);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataStudents = await getAllEnrolledStudentsByTeacher(user.id);
        const dataCourses = await getAllCoursesByTeacher(user.id);

        setParticipants(dataStudents);
        setCourses(dataCourses);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user.id])

  console.log(courses);


  return (
    <>
      <header className="bg-gray-900 mx-auto">
        <div className=" p-8 lg:px-48">

          <div className="flex mb-5 items-center gap-4">
            <img
              src={user.imageUrl ? `http://localhost:3003/public/profile/${user.imageUrl}` : Avatar}
              alt="avatar"
              className="w-20 h-20 rounded-full object-fit"
            />
            <h5 className="text-3xl text-white">@{user.username}</h5>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 mt-3">
              <span className="text-white font-bold">{courses.length}</span>
              <span className="text-gray-500 font-normal">Courses</span>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-white font-bold">{participants.length}</span>
              <span className="text-gray-500 font-normal">Students</span>
            </div>
          </div>
          <p className="text-gray-500 mt-8">
            {user.bio}
          </p>

        </div>
      </header >


      <div className="container my-4 mx-auto">
        <h3 className="text-2xl font-semibold mb-6">Courses</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {courses?.map(course => (
            <Link to={`/profile/course/${user.id}/${course.id}`} key={course.id}>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-2xl font-semibold mb-4">{course.title}</h4>
                <img
                  className="w-full h-40 object-cover mb-4 rounded-md"
                  src={`http://localhost:3003/public/course/${course.banner}`}
                  alt={`Image for ${course.title}`}
                />
                <p className="text-gray-500 mb-4">{truncateText(course.description, 80)}</p>
                <p className="text-gray-500 mb-4">Enrolled Students: {participants.length}</p>
                <p className="text-gray-500 mb-4">Price: {course.price}</p>
                {/* You can add more details or buttons here */}
              </div>
            </Link>
          ))}
          <Link to={`/profile/${user.id}/course/create`}>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-2xl font-semibold mb-4">Create Course</h4>

              <span className="text-gray-500 text-3xl text-center w-full block">+</span>
            </div>
          </Link>

        </div>
      </div>
    </>

  );
}

export default Teacher