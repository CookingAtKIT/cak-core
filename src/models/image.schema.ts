import { model, Schema } from "mongoose";
import { IImage } from "./image.types";

const imageSchema = new Schema<IImage>({
  hash: { type: String, required: true },
  type: { type: String, required: true }
});

export const Image = model<IImage>("Image", imageSchema);
