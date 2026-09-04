import axios from "axios";
import tokenService from "./tokenService";

const api = axios.create({
  baseURL: "/",
});

api.interceptors.request.use((config) => {
  const token = tokenService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      tokenService.removeToken();
      window.location.href = "/"; 
    }
    return Promise.reject(err);
  }
);

export default api;