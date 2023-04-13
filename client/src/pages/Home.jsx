import { useState, useEffect } from "react";

import { fetchJobs } from "../api";
import { PostCard, Loader } from "../components";

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
    <main className="w-full max-w-4xl m-auto px-5 md:px-12 sm:px-32 py-20">
      
      {loading && <Loader />}

      {!loading && jobs.length === 0 && (
        <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-8 sm:mb-14">
          No jobs to show!
        </h1>
      )}

      {jobs && jobs.map((job) => <PostCard job={job} key={job._id} /> )}
    </main>
  );
};

export default HomePage;
