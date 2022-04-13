import { useState } from "react";
import setupInterceptors from '../axios/localServer.axios.inteceptors';

const InterceptorInitializer = () => {
    const [initDone, setInitDone] = useState(false);
    if(!initDone) {
        setupInterceptors();
        setInitDone(true);
    }
  return <></>;
};

export default InterceptorInitializer;
