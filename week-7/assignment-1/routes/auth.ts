import jwt from "jsonwebtoken";
import express, { Request, Response } from "express";
import { authenticateJwt, SECRET } from "../middleware/index";
import { User } from "../db";
const router = express.Router();

type UserInput = {
  username: string;
  password: string;
};

router.post(
  "/signup",
  async (req: Request<{}, {}, UserInput>, res: Response) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      res.status(403).json({ message: "User already exists" });
    } else {
      const newUser = new User({ username, password });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: "1h" });
      res.json({ message: "User created successfully", token });
    }
  }
);

router.post(
  "/login",
  async (req: Request<{}, {}, UserInput>, res: Response) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });
      res.json({ message: "Logged in successfully", token });
    } else {
      res.status(403).json({ message: "Invalid username or password" });
    }
  }
);

router.get("/me", authenticateJwt, async (req: Request, res: Response) => {
  const id = req.headers.id;
  const token = req.headers.token;
  const user = await User.findOne({ _id: id });
  if (user) {
    res.json({ username: user.username, token: token });
  } else {
    res.status(403).json({ message: "User not logged in" });
  }
});

export default router;
