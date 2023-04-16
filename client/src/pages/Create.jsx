import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import FileBase from "react-file-base64";


import { Input, Textarea, Button, Error, Select } from "../components";
import { createJob, updateJob } from "../api";
import { useAuth } from "../context/auth";

const CreatePage = () => {
  const { user } = useAuth();
  const [job, setJob] = useState({ name: "", description: "", expiry: "", manf: "", qty: "", condition: "sealed", contact: "", image: "", postedBy: JSON.parse(localStorage.getItem("auth")).user.id });
  const [error, setError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const locationUrl = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (locationUrl.state) {
      setIsUpdating(true);

      const { name, description, expiry, manf, qty, condition, contact, image } = locationUrl.state;

      setJob({ name, description, expiry, manf, qty, condition, contact, image, postedBy: JSON.parse(localStorage.getItem("auth")).user.id });
    }
  }, [locationUrl.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isUpdating) {
        const { data } = await updateJob(locationUrl.state._id, job);

        console.log(data);
        if (data.error) return setError(data.message);
      } else {
        const { data } = await createJob(job);

        if (data.error) return setError(data.message);

        console.log(data.error);
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
      <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-8 sm:mb-14">Donate Your Unused Medicines!</h1>
      {error && <Error message={error} />}

      <form onSubmit={handleSubmit}>
        <Input label="Name of Medicine" type="text" value={job.name} onChange={(e) => setJob({ ...job, name: e.target.value })} />
        <Input label="Description of Medicine" type="text" value={job.description} onChange={(e) => setJob({ ...job, description: e.target.value })} />
        <Input label="Expiry date" type="text" value={job.expiry} onChange={(e) => setJob({ ...job, expiry: e.target.value })} />
        <Input label="Manufacturer's name" type="text" value={job.manf} onChange={(e) => setJob({ ...job, manf: e.target.value })} />
        <Input label="Quantity of medicine available for donation" type="number" value={job.qty} onChange={(e) => setJob({ ...job, qty: e.target.value })} />
        <Select label="Condition of the medicine" value={job.condition} onChange={(e) => setJob({ ...job, condition: e.target.value })} items={["Sealed", "Unopened", "Partially Used"]} />
        <Textarea label="Contact details with phone number" type="text" value={job.contact} onChange={(e) => setJob({ ...job, contact: e.target.value })} />
        <div className="my-7">
            <label className="block mb-2 text-white700 text-md">Medicine Image</label>
            <div className="py-3 px-5 font-poppins text-gray900 bg-white border-2 border-white200 rounded-[4px] outline-none focus:outline-primary ease-out duration-200 w-full placeholder:normal placeholder:text-white400">
              <FileBase type="file" multiple={false} onDone={({ base64 }) => setJob({ ...job, image: base64 })} />
            </div>
          </div>
        <Button type="submit">List for Donation</Button>
      </form>
    </main>
  );
};

export default CreatePage;
