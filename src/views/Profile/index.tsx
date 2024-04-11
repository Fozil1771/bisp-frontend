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
import Navbar from '../../components/global/Navbar';

// interface ProfileProps {
//   user: UserProfile;
// }

const Profile = () => {
  // const navigate = useNavigate()

  const user = useSelector((state: IAuthState) => state.auth?.user);


  if (!user) {
    return (<Navigate to="/login" replace />)
  }


  return (
    <>
      <Navbar />
      {user.userType === 'student' ?
        <Student user={user} /> : user.userType === 'teacher'
          ? <Teacher user={user} /> : <Admin user={user} />}
    </>
  );

};

export default Profile;
