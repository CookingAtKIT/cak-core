import { Document, Types } from "mongoose";

export interface ICommentSchema extends Document {
  author: Types.ObjectId; // user
  flags: Types.ObjectId[]; // user
  message: string;
  likes: Types.ObjectId[]; // user
  imgs: Types.ObjectId[]; // image
}
