import axios from "./localServer.axios";

axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    config.headers.Authorization = accessToken ? accessToken : "";
    console.log("Request Interceptor: Authorization Header added");
    return config;
  },
  (error) => {
    console.log("Request Interceptor: No Processing");
    return error;
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log("Response Interceptor: No Processing");
    return response;
  },
  (error) => {
    console.log("Response Interceptor: ", { error });
    return error;
  }
);
