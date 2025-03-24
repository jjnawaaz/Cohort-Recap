import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const AppBar = () => {
  const token = localStorage.getItem("token");
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    function callback2(data) {
      if (data.username) {
        setUserEmail(data.username);
      }
    }

    function callback1(res) {
      res.json().then(callback2);
    }
    fetch("http://localhost:3000/admin/me", {
      headers: {
        Authorization: `Bearer ${token}`, // Token should be Bearer<space>token
        "Content-type": "application/json",
      },
    }).then(callback1);
  }, []);

  if (userEmail) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 4,
        }}
      >
        <div>
          <Typography>Coursera</Typography>
        </div>
        <div style={{ display: "flex" }}>
          <div>{userEmail}</div>
          <div style={{ marginRight: 10 }}>
            <Button
              variant="contained"
              onClick={() => {
                localStorage.setItem("token", null);
                window.location = "/";
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 4,
      }}
    >
      <div>
        <Typography>Coursera</Typography>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: 10 }}>
          <Button
            variant="contained"
            onClick={() => {
              window.location = "/signin";
            }}
          >
            SignIn
          </Button>
        </div>
        <div style={{ marginRight: 10 }}>
          <Button
            variant="contained"
            onClick={() => {
              window.location = "/signup";
            }}
          >
            SignUp
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppBar;
