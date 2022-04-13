import { useEffect, useState } from "react";
import containerStyle from "../util/containerStyle";
import axios from "../axios/localServer.axios";
import handlePromise from "../util/handlePromise";

const FinDash = () => {
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    const { ok, error, response } = await handlePromise( axios.post("/finposts") );
    console.log("FinDash: ", { ok, error, response });

    if (ok) {
        setPosts(response.data);
    } else {
      console.log("FinDash: fetching posts failed", { error });
    }
    
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div style={containerStyle}>
      <h3>Finance Dashboard</h3>
      <button onClick={getPosts}>Get Posts</button>
      {posts ? <p>{JSON.stringify(posts)}</p> : null}
    </div>
  );
};
export default FinDash;
