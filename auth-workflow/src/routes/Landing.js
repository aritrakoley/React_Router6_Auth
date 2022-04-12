import { Link, useNavigate } from "react-router-dom";
import containerStyle from "../util/containerStyle";

function Landing(props) {
  const navigate = useNavigate();

  return (
    <div style={containerStyle}>
      <h1>Landing Page (public)</h1>
      <Link to="/findash">Finance Dashboard</Link>
      <Link to="/techdash">Technology Dashboard</Link>
      {localStorage.getItem("accessToken") ? (
        <button
          onClick={() => {
            localStorage.setItem("accessToken", "");
            navigate("/");
          }}
        >
          Logout
        </button>
      ) : null}
    </div>
  );
}

export default Landing;
