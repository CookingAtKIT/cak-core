import { Types, Document } from "mongoose";

export interface IIngredientSchema extends Document {
  displayname: string;
  allergene: Types.ObjectId[]; // allergen
  unit: Types.ObjectId; // unit
  kcal: number;
  reweLink: string;
}
