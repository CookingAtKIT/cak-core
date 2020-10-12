import { model, Schema, Types } from "mongoose";
import { IRecipeSchema } from "./recipe.types";

const recipeSchema = new Schema<IRecipeSchema>({
  _id: Types.ObjectId,
  public: Boolean,
  flags: [Types.ObjectId],
  title: String,
  author: Types.ObjectId,
  edited: Date,
  thumbnail: Types.ObjectId,
  ingredients: [
    {
      _id: Types.ObjectId,
      amount: Number
    }
  ],
  steps: [
    {
      index: Number,
      title: String,
      body: String,
      img: Types.ObjectId
    }
  ],
  likes: [Types.ObjectId],
  portions: Number,
  comments: [Types.ObjectId]
});

export const Recipe = model("Recipe", recipeSchema);
