import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import containerStyle from "../util/containerStyle";
import axios from "../axios/localServer.axios";
import handlePromise from "../util/handlePromise";

const Login = () => {
  const itemStyle = { margin: "1rem" };

  const [formData, setFormData] = useState({
    username: "fin or tech",
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
    console.log("Login: ", formData);
    let accessToken = "";

    const { ok, error, response } = await handlePromise(
      axios.post("/login", formData)
    );

    if (ok) {
      switch (response.status) {
        case 200:
          localStorage.setItem("accessToken", response.data.accessToken);
          console.log("Login: ", { location });
          navigate(`${location.state.from.pathname}`, { replace: true });
          break;
        case 400:
          setLoginFailed(true);
          break;
        default: ;
      }
    } else {
      console.log("Login: ", {error});
    }
    console.log("Login: ", { accessToken });
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
