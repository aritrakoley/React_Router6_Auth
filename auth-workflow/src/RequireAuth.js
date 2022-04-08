import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RequireAuth(props) {
  const [hasAccess, setHasAccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
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
        navigate("/login");
      }
    };
    checkAccess();
  }, [navigate, props]);

  console.log("hasAccess", hasAccess);
  if (hasAccess === true) {
    return props.children;
  } else if (hasAccess === false) {
    return <h1>Permission Denied</h1>;
  }
  return "Loading...";
}

export default RequireAuth;
