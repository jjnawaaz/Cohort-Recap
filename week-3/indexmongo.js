const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

const Secret = "Secret";

// Mongoose Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

// mongoose models
const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (authHeader) {
    console.log("Inside if");
    const token = authHeader.split(" ")[1];
    console.log(token);
    jwt.verify(token, Secret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Connect to db
mongoose.connect(
  "mongodb+srv://shaikhmohammedjunaidnawaz:Junaid10@cluster0.elrxy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" }
);

// Routes to handle

// Post Admin
app.post("/admin/signup", (req, res) => {
  const { username, password } = req.body;
  function callback(admin) {
    if (admin) {
      res.sendStatus(403).json({ message: "Admin already exists" });
    } else {
      const obj = { username: username, password: password };
      const newAdmin = new Admin(obj);
      newAdmin.save();
      const token = jwt.sign({ username, role: "admin" }, Secret, {
        expiresIn: "1h",
      });
      res.json({ message: "Admin Successfully created", token });
    }
  }

  Admin.findOne({ username }).then(callback);
});

// Login Admin
app.post("/admin/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, Secret, {
      expiresIn: "1h",
    });
    res.json({
      message: "User logged in successfully",
      token,
    });
  } else {
    res.status(403).json({
      message: "Invalid username or password",
    });
  }
});

// Admin Create Courses
app.post("/admin/courses", authenticateJWT, async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json({
    message: "Course created successfully",
    courseId: course.id,
  });
});

app.put("/admin/courses/:courseId", authenticateJWT, async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {
    new: true,
  });
  if (course) {
    res.json({
      message: "Course updated successfully",
    });
  } else {
    res.status(404).json({
      message: "Course not found",
    });
  }
});

app.get("/admin/courses", authenticateJWT, async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses });
});

app.listen(3000, (req, res) => {
  console.log(`Server Started`);
});
