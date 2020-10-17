import { model, Schema, Types } from "mongoose";
import { IUserSchema } from "./user.types";

const userSchema = new Schema<IUserSchema>({
  created: Date,
  email: String,
  username: String,
  password: String,
  surname: String,
  name: String,
  token: String,
  salt: String
});

export const User = model<IUserSchema>("User", userSchema);
