import { Link, useNavigate } from "react-router-dom";

function Landing(props) {
  const navigate = useNavigate();

  const containerStyle = {
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

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
