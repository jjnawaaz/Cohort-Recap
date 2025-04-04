import { useState } from "react";

type LoginData = {
  username: string;
  password: string;
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleClick = async () => {
    const userData: LoginData = {
      username: username,
      password: password,
    };
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location = "/todos";
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <div>
        <input
          type="text"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleClick}>Login</button>
      </div>
    </div>
  );
};

export default Login;
