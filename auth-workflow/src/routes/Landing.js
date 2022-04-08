import { Link } from "react-router-dom";

function Landing(props) {
  return (
    <>
      <h1>Welcome {props.user || "Guest"}</h1>{" "}
      <button
        onClick={() => {
          localStorage.setItem("accessToken", "");
        }}
      >
        Logout
      </button> <br />
      <Link to="/findash">Finance Dashboard</Link>
      <br />
      <Link to="/techdash">Technology Dashboard</Link>
    </>
  );
}

export default Landing;
