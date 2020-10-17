import { Document } from "mongoose";

export interface IUserCodeSchema extends Document {
  created: Date;
  emailcode: string;
  code: number;
  token: number;
}
