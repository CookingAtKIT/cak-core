import { model, Schema, Types } from "mongoose";
import { IIngredientSchema } from "./ingredient.types";

const ingredientSchema = new Schema<IIngredientSchema>({
  displayname: String,
  allergene: [Types.ObjectId],
  unit: Types.ObjectId,
  kcal: Number,
  reweLink: String
});

export const Ingredient = model<IIngredientSchema>("Ingredient", ingredientSchema);
