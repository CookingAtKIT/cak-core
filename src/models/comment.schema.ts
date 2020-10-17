import { model, Schema, Types } from "mongoose";
import { IComment } from "./comment.types";

const commentSchema = new Schema<IComment>({
  author: { type: Types.ObjectId, ref: "User", required: true },
  flags: [{ type: Types.ObjectId, ref: "User" }],
  message: { type: String, required: true },
  likes: [{ type: Types.ObjectId, ref: "User" }],
  imgs: [{ type: Types.ObjectId, ref: "Image" }]
});

export const Comment = model<IComment>("Comment", commentSchema);
