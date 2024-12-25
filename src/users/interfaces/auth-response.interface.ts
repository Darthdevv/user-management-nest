import { Types } from "mongoose";

export interface SignUpResponse {
  message: string;
  data: {
    email: string;
    username: string;
    id: Types.ObjectId;
  };
}

export interface SignInResponse{
  message: string;
  data: {
    role: string;
    id: Types.ObjectId;
    username: string;
    token: string;
  };
}