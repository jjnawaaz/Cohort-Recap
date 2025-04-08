import { SECRET } from "@/middleware/auth";
import Admin from "@/models/AdminSchema";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import Course from "@/models/CourseSchema";

export const AdminSignup = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { username, password } = req.body;

  const existingAdmin = await Admin.findOne({ username });
  if (existingAdmin) {
    return res.status(403).json({ message: "Admin already exists" });
  }

  const newAdmin = new Admin({ username, password });
  await newAdmin.save();

  const token = jwt.sign({ username, role: "admin" }, SECRET, {
    expiresIn: "1h",
  });
  res.json({ message: "Admin created successfully", token });
};

export const AdminLogin = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
};

export const AdminCreateCourses = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.json({ message: "Course created successfully", courseId: course.id });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

export const AdminUpdateCourses = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const course = await Course.findByIdAndUpdate(req.query.courseId, req.body, {
    new: true,
  });
  if (course) {
    res.json({ message: "Course updated successfully" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
};

export const AdminGetCourses = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const courses = await Course.find({});
  res.json({ courses });
};

export const AdminGetCourseById = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const courseId = req.query.courseId;
  const course = await Course.findById(courseId);
  res.json({ course });
};
