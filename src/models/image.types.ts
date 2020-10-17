import { Document } from "mongoose";

export interface IImageSchema {
  hash: string;
  type: string;
}

export interface IImage extends IImageSchema, Document {}
