import { Document } from "mongoose";

export interface IUserSchema extends Document {
  created: Date;
  email: string;
  username: string;
  password: string;
  surname: string;
  name: string;
  token: string;
  salt: string;
}
