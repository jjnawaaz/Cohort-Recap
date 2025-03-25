import { Button, Card, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

const Course = () => {
  let { courseId } = useParams();
  const token = localStorage.getItem("token");
  const setCourses = useSetRecoilState(coursesState);
  console.log("Course Componenet");
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
    <div style={{ display: "flex", justifyContent: "center" }}>
      <CourseCard courseId={courseId} />
      <UpdateCard courseId={courseId} />
    </div>
  );
};

function UpdateCard(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageLink, setImageLink] = useState("");
  const token = localStorage.getItem("token");
  const [courses, setCourses] = useRecoilState(coursesState);
  console.log(courses);
  console.log("rendered Updated Card");
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
        <Typography>Update Course Details</Typography>
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
              let updatedCourses = [];
              for (let i = 0; i < courses.length; i++) {
                if (courses[i].id == props.courseId) {
                  updatedCourses.push({
                    id: props.courseId,
                    title: title,
                    description: description,
                    price: price,
                    imageLink: imageLink,
                  });
                } else {
                  updatedCourses.push(courses[i]);
                }
              }
              setCourses(updatedCourses);
            }
            function callback1(res) {
              res.json().then(callback2);
            }
            fetch("http://localhost:3000/admin/courses/" + props.courseId, {
              method: "PUT",
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
          Update Course
        </Button>
      </Card>
    </div>
  );
}

function CourseCard(props) {
  const courses = useRecoilValue(coursesState);
  console.log("rendered Course Card");
  let course = null;
  for (let i = 0; i < courses.length; i++) {
    if (courses[i].id == props.courseId) {
      course = courses[i];
    }
  }
  if (!course) {
    return <div>Loading...</div>;
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
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
    </div>
  );
}

export default Course;

const coursesState = atom({
  key: "coursesState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
