import { model, Schema, Types } from "mongoose";
import { IIngredient } from "./ingredient.types";

const ingredientSchema = new Schema<IIngredient>({
  displayname: { type: String, required: true },
  allergene: [{ type: Types.ObjectId, ref: "Allergen" }],
  unit: { type: Types.ObjectId, ref: "Unit", required: true },
  kcal: Number,
  reweLink: String
});

export const Ingredient = model<IIngredient>("Ingredient", ingredientSchema);
