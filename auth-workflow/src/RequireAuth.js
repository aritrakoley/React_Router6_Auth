import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function RequireAuth(props) {
  const [hasAccess, setHasAccess] = useState(null);
  // const [testToggle, setTestToggle] = useState(false); //++
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("useEffect called on RequireAuth");
    const checkAccess = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const res = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/pageaccess`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: accessToken ? accessToken : "",
            },
            body: JSON.stringify({ pageKey: props.pageKey }),
          }
        );
        console.log(res);
        if (res.status === 200) {
          const hA = (await res.json()).hasAccess;
          setHasAccess(hA);
        }
      } else {
        console.log("in RequireAuth", {location});
        navigate("/login", {state: { from: location}, replace: true });
      }
    };
    checkAccess();
  }, [navigate, location, props.pageKey]);
  /* Note: 
  The navigate() being in dependency array does not cause useEffect to be called on every render.
  I'm not sure why, since useNavigate hook will be called on every render. (needs further investigation)
  To test this, uncomment lines marked with `//++` at the end.
  and comment lines with `//+` at the end.
  */

  console.log("on render - hasAccess", hasAccess);
  if (hasAccess === true) {
    // return (<><p>{testToggle.toString()}</p><button onClick={() => {setTestToggle(!testToggle)}}>Toggle</button><div>{props.children}</div></>); //++
    return props.children; //+
  } else if (hasAccess === false) {
    return <h1>Permission Denied</h1>;
  }
  return "Loading...";
}

export default RequireAuth;
