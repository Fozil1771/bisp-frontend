import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { createCourseRating, getCoursePublicById } from '../../api';
import Loader from '../../components/Loader';
import Navbar from '../../components/global/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { IAuthState } from '../../types';
import toast, { Toaster } from 'react-hot-toast';
import { addCourseToCartAction } from '../../store/Cart/cartAction';
import { estimateReadingTime } from '../../utils';
import { Rating } from 'primereact/rating';
import { BreadCrumb } from 'primereact/breadcrumb';
import Reviews from './Reviews';
import { Avatar } from 'primereact/avatar';
import { ProgressBar } from 'primereact/progressbar';



const SingleCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courseProgress, setCourseProgress] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [review, setReview] = useState({
    rating: null,
    content: '',
  });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviews, setReviews] = useState([]);
  const notify = (msg: string) => toast(msg);



  const user = useSelector((state: IAuthState) => state.auth?.user) ?? false;

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

    if (user && course.chapters.length > 0) {
      const completedChaptersCount = course?.chapters.reduce((count, chapter) => {
        const hasProgress = user.progress.some((p) => p.chapterId === chapter.id && p.isCompleted);
        return count + (hasProgress ? 1 : 0);
      }, 0);

      const progressPercentage = course?.chapters.length ? (completedChaptersCount / course?.chapters.length) * 100 : 0;
      setCourseProgress(progressPercentage);
    }



  }, [id]);

  if (user && user.userType == 'student') {
    if (course?.participants?.includes(user.id)) {
      setIsEnrolled(true);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    const parsedValue = value;

    console.log(name)

    setReview((prevData) => ({ ...prevData, [name]: parsedValue }));
  };

  const handleReviewSubmit = async () => {
    if (user) {
      try {
        setSubmittingReview(true);
        const updatedCourse = await getCoursePublicById(id);
        // Submit the review to your API
        await createCourseRating(id, user.id, review);
        // After successful submission, you can update the UI or fetch the updated course data
        setReviews(updatedCourse.ratings);
        setReview({ rating: 0, content: '' });
        notify("Review submitted successfully");
      } catch (error) {
        console.error('Error submitting review:', error);
      } finally {
        setSubmittingReview(false);
      }
    } else {
      console.log("toast")
      notify("Please login to submit a review");
    }
  };

  const handleDeleteReview = async () => {
    try {
      notify("Review deleted successfully");
    } catch (error) {
      console.error('Error submitting review:', error);
    }

  };
  const handleSubscribeToCourse = async (course) => {
    dispatch(addCourseToCartAction(course))
    return navigate('/checkout/' + course.id);
    // try {
    //   // const response = await enrollToCourse(user.id, course.id);
    //   // console.log(response);

    // } catch (error) {
    //   console.error('Error subscribing to course:', error);
    // }
  }



  return (
    <>
      <Navbar />
      <Toaster position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 3000,
          style: {
            background: '#dd3a3a',
            color: '#fff',
          },
        }} />
      <div className='max-w-7xl mx-auto h-[100vh] px-4'>
        {/* Sidebar */}
        <BreadCrumb
          className='px-0'
          model={
            [
              { label: 'Courses', url: '/courses/all' },
            ]
          }
          home={{ icon: 'pi pi-home', url: '/' }}
        />
        {loading ? <Loader loading={loading} /> : (

          <>
            <div className='mt-4'>
              <div className=''>
                <h1 className="text-3xl font-bold mb-4">{course?.title}</h1>


                {courseProgress && (
                  <>
                    <h5>Your Progress:</h5>
                    <ProgressBar value={courseProgress}></ProgressBar>
                  </>
                )}

              </div>
              <div className="flex flex-col md:flex-row md:justify-between mt-5">
                {/* Course Details */}
                <div className="md:w-3/4 flex gap-5">
                  <div>

                    <img
                      className="max-w-[400px] h-[250px] object-cover mb-4 rounded-md"
                      src={`http://localhost:3003/public/course/${course.banner}`}
                      alt={`Image for ${course.title}`}
                    />
                    <p className="text-lg mb-4">{course?.description}</p>
                    <p className="text-lg">Type: {course?.type}</p>
                    <p className="text-lg">Price: ${course?.price}</p>


                    <h4 className='text-lg'>Enrolled: {course?.participants?.length}</h4>

                    <div className='mt-4'>
                      <div className=' flex gap-2 items-center'>
                        <Avatar
                          className='bg-gray-900'
                          image={`http://localhost:3003/public/profile/${user.imageUrl}`}
                          icon="pi pi-user"
                          size="small"
                          shape="circle" />
                        <span>{`${user.firstName} ${user.firstName}`}</span>
                      </div>


                    </div>

                    {user && user.userType == 'student' && !course?.participants.filter((participant) => participant.id === user.id)[0] && <button onClick={() => { handleSubscribeToCourse(course) }} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md inline-block">
                      Subscribe to Course
                    </button>}
                    {/* {user && user.userType == 'student' && !course?.participants.filter((participant) => participant.id === user.id)[0] && <Link to={`/checkout/${course.id}`} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md inline-block">
                  Subscribe to Course
                </Link>} */}
                  </div>
                  <div>
                    <h5 className='text-lg'>Table of content</h5>
                    <ul>
                      {course?.chapters.map((chapter) => (
                        <li className="" key={chapter.id}>{chapter.title} - {estimateReadingTime(chapter.html)} minutes</li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* Link to Chapters */}
                <div className="md:w-1/4 mt-4 md:mt-0">
                  {user.userType == 'student' && course?.participants.filter((participant) => participant.id === user.id)[0] &&
                    <Link to={`/course/${id}/chapters`} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md inline-block">
                      View Chapters
                    </Link>
                  }

                  {user && user.userType == 'teacher' &&
                    <Link to={`/course/${id}/chapters`} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md inline-block">
                      View Chapters
                    </Link>

                  }
                  {!user && <Link to={'/login'} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md inline-block">Login to subscribe</Link>}

                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>
                <div className="flex items-center mb-4">
                  <label htmlFor="rating" className="mr-2">Rating:</label>
                  {/* <input
                  type="number"
                  id="rating"
                  name="rating"
                  min="1"
                  max="5"
                  value={review.rating}
                  onChange={handleChange}
                  className="border rounded-md p-2 w-20"
                /> */}
                  <Rating name="rating" className='text-amber-300' value={review.rating} onChange={handleChange} />

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

              <div className="mt-8 mb-8">

                <Reviews reviews={reviews} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SingleCourse;
