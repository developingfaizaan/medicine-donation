import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { useAuth } from "../context/auth";
import { fetchmedicine, deletemedicine } from "../api";
import { Button, Avatar, Loader } from "../components";
import { useTranslate } from "../context/translate";
import { deleteIcon, editIcon } from "../assets";
import {emailBodyGenerate} from '../utils'

const PostPage = () => {
  const [error, setError] = useState();
  const [medicine, setmedicine] = useState(null);
  const [loading, setLoading] = useState("true");
  const { user } = useAuth();
  const { language } = useTranslate();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchmedicine(id)
      .then(({ data }) => {
        if (!data.medicine) return setError(data.message);

        setmedicine(data.medicine);
        setLoading(false);
      })
      .catch((error) => setError(error.response.data.message));
  }, [id]);

  const handleDelete = async () => {
    const deleteConfirmation = window.confirm("Are you sure, you want to delete this medicine?");

    if (!deleteConfirmation) return;

    try {
      await deletemedicine(medicine._id);

      navigate("/");
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const handleEdit = () => navigate("/donate", { state: medicine });

  if (!id) return <h1>No Medicine with this ID</h1>;

  return (
    <main className="w-full max-w-4xl my-20 mx-auto px-5 md:px-12 sm:px-32">
      {error && (
        <>
          <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-8 sm:mb-14">{error}</h1>
          <Link to="/"><Button>Go to Home Page</Button></Link>
        </>
      )}

      {loading && <Loader />}

      {!loading && medicine && (
        <>
          <header className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Link to={`/user/${medicine.postedBy._id}`} title="Profile Page">
                <Avatar name={medicine.postedBy.name} profilePhoto={medicine.postedBy.profilePhoto} />
              </Link>
            </div>
            <div className="flex gap-10 text-white700">
              {medicine.postedBy._id === user?.user?.id &&
              (location.pathname.startsWith("/user") ||
                location.pathname.startsWith("/medicine")) ? (
                <>
                  <button className="sm:flex items-center gap-1" title="Edit medicine" onClick={handleEdit}>
                    <img src={editIcon} alt="edit" />
                  </button>

                  <button className="sm:flex items-center gap-1" title="Delete medicine" onClick={handleDelete}>
                    <img src={deleteIcon} alt="delete" />
                  </button>
                </>
              ) : ("")}
            </div>
          </header>

          <figure className="flex flex-col md:flex-row gap-8 my-12">
            <img src={medicine.image} alt={medicine.name}  />
            
            <div className="mt-5">
              <h2 className="text-2xl font-medium text-gray-900">{medicine.name}</h2>
              <p className="my-3 text-gray700 whitespace-pre-line">{medicine.description}</p>
            </div>
          </figure>



          <div className="flex gap-2 mt-10">
            <h4 className="text-lg">Expiry Date:</h4>
            <p className="font-semibold text-lg text-primary">{medicine.expiry}</p>
          </div>

          <div className="flex gap-2 mt-5">
            <h4 className="text-lg">Quantity of medicine:</h4>
            <p className="font-semibold text-lg text-primary">{medicine.qty}</p>
          </div>

          <div className="flex items-center gap-2 mt-5">
            <h4 className="text-lg">Manufacture Company:</h4>
            <p className="font-semibold text-xl text-primary">{medicine.manf}</p>
          </div>

          <div className="flex items-center gap-2 mt-5">
            <h4 className="text-lg">Condition of medicine:</h4>
            <p className="font-semibold text-xl text-primary">{medicine.condition}</p>
          </div>

          {/* name, description, expiry, manf, qty, condition, contact, image */}
        

          {user ? (
            <div className="mt-5">
              <h4 className="text-lg">Contact Info:</h4>
              <div className="pt-1">
                <div className="flex items-center"> 
                  <p className="font-semibold text-lg text-primary">{medicine.contact}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="my-10">
              <Link to="/login"><Button>{language.LoginToSeeDetails}</Button></Link>
            </div>
          )}

          {user && user?.user?.role === "organization" ? (
            <div className="my-10"> 
              <a href={`mailto:${medicine.postedBy.email}?subject=${"Want Donation of " + medicine.name}&body=${emailBodyGenerate(user.user.name, medicine.name)}`} target="_blank" rel="noreferrer" >
                <Button>Place a request to receive medicine</Button>
              </a>
            </div>
          ): ""}
        </>
        
      )}
    </main>
  );
};

export default PostPage;
