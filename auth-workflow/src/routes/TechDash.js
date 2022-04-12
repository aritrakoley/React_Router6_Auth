import { useEffect, useState } from "react";
import containerStyle from "../util/containerStyle";
import axios from "../axios/localServer.axios";
import handlePromise from "../util/handlePromise";

const TechDash = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const { ok, error, response } = await handlePromise(
        axios.post(
          "/techposts",
          {},
          {
            headers: {
              Authorization: accessToken ? accessToken : "",
            },
          }
        )
      );

      console.log("TechDash: ", { ok, error, response });
      if (ok) {
        switch (response.status) {
          case 401:
          case 403:
            console.log("TechDash: Auth error msg -> ", response.data.msg);
            break;
          case 200:
            setPosts(response.data);
            break;
          default:
        }
      } else {
        console.log("TechDash: fetching posts failed", { error });
      }
    };

    getPosts();
  }, []);

  return (
    <div style={containerStyle}>
      <h3>Technology Dashboard</h3>
      {posts ? <p>{JSON.stringify(posts)}</p> : null}
    </div>
  );
};
export default TechDash;
