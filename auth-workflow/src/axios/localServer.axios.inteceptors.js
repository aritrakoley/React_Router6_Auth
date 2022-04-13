import axios from "./localServer.axios";

const setupInterceptors = (navigate, location) => {
  console.log("setupInterceptors called with", {location});

  axios.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("accessToken");
      config.headers.Authorization = accessToken ? accessToken : "";
      console.log("Request Interceptor: Authorization Header added");
      return config;
    },
    (error) => {
      console.log("Request Interceptor: ERROR => No Processing");
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      console.log("Response Interceptor: SUCCESS => No Processing", {response});
      return response;
    },
    (error) => {
      console.log("Response Interceptor: ERROR => redirect", { error });
      switch (error.status) {
        case 400:
        case 401:
        case 403:
          console.log("Response Interceptor: Auth error msg -> ", error.data.msg);
          navigate('/login', {state: {from: location}, replace: true});
          break;
        default: ;
      }
      return Promise.reject(error);
    }
  );
}

export default setupInterceptors;