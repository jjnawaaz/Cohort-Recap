import { Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    function callback2(data) {
      setCourses(data.courses);
    }
    function callback1(res) {
      res.json().then(callback2);
    }
    fetch("http://localhost:3000/admin/courses", {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(callback1);
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {courses.map((course) => (
        <Course course={course} />
      ))}
    </div>
  );
};

export function Course(props) {
  return (
    <Card
      style={{
        margin: 10,
        width: 300,
        height: 250,
      }}
    >
      <Typography textAlign={"center"} variant="h6">
        {" "}
        {props.course.title}
      </Typography>
      <Typography textAlign={"center"} variant="subtitle1">
        {" "}
        {props.course.description}
      </Typography>
      <img
        src={props.course.imageLink}
        alt="Nothing"
        style={{ width: 300, height: 150 }}
      />
      <Typography textAlign={"center"} variant="subtitle2">
        {" "}
        $: {props.course.price}
      </Typography>
    </Card>
  );
}

export default Courses;
