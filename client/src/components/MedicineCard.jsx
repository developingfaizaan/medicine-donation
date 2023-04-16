import {Link} from 'react-router-dom';

import { useAuth } from "../context/auth";
import {Avatar} from "./"

const MedicineCard = ({job}) => {
    const {
        name, description, qty, condition, image, _id:id,
        postedBy: { name: userName, profilePhoto, _id: userId },
      } = job;

    const { user } = useAuth();

  
  return (
    <Link to={`/medicine/${id}`}>
        <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <img className="w-full h-56 object-cover" src={image} alt={name} />
        <div className="px-4 py-2">
            <h2 className="text-gray-800 font-semibold text-xl mt-3 mb-2">{name}</h2>
            <p className="text-gray-600 text-sm truncate">{description}</p>
            <p className="text-gray-600 text-sm mt-2">Quantity: <span className="font-semibold">{qty}</span></p>
            <p className="text-gray-600 text-sm mt-1 mb-2">Condition: <span className="font-semibold">{condition}</span></p>
        </div>
        <div className="flex items-center justify-between px-4 py-3 bg-white200">
            <div className="flex items-center">
            {/* <Link to={`/user/${userId}`} title="Profile Page"> */}
                <Avatar name={userName} profilePhoto={profilePhoto} />
            {/* </Link> */}
            {/* <img className="w-10 h-10 object-cover rounded-full border-2 border-gray-600" src={profilePhoto} alt={userName} />
            <p className="text-gray700 ml-2">{userName}</p> */}
            </div>
        </div>
        </div>
    </Link>
  )
}

export default MedicineCard;