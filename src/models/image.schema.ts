import { model, Schema, Types } from "mongoose";
import { IImage } from "./image.types";

const imageSchema = new Schema<IImage>({
  hash: { type: String, required: true },
  type: { type: String, required: true },
  uploader: { type: Types.ObjectId, ref: "User", required: true }
});

export const Image = model<IImage>("Image", imageSchema);
