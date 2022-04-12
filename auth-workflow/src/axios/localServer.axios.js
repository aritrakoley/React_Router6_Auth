import axios from "axios";

const axLocal = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
  headers: { "Content-Type": "application/json" },
});

export default axLocal;