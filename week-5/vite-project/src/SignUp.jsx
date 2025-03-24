import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <center>
        <div
          style={{
            paddingTop: 150,
            marginBottom: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant={"h4"}>Welcome to Course App</Typography>
        </div>
      </center>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          variant={"outlined"}
          style={{
            width: 400,
            padding: 20,
          }}
        >
          <TextField
            fullWidth={true}
            label="Username"
            variant="outlined"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <br />

          <TextField
            fullWidth={true}
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <Button
            size={"medium"}
            variant="contained"
            onClick={() => {
              console.log(email, password);

              function callback2(data) {
                localStorage.setItem("token", data.token);
                window.location = "/addcourse";
              }
              function callback1(res) {
                res.json().then(callback2);
              }

              fetch("http://localhost:3000/admin/signup", {
                method: "POST",
                body: JSON.stringify({
                  username: email,
                  password: password,
                }),
                headers: {
                  "Content-type": "application/json",
                },
              }).then(callback1);
            }}
          >
            Sign Up
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
