import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleClick = async () => {
    const response = await fetch("http://localhost:3000/auth/login", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data) {
      localStorage.setItem("token", data.token);
      navigate("/todos");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "red",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div>
        <br />
        <br />
        <input
          type="Username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <br />
        <br />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <br />
        <button onClick={handleClick}>Login</button>
      </div>
    </div>
  );
};

export default Login;
