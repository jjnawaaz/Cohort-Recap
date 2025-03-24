import { Button, Card, TextField } from "@mui/material";
import React, { useState } from "react";

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageLink, setImageLink] = useState("");
  const token = localStorage.getItem("token");
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {" "}
      <Card
        variant={"outlined"}
        style={{
          width: 400,
          padding: 20,
        }}
      >
        <TextField
          fullWidth={true}
          label="Title"
          variant="outlined"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextField
          fullWidth={true}
          label="Description"
          variant="outlined"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />{" "}
        <TextField
          fullWidth={true}
          label="Price"
          variant="outlined"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <TextField
          fullWidth={true}
          label="Image Link"
          variant="outlined"
          onChange={(e) => {
            setImageLink(e.target.value);
          }}
        />
        <Button
          size={"medium"}
          variant="contained"
          onClick={() => {
            console.log(title, description, price);
            function callback2(data) {
              console.log(data);
            }
            function callback1(res) {
              res.json().then(callback2);
            }
            fetch("http://localhost:3000/admin/courses", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                title: title,
                description: description,
                price: price,
                imageLink: imageLink,
              }),
            }).then(callback1);
          }}
        >
          Add Course
        </Button>
      </Card>
    </div>
  );
};

export default AddCourse;
