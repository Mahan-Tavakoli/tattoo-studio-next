import axios from "axios";
import { getCookie } from "cookies-next";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3100";

const app = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

app.interceptors.request.use(
  (config) => {
    const token = getCookie("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const http = {
  get: app.get,
  post: app.post,
  put: app.put,
  patch: app.patch,
  delete: app.delete,
};

export default http;
