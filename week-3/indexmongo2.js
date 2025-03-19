const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
app.use(express.json());

const Secret = "Secret";

mongoose.connect(
  "mongodb+srv://shaikhmohammedjunaidnawaz:Junaid10@cluster0.elrxy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    dbName: "courses",
  }
);

// Mongoose Schemas
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
}); // telling mongoose that purchased courses are from collection courses in ref

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const coursesSchema = new mongoose.Schema({
  title: String,
  description: String,
});

//Initialize models
const ADMIN = mongoose.model("Admin", adminSchema);
const USER = mongoose.model("User", userSchema);
const COURSE = mongoose.model("Course", coursesSchema);

// Authenticate JWT
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    let token = authHeader.split(" ")[1];
    jwt.verify(token, Secret, (err, user) => {
      if (user) {
        req.user = user.username;
        next();
      } else {
        res.status(400).json({
          message: "Bad request",
        });
      }
    });
  } else {
    res.status(400).json({
      message: "Client Side Error",
    });
  }
};

// admin routes

// Signup as admin
app.post("/admin/signup", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({
      message: "Please Enter Username and Password",
    });
  const obj = {
    username: username,
    password: password,
  };
  const user = new ADMIN(obj);
  user.save();
  const token = jwt.sign({ username: user.username }, Secret, {
    expiresIn: "1h",
  });
  res.status(201).json({
    message: "User created successfully",
    token,
  });
});

// Login Admin
app.post("/admin/login", async (req, res) => {
  let { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({
      message: "Please enter Username and Password",
    });
  let user = await ADMIN.findOne({ username: username, password: password });
  if (user) {
    const token = jwt.sign({ username: user.username }, Secret, {
      expiresIn: "1h",
    });
    res.status(200).json({
      message: "User Logged in successfully",
      token: token,
    });
  } else {
    res.status(400).json({
      message: "Invalid email or password",
    });
  }
});

//Create Courses Admin
app.post("/admin/courses", authenticateJWT, (req, res) => {
  let { title, description } = req.body;
  let newCourse = new COURSE({
    title: title,
    description: description,
  });
  console.log(newCourse);
  newCourse.save();
  res.status(201).json({
    message: "Course Created",
    course: newCourse,
  });
});

// Get all courses
app.get("/admin/courses", async (req, res) => {
  let courses = await COURSE.find();
  res.status(200).json({
    course: courses,
  });
});

// Update Course by ID
app.put("/admin/courses/:courseId", async (req, res) => {
  let id = req.params.courseId;
  let course = await COURSE.findByIdAndUpdate(id, req.body, { new: true });
  if (course) {
    res.status(201).json({
      message: "Course updated successfully",
      course: course,
    });
  } else {
    res.status(403).json({
      message: "Course not found",
    });
  }
});

// Users routes
app.post("/user/signup", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({
      message: "Please Enter Username and Password",
    });
  const obj = {
    username: username,
    password: password,
  };
  const user = new USER(obj);
  user.save();
  const token = jwt.sign({ username: user.username }, Secret, {
    expiresIn: "1h",
  });
  res.status(201).json({
    message: "User created successfully",
    token,
  });
});

// User Login
app.post("/admin/login", async (req, res) => {
  let { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({
      message: "Please enter Username and Password",
    });
  let user = await USER.findOne({ username: username, password: password });
  if (user) {
    const token = jwt.sign({ username: user.username }, Secret, {
      expiresIn: "1h",
    });
    res.status(200).json({
      message: "User Logged in successfully",
      token: token,
    });
  } else {
    res.status(400).json({
      message: "Invalid email or password",
    });
  }
});

app.listen(3000, () => {
  console.log("Server Started");
});
