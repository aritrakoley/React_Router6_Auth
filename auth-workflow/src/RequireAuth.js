import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "./axios/localServer.axios.js";
import handlePromise from "./util/handlePromise.js";

function RequireAuth(props) {
  const [hasAccess, setHasAccess] = useState(null);
  // const [testToggle, setTestToggle] = useState(false); //++
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('RequireAuth: useEffect called');

    const checkAccess = async () => {
      const accessToken = localStorage.getItem("accessToken");
      console.log(`RequireAuth: token -> ${accessToken}`);

      if (accessToken) {

        const {ok, error, response} = await handlePromise( axios.post( "/pageaccess",{ pageKey: props.pageKey } ) );
        console.log("RequireAuth: ",{ok, error, response});

        if (ok) {
          switch ( response.status ) {
            case 200: setHasAccess(response.data.hasAccess); break;
            default: ;
          }
        } else {
          console.log("RequireAuth: checkAccess api call failed", error);
        } 

      } else {
        console.log("RequireAuth: Location sent", { location });
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    checkAccess();
  }, [navigate, location, props.pageKey]);
  /* Note: 
  The navigate() and location constants being in dependency array does not cause useEffect to be called on every render.
  I'm not sure why, since useNavigate hook will be called on every render. (needs further investigation)
  To test this, uncomment lines marked with `//++` at the end.
  and comment lines with `//+` at the end.
  */

  console.log("RequireAuth: rendered, hasAccess", hasAccess);
  if (hasAccess === true) {
    // return (<><p>{testToggle.toString()}</p><button onClick={() => {setTestToggle(!testToggle)}}>Toggle</button><div>{props.children}</div></>); //++
    return props.children; //+
  } else if (hasAccess === false) {
    return <h1>Permission Denied</h1>;
  }
  return "Loading...";
}

export default RequireAuth;
