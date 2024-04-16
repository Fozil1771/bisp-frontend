import { useState, useEffect } from 'react';
import Navbar from '../../components/global/Navbar';
import { IAuthState } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { editStudentById, editTeacherById } from '../../api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Compressor from 'compressorjs';
import { setUserAction } from '../../store/Auth/authAction';

const SettingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: IAuthState) => state.auth?.user);

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    bio: user.bio,
    password: '',
    confirmPassword: '',
  });
  const [avatar, setAvatar] = useState();
  const [preview, setPreview] = useState()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData)
    try {
      const compressPromise = new Promise((resolve, reject) => {
        new Compressor(avatar, {
          quality: 0.8,
          success: async (imageUrl) => {
            const formDataImage = new FormData();
            const avatarName = user.email.substring(0, user.email.indexOf('@'));

            formDataImage.append('imageUrl', imageUrl);
            formDataImage.append('username', avatarName);

            try {
              const response = await axios.post('http://localhost:3003/api/teacher/image', formDataImage, {
                headers: { 'Content-Type': 'multipart/form-data' }
              });
              resolve(response.data);
            } catch (error) {
              reject(error);
            }
          },
        });
      });
      let editTeacherPromise;
      if (user.userType === "teacher") {
        editTeacherPromise = editTeacherById(user.id, { ...formData, imageUrl: `${user.email.substring(0, user.email.indexOf('@')).split(" ").join("_")}_avatar.jpg` });
      } else if (user.userType === "student") {
        editTeacherPromise = editStudentById(user.id, { ...formData, imageUrl: `${user.email.substring(0, user.email.indexOf('@')).split(" ").join("_")}_avatar.jpg` });
      }

      const results = await Promise.allSettled([compressPromise, editTeacherPromise]);
      const errors = results.filter(result => result.status === 'rejected');
      if (errors.length > 0) {
        errors.forEach(error => console.error('Error:', error.reason));
        // Handle failure
      } else {
        dispatch(setUserAction({ ...formData, imageUrl: `${user.email.substring(0, user.email.indexOf('@')).split(" ").join("_")}_avatar.jpg`, id: user.id, email: user.email, userType: user.userType, token: user.token }));
        navigate('/profile')
      }

    } catch (error) {
      console.error('Error:', error);
    }

  };

  useEffect(() => {
    // setFormData(user);

    if (!avatar) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(avatar)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [avatar]);



  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">Profile Settings</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <div className="flex items-center justify-center max-w-full">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">

                {!avatar && (
                  <>
                    <span>Upload Profile Image</span>
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG (MAX. 800x400px)</p>
                    </div>
                  </>

                )}
                {avatar && (
                  <>

                    <img src={preview} className='w-48 h-48 object-cover rounded-full' />
                    <p>{avatar?.name}</p>
                  </>
                )}
                <input
                  id="dropzone-file"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  name="image"
                  onChange={(e) => setAvatar(e.target.files[0])} />
              </label>
            </div>

          </div>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              FirstName
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              defaultValue={user.firstName}
              onChange={handleChange}
              className="mt-1 p-2 block w-full text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              LastName
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              defaultValue={user.lastName}
              onChange={handleChange}
              className="mt-1 p-2 block w-full text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              defaultValue={user.username}
              onChange={handleChange}
              className="mt-1 p-2 block w-full text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}

              className="mt-1 p-2 block w-full text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              rows={4}
              id="bio"
              name="bio"
              value={formData.bio}
              defaultValue={user.bio}
              onChange={handleChange}
              className="mt-1 p-2 block w-full text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 block w-full text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 p-2 block w-full text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
};

export default SettingsPage;
