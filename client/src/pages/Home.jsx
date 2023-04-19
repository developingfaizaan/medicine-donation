import { useState, useEffect } from "react";

import { fetchJobs } from "../api";
import { PostCard, Loader } from "../components";
import MedicineCard from "../components/MedicineCard";

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs()
      .then(({data}) => {
        setJobs(data.jobs.reverse());
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <main className="w-full max-w-7xl m-auto sm:px-32 py-20 flex gap-6 flex-wrap justify-center">
      
      {loading && <Loader />}

      {!loading && jobs.length === 0 && (
        <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-8 sm:mb-14">
          No Medicines to show!
        </h1>
      )}

      {/* {jobs && jobs.map((job) => <PostCard job={job} key={job._id} /> )} */}
      {jobs && jobs.map((job) => <MedicineCard job={job} key={job._id} /> )}
    </main>
  );
};

export default HomePage;
