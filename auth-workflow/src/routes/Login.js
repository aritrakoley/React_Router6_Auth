import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const containerStyle = {
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };
  const itemStyle = { margin: "1rem" };

  const [formData, setFormData] = useState({
    username: "aritra",
    password: "password",
  });

  const [loginFailed, setLoginFailed] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData((prevState) => {
      return { ...prevState, [e.target.id]: e.target.value };
    });
  };

  const handleLogin = async () => {
    setLoginFailed(false);
    console.log(formData);
    let accessToken = "";
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.status === 400) {
        setLoginFailed(true);
      } else {
        accessToken = ( await res.json() ).accessToken;
        localStorage.setItem("accessToken", accessToken);
        console.log("in handleLogin", {location});
        navigate(`${location.state.from.pathname}`, {replace: true});
      }
      console.log(accessToken);
    } catch {
      console.log("Request Failed");
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={itemStyle}>Login</h2>
      {loginFailed ? (
        <h4 style={{ color: "red" }}>Username or Password incorrect</h4>
      ) : null}
      <label style={itemStyle} htmlFor="username">
        Username:
        <input
          id="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
        />
      </label>
      <label style={itemStyle} htmlFor="password">
        Password:
        <input
          id="password"
          type="text"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
