import { model, Schema, Types } from "mongoose";
import { IUserSchema } from "./user.types";

const userSchema = new Schema<IUserSchema>({
  _id: Types.ObjectId,
  created: Date,
  email: String,
  username: String,
  password: String,
  salt: String
});

export const User = model("User", userSchema);
