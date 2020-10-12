import { Document } from "mongoose";

export interface IImageSchema extends Document {
  hash: string;
  type: string;
}
