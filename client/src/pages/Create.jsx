import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

import { Input, Textarea, Button, Error, Select } from "../components";
import { createJob, updateJob } from "../api";
import { useAuth } from "../context/auth";
import { useTranslate } from "../context/translate";

const CreatePage = () => {
  const { user } = useAuth();
  const { language } = useTranslate();
  const [job, setJob] = useState({ title: "", description: "", location: "", phoneNo: "", payment: "", germanLang: "beginner", postedBy: JSON.parse(localStorage.getItem("auth")).user.id });
  const [error, setError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const locationUrl = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (locationUrl.state) {
      setIsUpdating(true);

      const { title, description, location, phoneNo, payment, germanLang } = locationUrl.state;

      setJob({ title, description, location, phoneNo, payment, germanLang, postedBy: JSON.parse(localStorage.getItem("auth")).user.id });
    }
  }, [locationUrl.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isUpdating) {
        const { data } = await updateJob(locationUrl.state._id, job);

        if (data.error) return setError(data.message);
      } else {
        const { data } = await createJob(job);

        if (data.error) return setError(data.message);
      }

      navigate(`/user/${user.user.id}`);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  if (user.user.role === "organization") {
    return (
      <div className="w-8/12 sm:w-9/12 m-auto my-24">
        <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-9 text-center">Your account is a Organization type! You cannot post a medicine for donation.</h1>
        <Link to="/"><Button>Go to Homepage</Button></Link>
      </div>
    );
  }

  return (
    <main className={`w-full max-w-4xl m-auto px-5 md:px-12 sm:px-32 py-20`}>
      <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-8 sm:mb-14">{language.CreateJob}!</h1>
      {error && <Error message={error} />}

      <form onSubmit={handleSubmit}>
        <Input label={language.Title} type="text" value={job.title} onChange={(e) => setJob({ ...job, title: e.target.value })} />
        <Textarea label={language.Description} type="text" value={job.description} onChange={(e) => setJob({ ...job, description: e.target.value })} />
        <Input label={language.Location} type="text" value={job.location} onChange={(e) => setJob({ ...job, location: e.target.value })} />
        <Input label={language.Contact} type="text" value={job.phoneNo} onChange={(e) => setJob({ ...job, phoneNo: e.target.value })} />
        <Input label={language.Payment} type="number" value={job.payment} onChange={(e) => setJob({ ...job, payment: e.target.value })} />
        <Select label={language.GermanLangProf} value={job.germanLang} onChange={(e) => setJob({ ...job, germanLang: e.target.value })} items={Object.values(language.germanLang)} itemValues={Object.keys(language.germanLang)} />
        <Button type="submit">{language.CreateJob}</Button>
      </form>
    </main>
  );
};

export default CreatePage;
