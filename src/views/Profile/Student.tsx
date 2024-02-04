import { useEffect, useState } from "react";
import { IUser } from "../../types"
import { getEnrolledCourses } from "../../api";
import { useParams } from "react-router-dom";
import { CourseList } from "../../Course";

interface IProps {
  user: IUser;
}

const Student: React.FC<IProps> = ({ user }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEnrolledCourses(user.id);
        setEnrolledCourses(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [user])


  return (
    <div className="">
      <header className="bg-gray-900 mx-auto">
        <div className=" p-8 lg:px-48">

          <div className="flex mb-5 items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="avatar"
              className="w-20 h-20 rounded-full object-fit"
            />
            <h5 className="text-3xl text-white">@{user.username}</h5>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 mt-3">
              {/* <span className="text-white font-bold">{courses.length}</span> */}
              <span className="text-gray-500 font-normal">Courses</span>
            </div>

          </div>
          <p className="text-gray-500 mt-8">
            {user.bio}
          </p>

        </div>
      </header >
      {/* Add more user-related fields as needed */}

      <div className="container mx-auto">
        <CourseList courses={enrolledCourses} title={"Enrolled Courses"} />
      </div>
    </div>
  )
}

export default Student