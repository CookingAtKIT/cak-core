import { Types, Document } from "mongoose";

export interface IRecipeSchema extends Document {
  _id: Types.ObjectId;
  public: boolean;
  flags: Types.ObjectId[]; // user
  title: string;
  author: Types.ObjectId; // user
  edited: Date;
  thumbnail: Types.ObjectId; // image
  ingredients: {
    _id: Types.ObjectId; // ingredient
    amount: number;
  }[];
  steps: {
    index: number;
    title: string;
    body: string;
    img: Types.ObjectId; // image
  }[];
  likes: Types.ObjectId[]; // user
  portions: number;
  comments: Types.ObjectId[]; // comment
}
