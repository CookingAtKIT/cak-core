import { model, Schema, Types } from "mongoose";
import { IImage, IImageModel } from "./image.types";

const imageSchema = new Schema<IImage>({
  hash: { type: String, required: true },
  type: { type: String, required: true },
  uploader: { type: Types.ObjectId, ref: "User", required: true }
});

imageSchema.static("asLink", function (this: IImage) {
  return `${process.env.HOSTNAME}${this.id}`;
});

export const Image = model<IImage, IImageModel>("Image", imageSchema);
