import Button from "@mui/material/Button";
import NavBar from "../NavBar";
import { useState } from "react";

function UserSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const HandleSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch("http://localhost:3000/users/signup", {
      method: "POST",
      body: JSON.stringify({
        username: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (response) {
      const data = await response.json();
      console.log(data.token);
    }
  };

  return (
    <>
      <>
        <NavBar />

        <form onSubmit={HandleSubmit}>
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
              <div> USER SIGN UP</div>
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
    </>
  );
}

export default UserSignUp;
