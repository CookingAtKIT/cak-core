import { model, Schema, Types } from "mongoose";
import { IImageSchema } from "./image.types";

const imageSchema = new Schema<IImageSchema>({
  _id: Types.ObjectId,
  hash: String,
  type: String
});

export const Image = model("Image", imageSchema);
