import { useEffect, useState } from "react";
import containerStyle from "../util/containerStyle";
import axios from "../axios/localServer.axios";
import handlePromise from "../util/handlePromise";

const TechDash = () => {
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    const { ok, error, response } = await handlePromise( axios.post("/techposts") );
    console.log("TechDash: ", { ok, error, response });

    if (ok) {
        setPosts(response.data);
    } else {
      console.log("TechDash: fetching posts failed", { error });
    }
    
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div style={containerStyle}>
      <h3>Technology Dashboard</h3>
      <button onClick={getPosts}>Get Posts</button>
      {posts ? <p>{JSON.stringify(posts)}</p> : null}
    </div>
  );
};
export default TechDash;
