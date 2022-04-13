import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import setupInterceptors from '../axios/localServer.axios.inteceptors';

const InterceptorInitializer = () => {
    const [initDone, setInitDone] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    if(!initDone) {
        setupInterceptors(navigate, location);
        setInitDone(true);
    }

    useEffect(() => {
      console.log("InterceptorInitializer: useEffect called => first render complete");
    }, []);
  return <></>;
};

export default InterceptorInitializer;
