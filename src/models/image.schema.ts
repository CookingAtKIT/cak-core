import { model, Schema, Types } from "mongoose";
import { IImageSchema } from "./image.types";

const imageSchema = new Schema<IImageSchema>({
  hash: String,
  type: String,
  uploader: Types.ObjectId
});

export const Image = model<IImageSchema>("Image", imageSchema);
