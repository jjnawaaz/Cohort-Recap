import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
const SECRET = "SECr3t"; // This should be in an environment variable in a real application

const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET, (err, payload) => {
      if (err) {
        return res.sendStatus(403);
      }
      console.log(payload);
      const user = payload as jwt.JwtPayload;
      if (user?.id) {
        req.headers.id = user.id;
        next();
      } else {
        res.sendStatus(401);
      }
    });
  } else {
    res.sendStatus(401);
  }
};

export { authenticateJwt, SECRET };
