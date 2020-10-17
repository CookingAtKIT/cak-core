import { model, Schema, Types } from "mongoose";
import { IUserCodeSchema } from "./usercodes.types";

const userSchema = new Schema<IUserCodeSchema>({
  created: Date,
  emailcode: String,
  code: Number,
  token: String
});

export const UserCode = model<IUserCodeSchema>("UserCode", userSchema);
