import { useEffect, useState } from "react";
import { IUser } from "../../types"
import { getAllTeacherList } from "../../api";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTeachersAction } from "../../store/Users/usersAction";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllTeacherList();
        setTeacherList(data);
        console.log(data)
        dispatch(setTeachersAction([...data]));
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
          <p className="text-3xl text-white">{user.email}</p>
          <p className="text-gray-500 mt-8">
            {user.bio}
          </p>

        </div>
      </header>


      <div className="mx-auto p-8 lg:px-48">
        <h2 className="text-2xl font-bold mb-4">Teacher List</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">First Name</th>
                <th className="px-4 py-2">Last Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Verified Status</th>
                <th className="px-4 py-2">Admin ID</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teacherList.map((teacher, id) => (
                <tr key={teacher.id}>
                  <td className="border px-4 py-2 text-center">{id + 1}</td>
                  <td className="border px-4 py-2">{teacher.firstName}</td>
                  <td className="border px-4 py-2">{teacher.lastName}</td>
                  <td className="border px-4 py-2">{teacher.email}</td>
                  <td className="border px-4 py-2">{teacher.username}</td>
                  <td className="border px-4 py-2 text-center">{teacher.verifiedTeacher ? 'Yes' : 'No'}</td>
                  <td className="border px-4 py-2">{teacher.admin?.username}</td>
                  <td className="border px-4 py-2">
                    <Link to={`/teacher-details/${teacher.id}`}>
                      <a className="text-blue-500">View Details</a>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default Admin