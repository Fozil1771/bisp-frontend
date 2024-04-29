import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserAction } from '../../store/Auth/authAction';
import { Link, useNavigate } from "react-router-dom";
import { getCourseList, logIn } from '../../api';
import { setCoursesAction } from '../../store/Course/courseAction';
import Navbar from '../../components/global/Navbar';

import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    userType: 'student', // Default user type (you can modify this as needed)
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic (you can add your authentication logic here)
    try {
      const response = await logIn(formData.userType, formData);

      const { user, token } = response;
      const dataCourses = await getCourseList();
      dispatch(setCoursesAction(dataCourses));
      // user.userType = formData.userType;
      user.password = ""
      dispatch(setUserAction({ ...user, userType: formData.userType, token }));


      navigate('/profile');

    } catch (error) {
      console.error('Signup Error:', error);
    }

  };

  return (
    <>
      <Navbar />

      <section className="relative flex flex-wrap lg:h-screen lg:items-center">
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

            <p className="mt-4 text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla eaque error neque
              ipsa culpa autem, at itaque nostrum!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
            <FloatLabel className="mb-6">
              <InputText name="email" required className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500' id="email" value={formData.email} onChange={handleChange} />
              <label htmlhtmlFor="email">Email</label>
            </FloatLabel>

            <FloatLabel className="mb-6">
              <Password
                type="password"
                required
                className='w-full px-3 py-2 border rounded-md focus:outline-none input-password'
                id="password"
                name="password"
                feedback={false}
                value={formData.password} onChange={handleChange} />
              <label htmlFor="email">Password</label>
            </FloatLabel>

            <Dropdown
              className="mb-6 w-full border rounded-md focus:outline-none focus:border-blue-500"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              options={[
                { name: 'Student', value: 'student' },
                { name: 'Teacher', value: 'teacher' },
                { name: 'Admin', value: 'admin' },

              ]}
              optionLabel="name"
              placeholder="User"
            />

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                No account?
                <Link className="underline" to={"/signup"}>Sign up</Link>
              </p>

              <button
                type="submit"
                className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>

        <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </section>
      {/* <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-6 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit}>

            <FloatLabel className="mb-6">
              <InputText name="email" required className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500' id="email" value={formData.email} onChange={handleChange} />
              <label htmlhtmlFor="email">Email</label>
            </FloatLabel>

            <FloatLabel className="mb-6">
              <Password
                type="password"
                required
                className='w-full px-3 py-2 border rounded-md focus:outline-none input-password'
                id="password"
                name="password"
                feedback={false}
                value={formData.password} onChange={handleChange} />
              <label htmlhtmlFor="email">Password</label>
            </FloatLabel>

            <Dropdown
              className="mb-6 w-full border rounded-md focus:outline-none focus:border-blue-500"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              options={[
                { name: 'Student', value: 'student' },
                { name: 'Teacher', value: 'teacher' },
                { name: 'Admin', value: 'admin' },

              ]}
              optionLabel="name"
              placeholder="User"
            />


            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Login
            </button>
            <p className="text-center mt-4">
              Don't have an account?{' '}
              <Link to={"/signup"} className="text-blue-500 hover:text-blue-700">
                Sign up
              </Link>
            </p>
          </form>
        </div >
      </div > */}
    </>
  );
};

export default Login;
