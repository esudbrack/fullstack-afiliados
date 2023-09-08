import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

api.interceptors.request.use(async (config) => {
  const { token } = window.localStorage;
  if (token) {
    config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
  }
  return config;
});

export default api;
