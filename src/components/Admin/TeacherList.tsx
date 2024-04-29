import React from 'react'
import { Link } from 'react-router-dom'


const Teacherlist = ({ teacherList }) => {
  return (

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
  )
}

export default Teacherlist