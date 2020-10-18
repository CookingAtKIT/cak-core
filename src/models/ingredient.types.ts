import { Types, Document } from "mongoose";
import { IAllergen } from "./allergen.types";
import { IUnit } from "./unit.types";

export interface IIngredientSchema {
  displayname: string;
  allergene: Types.ObjectId[] | IAllergen[];
  unit: Types.ObjectId | IUnit;
  kcal?: number;
  reweLink?: string;
}

export interface IIngredient extends IIngredientSchema, Document {}
