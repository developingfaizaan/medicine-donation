import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { useAuth } from "../context/auth";
import { fetchJob, deleteJob } from "../api";
import { Button, Avatar, Loader } from "../components";
import { useTranslate } from "../context/translate";
import { phoneIcon, mailIcon, dateIcon, locationIcon, deleteIcon, editIcon } from "../assets";

const PostPage = () => {
  const [error, setError] = useState();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState("true");
  const { user } = useAuth();
  const { language } = useTranslate();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchJob(id)
      .then(({ data }) => {
        if (!data.job) return setError(data.message);

        setJob(data.job);
        setLoading(false);
      })
      .catch((error) => setError(error.response.data.message));
  }, [id]);

  const handleDelete = async () => {
    const deleteConfirmation = window.confirm("Are you sure, you want to delete this job?");

    if (!deleteConfirmation) return;

    try {
      await deleteJob(job._id);

      navigate("/");
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const handleEdit = () => navigate("/create", { state: job });

  if (!id) return <h1>No Job with this ID</h1>;

  return (
    <main className="w-full max-w-4xl my-20 mx-auto px-5 md:px-12 sm:px-32">
      {error && (
        <>
          <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-8 sm:mb-14">{error}</h1>
          <Link to="/"><Button>Go to Home Page</Button></Link>
        </>
      )}

      {loading && <Loader />}

      {!loading && job && (
        <>
          <header className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Link to={`/user/${job.postedBy._id}`} title="Profile Page">
                <Avatar name={job.postedBy.name} profilePhoto={job.postedBy.profilePhoto} />
              </Link>
            </div>
            <div className="flex gap-10 text-white700">
              {job.postedBy._id === user?.user?.id &&
              (location.pathname.startsWith("/user") ||
                location.pathname.startsWith("/job")) ? (
                <>
                  <button className="sm:flex items-center gap-1" title="Edit Job" onClick={handleEdit}>
                    <img src={editIcon} alt="edit" />
                  </button>

                  <button className="sm:flex items-center gap-1" title="Delete Job" onClick={handleDelete}>
                    <img src={deleteIcon} alt="delete" />
                  </button>
                </>
              ) : ("")}
            </div>
          </header>

          <div className="flex justify-between my-4">
            <div className="flex items-center my-7">
              <img src={locationIcon} alt="Location" className="mr-2" />
              <p className="font-medium text-lg">{job.location}</p>
            </div>
            <div className="flex items-center my-7">
              <img src={dateIcon} alt="Date" className="mr-2" />
              <p className="font-medium text-lg">{new Date(job.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <h2 className="text-2xl font-medium text-gray-900">{job.title}</h2>
          <a className="block mt-2 ml-auto w-max text-gray700 font-semibold hover:text-primaryDark hover:translate-x-1 transition-transform" href={`https://translate.google.co.in/?sl=auto&tl=en&text=${job.description}&op=translate`} target="_blank" rel="noreferrer">Translate to English</a>
          <p className="my-3 text-gray700 whitespace-pre-line">{job.description}</p>

          <div className="flex items-center gap-2 mt-10">
            <h4 className="text-lg">{language.Payment}:</h4>
            <p className="font-semibold text-xl text-primary">$<span>{job.payment}</span>/day</p>
          </div>

          <div className="flex gap-2 mt-5 ">
            <h4 className="text-lg">{language.GermanLangProf}:</h4>
            <p className="font-semibold text-lg text-primary">{job.germanLang.toUpperCase()}</p>
          </div>

          {user ? (
            <div className="mt-5">
              <h4 className="text-lg">{language.ContactInfo}:</h4>
              <div className="p-4">
                <div className="flex items-center">
                  <img src={phoneIcon} alt="Phone" className="mr-2" />
                  <p className="font-medium text-lg">{job.phoneNo}</p>
                </div>
                <div className="flex items-center my-4">
                  <img src={mailIcon} alt="Email" className="mr-2" />
                  <p className="font-medium text-lg">{job.postedBy.email}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="my-10">
              <Link to="/login"><Button>{language.LoginToSeeDetails}</Button></Link>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default PostPage;
