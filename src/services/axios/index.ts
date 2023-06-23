import axios from "axios";
const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_DOMAIN,
  timeout: 5000,
  responseType: "json",
});
export default axiosInstance;
