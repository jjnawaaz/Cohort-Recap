import User from "@/models/UserSchema";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { SECRET } from "@/middleware/auth";
import Course from "@/models/CourseSchema";
import { AuthenticateRequest } from "@/Types/types";

export const UserSignup = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.status(403).json({ message: "User already exists" });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "User created successfully", token });
  }
};

export const UserLogin = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
};

export const GetAllCoursesUser = async (
  req: AuthenticateRequest,
  res: NextApiResponse
) => {
  const courses = await Course.find({ published: true });
  res.json({ courses });
};

export const GetCourseByIdUser = async (
  req: AuthenticateRequest,
  res: NextApiResponse
) => {
  const course = await Course.findById(req.query.courseId);
  console.log(course);
  if (course) {
    const user = await User.findOne({ username: req.user.username });
    if (user) {
      user.purchasedCourses.push(course._id);
      await user.save();
      res.json({ message: "Course purchased successfully" });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(404).json({ message: "Course not found" });
  }
};

export const GetPurchasedCoursesUser = async (
  req: AuthenticateRequest,
  res: NextApiResponse
) => {
  const user = await User.findOne({ username: req.user.username }).populate(
    "purchasedCourses"
  );
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
};
