import { Types, Document } from "mongoose";
import { IComment } from "./comment.types";
import { IImage } from "./image.types";
import { IIngredient } from "./ingredient.types";
import { IUser } from "./user.types";

export interface IRecipeSchema {
  public: boolean;
  flags: Types.ObjectId[] | IUser[];
  title: string;
  author: Types.ObjectId | IUser;
  edited?: Date;
  thumbnail?: Types.ObjectId | IImage;
  ingredients: {
    ingredient: Types.ObjectId | IIngredient;
    amount: number;
  }[];
  steps: {
    index: number;
    title: string;
    body: string;
    img?: Types.ObjectId | IImage;
  }[];
  likes: Types.ObjectId[] | IUser[];
  portions: number;
  comments: Types.ObjectId[] | IComment[];
}

export interface IRecipe extends IRecipeSchema, Document {}
