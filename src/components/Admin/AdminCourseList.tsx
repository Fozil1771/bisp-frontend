import { Link } from 'react-router-dom'

const AdminCourseList = ({ courseList }) => {
  return (
    <div>

      <div className="mx-auto p-8 lg:px-48">
        <h2 className="text-2xl font-bold mb-4">Course List</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Created At</th>
                <th className="px-4 py-2">Teacher</th>
                <th className="px-4 py-2">Chapters</th>
                <th className="px-4 py-2">Featured</th>
                <th className="px-4 py-2">Participants</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courseList.map((course, id) => (
                <tr key={course.id}>
                  <td className="border px-4 py-2 text-center">{id + 1}</td>
                  <td className="border px-4 py-2">{course.title}</td>
                  <td className="border px-4 py-2">{course.createdAt}</td>
                  <td className="border px-4 py-2">{course.teacher?.firstName} {course.teacher?.lastName}</td>
                  <td className="border px-4 py-2">{course?.chapters?.length}</td>
                  <td className="border px-4 py-2 text-center">{course.isFeatured ? 'Yes' : 'No'}</td>
                  <td className="border px-4 py-2">{course?.participants?.length}</td>
                  <td className="border px-4 py-2">
                    <Link to={`/course-details/${course.id}`}>
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

export default AdminCourseList