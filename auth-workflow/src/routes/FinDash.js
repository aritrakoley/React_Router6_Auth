import { useEffect, useState } from "react";
import containerStyle from "../util/containerStyle";
import axios from "../axios/localServer.axios";
import handlePromise from "../util/handlePromise";

const FinDash = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const { ok, error, response } = await handlePromise(
        axios.post(
          "/finposts",
          {},
          {
            headers: {
              Authorization: accessToken ? accessToken : "",
            },
          }
        )
      );

      console.log("FinDash: ", { ok, error, response });
      if (ok) {
        switch (response.status) {
          case 401:
          case 403:
            console.log("FinDash: Auth error msg -> ", response.data.msg);
            break;
          case 200:
            setPosts(response.data);
            break;
          default:
        }
      } else {
        console.log("FinDash: fetching posts failed", { error });
      }
    };

    getPosts();
  }, []);

  return (
    <div style={containerStyle}>
      <h3>Finance Dashboard</h3>
      {posts ? <p>{JSON.stringify(posts)}</p> : null}
    </div>
  );
};
export default FinDash;
