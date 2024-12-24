import { Types } from "mongoose";

export interface SignUpResponse {
  message: string;
  data: {
    email: string;
    username: string;
    id: Types.ObjectId;
  };
}
