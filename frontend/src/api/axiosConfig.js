import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://medicore-expediente-clinico-production.up.railway.app/api"
});

axiosClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosClient;