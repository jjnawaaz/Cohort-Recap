import jwt from "jsonwebtoken";
import { AuthenticateRequest, UserPayload } from "@/Types/types";
import { NextApiResponse } from "next";
export const SECRET = "Shush";

export const authenticateJwt = (
  req: AuthenticateRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err || !user || typeof user === "string") {
        return res.status(403).json({
          message: "Forbidden",
        });
      }
      req.user = user as UserPayload;
      next();
    });
  } else {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};
