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

// medicine
export const fetchmedicines = () => API.get("/medicine");
export const fetchmedicine = (id) => API.get(`/medicine/${id}`);
export const createmedicine = (newmedicine) => API.post(`/medicine`, newmedicine);
export const updatemedicine = (id, updatedmedicine) =>
  API.patch(`/medicine/${id}`, updatedmedicine);
export const deletemedicine = (id) => API.delete(`/medicine/${id}`);

// Profile
export const profilePosts = (id) => API.get(`/medicine/user/${id}`);
export const updateProfilePhoto = (id, updatedProfile) =>
  API.patch(`/auth/profile/${id}`, updatedProfile);

// Auth
export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);
