import { Link } from "react-router-dom";

export default function CourseCollection({ courses }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Courses</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {courses.map((course) => (
            <Link key={course.id} to={`/course/${course.id}`} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={`http://localhost:3003/public/course/${course.banner}`}
                  alt={course.title}
                  className="max-h-60 h-full w-full object-cover object-center group-hover:opacity-75 aspect-[1]"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{course.title}</h3>
              <div className="flex align-middle justify-between">
                <p className="mt-1 text-lg font-medium text-gray-900">{course.price}</p>
                <p className="mt-1 text-lg font-medium text-gray-900">by {course.teacher.username}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
