import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import { getTeacherById, verifyTeacherByAdmin } from '../../api'; // Assuming you have API functions to fetch teacher details and verify them
import { useSelector } from 'react-redux';

const TeacherDetailsPage = () => {
  const { teacherId } = useParams();
  const teacher = useSelector((state) => state.teachers.teachers).filter((teacher) => teacher.id === teacherId)[0];
  const user = useSelector((state) => state.auth.user)


  const [isVerifying, setIsVerifying] = useState(false);
  // const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(user.id)


  const handleVerifyTeacher = async (isVerified) => {
    try {
      setIsVerifying(true);
      await verifyTeacherByAdmin(teacher.id, user.id, isVerified);

    } catch (error) {
      console.error('Error verifying teacher:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div>

      <>
        <h1>Teacher Details</h1>
        <p>Name: {teacher?.firstName} {teacher?.lastName}</p>
        <p>Email: {teacher?.email}</p>
        <p>Verification Status: {teacher?.verifiedTeacher ? 'Verified' : 'Not Verified'} by {teacher.admin.username}</p>

        <p>Courses</p>
        <pre>{JSON.stringify(teacher?.courses, null, 2)}</pre>
        <ul>
          {teacher?.courses.map(course => (
            <div key={course.id}>
              {course.title}
              {course.description}
            </div>

          ))}
        </ul>
        <button
          onClick={() => handleVerifyTeacher(!teacher.verifiedTeacher)}
          disabled={isVerifying}
          className={`py-2 px-4 rounded-md focus:outline-none ${isVerifying
            ? 'bg-gray-500 cursor-not-allowed'
            : teacher.verifiedTeacher
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
        >
          {isVerifying
            ? 'Verifying...'
            : teacher.verifiedTeacher
              ? 'Remove verified status from Teacher'
              : 'Verify'}
        </button>
      </>
    </div>
  );
};

export default TeacherDetailsPage;
