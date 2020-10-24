import { model, Schema } from "mongoose";
import { IUser } from "./user.types";

const userSchema = new Schema<IUser>({
  created: { type: Date, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  surname: { type: String, required: true },
  name: { type: String, required: true },
  token: { type: String, required: true },
  salt: { type: String, required: true }
});

export const User = model<IUser>("User", userSchema);
