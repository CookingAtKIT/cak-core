import { Document, Types } from "mongoose";
import { IImage } from "./image.types";
import { IUser } from "./user.types";

export interface ICommentSchema {
  author: Types.ObjectId | IUser;
  flags: Types.ObjectId[] | IUser[];
  message: string;
  likes: Types.ObjectId[] | IUser[];
  imgs: Types.ObjectId[] | IImage[];
}

export interface IComment extends ICommentSchema, Document {}
