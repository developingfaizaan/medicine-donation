import axios from "axios";

const API = axios.create({ baseURL: "https://medicine-donation-server.vercel.app/" });
// const API = axios.create({ baseURL: "http://localhost:1337/" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("auth")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("auth")).token
    }`;
  }

  return req;
});

// Job
export const fetchJobs = () => API.get("/job");
export const fetchJob = (id) => API.get(`/job/${id}`);
export const createJob = (newJob) => API.post(`/job`, newJob);
export const updateJob = (id, updatedJob) =>
  API.patch(`/job/${id}`, updatedJob);
export const deleteJob = (id) => API.delete(`/job/${id}`);

// Profile
export const profilePosts = (id) => API.get(`/job/user/${id}`);
export const updateProfilePhoto = (id, updatedProfile) =>
  API.patch(`/auth/profile/${id}`, updatedProfile);

// Auth
export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);
