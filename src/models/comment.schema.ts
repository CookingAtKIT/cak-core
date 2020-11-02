import { model, Schema, Types } from "mongoose";
import { IComment, ICommentClean } from "./comment.types";
import { Image } from "./image.schema";
import { User } from "./user.schema";

const commentSchema = new Schema<IComment>({
  author: { type: Types.ObjectId, ref: "User", required: true },
  flags: [{ type: Types.ObjectId, ref: "User" }],
  message: { type: String, required: true },
  likes: [{ type: Types.ObjectId, ref: "User" }],
  imgs: [{ type: Types.ObjectId, ref: "Image" }]
});

commentSchema.method("clean", async function (this: IComment): Promise<ICommentClean> {
  const author = await User.findById(this.author);
  const imgs = <Types.ObjectId[]>this.imgs;

  if (!author) throw new Error("Author does not exist");

  return {
    author: author.username,
    imgs: imgs.map((img) => Image.asLink(img)),
    likes: this.likes.length,
    message: this.message
  };
});

export const Comment = model<IComment>("Comment", commentSchema);
