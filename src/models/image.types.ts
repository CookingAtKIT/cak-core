import { Document, Types } from "mongoose";
import { IUser } from "./user.types";

export interface IImageSchema {
  hash: string;
  type: string;
  uploader: Types.ObjectId | IUser;
}

export interface IImage extends IImageSchema, Document {}
