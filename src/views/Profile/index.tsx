// interface UserProfile {
//   username: string;
//   email: string;
//   userType: string;
//   // Add more user-related fields as needed
// }
import { useDispatch, useSelector } from 'react-redux';
import Layout from "../../components/Layout";
import { Navigate } from 'react-router-dom';
import Student from './Student';
import Teacher from './Teacher';
import Admin from './Admin';
import { IAuthState } from '../../types';
import { logoutAction } from '../../store/Auth/authAction';

// interface ProfileProps {
//   user: UserProfile;
// }

const Profile = () => {
  // const navigate = useNavigate()
  const dispatch = useDispatch();
  const user = useSelector((state: IAuthState) => state.auth?.user);
  console.log(user)


  if (!user) {
    return (<Navigate to="/login" replace />)
  }

  const handleLogout = () => {
    dispatch(logoutAction());
    return (<Navigate to="/login" replace />)
  }

  return (
    <Layout>
      {user.userType === 'student' ?
        <Student user={user} /> : user.userType === 'teacher'
          ? <Teacher user={user} /> : <Admin user={user} />}

      <button
        onClick={handleLogout}
        className="text-white border border-white px-4 py-2 rounded-md">Logout</button>
    </Layout>
  );

};

export default Profile;
