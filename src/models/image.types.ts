import { Document, Types } from "mongoose";

export interface IImageSchema extends Document {
  hash: string;
  type: string;
  uploader: Types.ObjectId;
}
