import { model, Schema, Types } from "mongoose";
import { ICommentSchema } from "./comment.types";

const commentSchema = new Schema<ICommentSchema>({
  _id: Types.ObjectId,
  author: Types.ObjectId,
  flags: [Types.ObjectId],
  message: String,
  likes: [Types.ObjectId],
  imgs: [Types.ObjectId]
});

export const Comment = model("Comment", commentSchema);
