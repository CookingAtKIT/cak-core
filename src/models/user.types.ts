import { Document } from "mongoose";

export interface IUserSchema {
  created: Date;
  email: string;
  username: string;
  password: string;
  surname: string;
  name: string;
  token: string;
  salt: string;
}

export interface IUser extends IUserSchema, Document {}
