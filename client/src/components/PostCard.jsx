import { Link } from "react-router-dom";

import { Avatar } from "./";
import { useAuth } from "../context/auth";

const PostCard = ({ job }) => {
  const {
    title,
    description,
    createdAt,
    payment,
    postedBy: { name, profilePhoto, _id: userId },
  } = job;
  const { user } = useAuth();

  return (
    <article className="mb-16 bg-white rounded-lg shadow-sm overflow-hidden">
      <header className="flex justify-between items-center p-10">
        <div className="flex items-center gap-2">
          <Link to={`/user/${userId}`} title="Profile Page">
            <Avatar name={name} profilePhoto={profilePhoto} />
          </Link>
          <small className="text-gray400">
            • {new Date(createdAt).toLocaleDateString()}
          </small>
        </div>
      </header>

      <Link to={`/job/${job._id}`}>
        <div className="px-10">
          <h3 className="text-xl mb-3 font-medium text-gray-900">{title}</h3>
          <p className="mb-8 text-gray800 truncate">{description}</p>
        </div>

        <div className="px-10 py-6 bg-primary flex justify-between items-center">
          <h4 className="font-medium text-white text-lg">${payment}/day</h4>

          {user &&
            user?.user?.role !== "donor" && (
              <button className="bg-white text-primary py-2 px-5 rounded-md">
                Apply Now
              </button>
            )}
        </div>
      </Link>
    </article>
  );
};

export default PostCard;
