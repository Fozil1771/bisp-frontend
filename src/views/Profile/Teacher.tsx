import { IUser } from "../../types";

interface IProps {
  user: IUser;
}

const Teacher: React.FC<IProps> = ({ user }) => {
  return (
    <header className="bg-gray-900 mb-96 mx-auto">
      <div className=" px-8 h-[22rem] lg:px-48 translate-y-64">
        <img
          src="/image/avatar1.jpg"
          alt="avatar"
          className="w-40 rounded-xl"
        />
        <div className="flex mt-16 justify-between">
          <h5 className="text-3xl text-white">{user.username}</h5>
          <button className="text-white border border-white px-4 py-2 rounded-md">follow</button>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 mt-3">
            <span className="text-gray-900 font-bold">323</span>
            <span className="text-gray-500 font-normal">Posts</span>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-gray-900 font-bold">3.5k</span>
            <span className="text-gray-500 font-normal">Followers</span>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-gray-900 font-bold">260</span>
            <span className="text-gray-500 font-normal">Following</span>
          </div>
        </div>
        <p className="text-gray-500 mt-8">
          A wordsmith who believes in the power of language to shape our world,
          inspire change, and connect us all. I bring a unique perspective to
          the writing, blending the knowledge and experiences into
          thought-provoking narratives.
        </p>
        <button className="flex items-center gap-2 mt-2 text-white">
          more about me
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-5 w-5 text-white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </header >
  );
}

export default Teacher