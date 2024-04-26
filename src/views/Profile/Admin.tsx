import { useEffect, useState } from "react";
import { IUser } from "../../types"
import { getAllTeacherList, getAllCourseList } from "../../api";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTeachersAction } from "../../store/Users/usersAction";
import Teacherlist from "../../components/Admin/TeacherList";
import AdminCourseList from "../../components/Admin/AdminCourseList";

interface IProps {
  user: IUser;
}

interface ITeacher {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  username?: string;
  verifiedTeacher: boolean;
  adminId: string;
}

const Admin: React.FC<IProps> = ({ user }) => {
  const dispatch = useDispatch();

  const [teacherList, setTeacherList] = useState<ITeacher[]>([]);
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherData = await getAllTeacherList();
        const courseData = await getAllCourseList();
        console.log(courseData)
        setTeacherList(teacherData);
        setCourseList(courseData);
        console.log("teacherData", teacherData)
        console.log("courseData", courseData)
        dispatch(setTeachersAction([...teacherData]));
      } catch (error) {
        console.error('Error fetching teacherData:', error);
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
          <p className="text-3xl text-white">{user.email}</p>
          <p className="text-gray-500 mt-8">
            {user.bio}
          </p>

        </div>
      </header>


      <Teacherlist teacherList={teacherList} />

      <AdminCourseList courseList={courseList} />

    </div>
  )
}

export default Admin