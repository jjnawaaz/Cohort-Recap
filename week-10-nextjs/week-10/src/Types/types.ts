import { NextApiRequest } from "next";

export interface UserPayload {
  username: string;
  role?: string;
}

export interface AuthenticateRequest extends NextApiRequest {
  user: UserPayload;
}
