import { IUser } from "../../types"


interface IProps {
  user: IUser;
}

const Admin: React.FC<IProps> = ({ user }) => {
  return (
    <div className="">
      <h2 className="text-2xl font-semibold mb-6">Admin</h2>
      <div className="mb-4">
        <label className="block text-gray-600 text-sm font-medium mb-2">
          Username
        </label>
        <p className="text-gray-800">{user.username}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 text-sm font-medium mb-2">
          Email
        </label>
        <p className="text-gray-800">{user.email}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 text-sm font-medium mb-2">
          User Type
        </label>
        <p className="text-gray-800">{user.userType}</p>
      </div>
      {/* Add more user-related fields as needed */}
    </div>
  )
}

export default Admin