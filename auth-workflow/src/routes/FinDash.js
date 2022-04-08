import { useEffect, useState } from "react";

const FinDash = () => {
  const [posts, setPosts] = useState([]);
  const [err, setErr] = useState(null);
  const containerStyle = {
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken")
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/finposts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken ? accessToken : '',
          },
        });
        console.log(res);
        if (res.status === 401 || res.status === 403) {
          console.log("Auth error");
          const msg = (await res.json()).msg;
          setErr(msg);
        } else {
          const posts = await res.json();
          setPosts(posts);
        }
      } catch {
        console.log("Request Failed");
      }
    };

    getPosts();
  }, []);

  return (
    <div style={containerStyle}>
      <h3>Finance Dashboard</h3>
      {!err? <p>{JSON.stringify(posts)}</p> : null}
      {err? <p>{err}</p> : null}
    </div>
  );
};
export default FinDash;
