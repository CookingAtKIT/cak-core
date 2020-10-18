import { model, Schema, Types } from "mongoose";
import { IUserCodeSchema } from "./usercodes.types";

const userSchema = new Schema<IUserCodeSchema>({
  created: Date,
  emailcode: String,
  code: String,
  token: String,
  verified: Boolean
});

export const UserCode = model<IUserCodeSchema>("UserCode", userSchema);
