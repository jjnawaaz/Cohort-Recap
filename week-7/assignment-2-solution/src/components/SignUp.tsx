import { useState } from "react";

type signUpData = {
  username: string;
  password: string;
};

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleClick = async () => {
    const userData: signUpData = {
      username: username,
      password: password,
    };
    const response = await fetch("http://localhost:3000/auth/signup", {
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
      alert("User already exists");
    }
  };

  return (
    <div>
      <h1>SignUp</h1>
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
        <button onClick={handleClick}>SignUp</button>
      </div>
    </div>
  );
};

export default SignUp;
