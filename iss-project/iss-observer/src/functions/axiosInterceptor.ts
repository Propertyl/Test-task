import axios from "axios";

const ax = axios.create({
  baseURL:''
});

ax.interceptors.response.use(
  res => res.data,
  error => Promise.reject(error),
);

export default ax;