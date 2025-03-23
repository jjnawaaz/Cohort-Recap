import Button from "@mui/material/Button";
import NavBar from "../NavBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      body: JSON.stringify({
        username: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
      alert("Invalid email or password");
    }
    const data = await response.json();
    let token = data.token;
    localStorage.setItem("token", token);
    navigate("/");
  };
  return (
    <>
      <NavBar />
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
            height: "50vh",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "40%",
              justifyContent: "center",
              backgroundColor: "#e8e3e4",
            }}
          >
            <div>User Sign Up</div>
            Email:{" "}
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            Password:{" "}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

export default UserSignIn;
