import { Navigate, createBrowserRouter, redirect } from "react-router-dom";
import HomePage from "../views/HomePage";
import BusinessPage from "../views/Business";
import Signup from "../views/Auth/Signup"; // Assuming you have a Signup component
import Login from "../views/Auth/Login";
import Profile from "../views/Profile";
import NotFound from "../views/NotFound";
import { useSelector } from "react-redux";
import { CourseDetail, CourseCreate } from "../views/CourseCreation";
import { SingleCourse } from "../views/CoursePublic";
import AllCourses from "../views/CoursePublic/AllCourses";
import AboutPage from "../views/About";
import TeacherDetailsPage from "../views/Admin/teacherDetailsPage";
import SingleCourseContents from "../views/CoursePublic/SingleCourseContents";
import SettingsPage from "../views/Profile/Settings";
import CheckoutPage from "../views/Checkout";
import CourseDetailsPage from "../views/Admin/CourseDetailsPage";
import ApplyForm from "../components/ApplyForm";

const isAuthenticated = () => {
  // Replace 'auth' with the actual slice name in your Redux store
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  if (!isAuthenticated) {
    return redirect('/login')
  }
  return isAuthenticated;
};

const isTeacher = () => {
  // Replace 'auth' with the actual slice name in your Redux store
  const user = useSelector((state) => state.auth?.user);
  if (user.userType !== 'teacher') {
    return false
  }
  return true;
};

const isAdmin = () => {
  // Replace 'auth' with the actual slice name in your Redux store
  const user = useSelector((state) => state.auth?.user);
  if (user.userType !== 'admin') {
    return false
  }
  return true;
};

export const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    loader() {
      // Our root route always provides the user, if logged in
      return null;
    },
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "/business",
        Component: BusinessPage,
      },
      {
        path: "/business/apply",
        Component: ApplyForm,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/signup",
        Component: Signup,
      },
      {
        path: "/profile",
        action: isAuthenticated,
        // You may want to add authentication logic here before rendering the Profile component
        Component: Profile,
      },
      {
        path: "/profile/settings",
        action: isAuthenticated,
        // You may want to add authentication logic here before rendering the Profile component
        Component: SettingsPage,
      },
      {
        path: "profile/:teacherId/course/create",
        Component: CourseCreate,
      },
      {
        path: "profile/course/:teacherId/:id",
        action: isTeacher,
        Component: CourseDetail
      },
      {
        path: "teacher-details/:teacherId",
        action: isAdmin,
        Component: TeacherDetailsPage
      },
      {
        path: "course-details/:courseId",
        action: isAdmin,
        Component: CourseDetailsPage
      },
      {
        path: "course/:id/chapters",
        Component: SingleCourseContents,
      },
      {
        path: "course/:id",
        Component: SingleCourse,
      },
      {
        path: "courses/all",
        Component: AllCourses,
      },
      {
        path: "about-us",
        Component: AboutPage,
      },
      {
        path: "checkout/:courseId",
        Component: CheckoutPage,
      },
    ],
  },
  {
    path: "/logout",
    async action() {
      // We signout in a "resource route" that we can hit from a fetcher.Form
      return redirect("/");
    },
  },
  {
    path: "/*", // Wildcard route to match any path not matched by the previous routes
    Component: NotFound,
  },
]);
