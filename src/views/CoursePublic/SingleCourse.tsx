import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { createCourseRating, enrollToCourse, getCoursePublicById } from '../../api';
import Loader from '../../components/Loader';
import Navbar from '../../components/global/Navbar';
import { useSelector } from 'react-redux';
import { IAuthState } from '../../types';

const SingleCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [review, setReview] = useState({
    rating: 0,
    content: '',
  });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviews, setReviews] = useState([]);




  const user = useSelector((state: IAuthState) => state.auth?.user);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const fetchedCourse = await getCoursePublicById(id);
        setCourse(fetchedCourse);
        setReviews(fetchedCourse.ratings);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    fetchCourse();

  }, [id]);

  if (user.userType == 'student') {
    if (course?.participants?.includes(user.id)) {
      setIsEnrolled(true);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    const parsedValue = name === 'rating' ? Number(value) : value;
    console.log("parsedValue", parsedValue)
    setReview((prevData) => ({ ...prevData, [name]: parsedValue }));
  };

  const handleReviewSubmit = async () => {
    try {
      setSubmittingReview(true);
      // Submit the review to your API
      await createCourseRating(course?.id, user.id, review);
      // After successful submission, you can update the UI or fetch the updated course data
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setSubmittingReview(false);
    }
  };
  const handleSubscribeToCourse = async (course) => {
    try {
      const response = await enrollToCourse(user.id, course.id);
      console.log(response);
    } catch (error) {
      console.error('Error subscribing to course:', error);
    }
  }

  return (
    <>
      <Navbar />
      <div className='container mx-auto h-[100vh]'>
        {/* Sidebar */}
        {loading ? <Loader loading={loading} /> : (
          <>
            <div className="flex flex-col md:flex-row md:justify-between mt-5">
              {/* Course Details */}
              <div className="md:w-3/4">
                <h1 className="text-3xl font-bold mb-4">{course?.title}</h1>
                <p className="text-lg mb-4">{course?.description}</p>
                <p className="text-lg">Type: {course?.type}</p>
                <p className="text-lg">Price: ${course?.price}</p>

                {user.userType == 'student' && !course?.participants.filter((participant) => participant.id === user.id)[0] && <button onClick={() => { handleSubscribeToCourse(course) }} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md inline-block">
                  Subscribe to Course
                </button>}
              </div>
              {/* Link to Chapters */}
              <div className="md:w-1/4 mt-4 md:mt-0">
                {user.userType == 'student' && course?.participants.filter((participant) => participant.id === user.id)[0] &&
                  <Link to={`/course/${id}/chapters`} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md inline-block">
                    View Chapters
                  </Link>
                }

                {user.userType == 'teacher' &&
                  <Link to={`/course/${id}/chapters`} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md inline-block">
                    View Chapters
                  </Link>
                }
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>
              <div className="flex items-center mb-4">
                <label htmlFor="rating" className="mr-2">Rating:</label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  min="1"
                  max="5"
                  value={review.rating}
                  onChange={handleChange}
                  className="border rounded-md p-2 w-20"
                />
              </div>
              <textarea
                value={review.content}
                name="content"
                onChange={handleChange}
                className="border rounded-md p-2 w-full h-32 mb-4"
                placeholder="Enter your review..."
              ></textarea>
              <button
                onClick={handleReviewSubmit}
                disabled={submittingReview}
                className=" bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded-md inline-block"
              >
                {submittingReview ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Reviews</h2>
              {reviews.map((review, index) => (
                <div key={index} className="border rounded-md p-4 mb-4">
                  <p className="font-semibold">Rating: {review.rating}</p>
                  <p>Reviewer: {review.reviewer.username}</p>
                  <p>{review.content}</p>

                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SingleCourse;
