import { Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Course = () => {
  let { courseId } = useParams();
  const token = localStorage.getItem("token");
  const [courses, setCourses] = useState([]);
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
  let course = null;
  for (let i = 0; i < courses.length; i++) {
    if (courses[i].id == courseId) {
      course = courses[i];
    }
  }
  if (!course) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <CourseCard course={course} />
    </div>
  );
};

// function UpdateCard(){
//     return
// }

function CourseCard(props) {
  const course = props.course;
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
        {course.title}
      </Typography>
      <Typography textAlign={"center"} variant="subtitle1">
        {" "}
        {course.description}
      </Typography>
      <img
        src={course.imageLink}
        alt="Nothing"
        style={{ width: 300, height: 150 }}
      />
      <Typography textAlign={"center"} variant="subtitle2">
        {" "}
        $: {course.price}
      </Typography>
    </Card>
  );
}

export default Course;
