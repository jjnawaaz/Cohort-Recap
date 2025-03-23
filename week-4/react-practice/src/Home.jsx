import { Button } from "@mui/material";
import NavBar from "./NavBar";
import { useState } from "react";

function HomePage() {
  let token = localStorage.getItem("token");
  const [backendData, setBackendData] = useState([]);
  const [purchasedData, setPurchasedData] = useState([]);
  console.log(token);
  const handleClick = async () => {
    let response = await fetch("http://localhost:3000/users/courses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      alert("Cannot fetch courses");
    }
    let data = await response.json();
    setBackendData(data.courses);
  };

  const handleClick1 = async () => {
    let response = await fetch("http://localhost:3000/users/purchasedCourses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      alert("Cant fetch ");
    }
    let data = await response.json();
    setPurchasedData(data.purchasedCourses);
  };
  return (
    <>
      <NavBar />
      <div>Hi from home</div>
      <Button onClick={handleClick}>Click for Courses</Button>
      {backendData.map((i) => {
        console.log(i);
        return (
          <div>
            {i.title}
            {i.description}
            {i.price}
          </div>
        );
      })}
      <Button onClick={handleClick1}>Click for purchasedCourses</Button>
      {purchasedData.map((i) => {
        return (
          <div>
            <div>Title: {i.title}</div>
            <div>Description: {i.description}</div>
            <div>Price: {i.price}</div>
          </div>
        );
      })}
    </>
  );
}

export default HomePage;
