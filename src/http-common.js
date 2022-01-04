import axios from "axios";

const baseURL = "http://localhost:3000/api"
const instance = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer" + token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default instance;
