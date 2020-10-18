import { model, Schema, Types } from "mongoose";
import { IRecipe } from "./recipe.types";

const recipeSchema = new Schema<IRecipe>({
  public: { type: Boolean, required: true },
  flags: [{ type: Types.ObjectId, ref: "User" }],
  title: { type: String, required: true },
  author: { type: Types.ObjectId, ref: "User", required: true },
  edited: Date,
  thumbnail: { type: Types.ObjectId, ref: "Image" },
  ingredients: [
    {
      ingredient: { type: Types.ObjectId, ref: "Ingredient", required: true },
      amount: { type: Number, required: true }
    }
  ],
  steps: [
    {
      index: { type: Number, required: true },
      title: { type: String, required: true },
      body: { type: String, required: true },
      img: { type: Types.ObjectId, ref: "Image" }
    }
  ],
  likes: [{ type: Types.ObjectId, ref: "User" }],
  portions: { type: Number, required: true },
  comments: [{ type: Types.ObjectId, ref: "Comment" }]
});

export const Recipe = model<IRecipe>("Recipe", recipeSchema);
