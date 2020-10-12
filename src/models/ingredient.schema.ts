import { model, Schema, Types } from "mongoose";
import { IIngredientSchema } from "./ingredient.types";

const ingredientSchema = new Schema<IIngredientSchema>({
  _id: Types.ObjectId,
  displayname: String,
  allergene: [Types.ObjectId],
  unit: Types.ObjectId,
  kcal: Number,
  reweLink: String
});

export const Ingredient = model("Ingredient", ingredientSchema);
