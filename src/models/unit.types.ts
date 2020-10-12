import { Document } from "mongoose";

export enum EIngredientUnit {
  ml = "ml",
  g = "g",
  pcs = "pcs",
  prt = "prt",
  amt = "amt",
  tsp = "tsp",
  tbls = "tbls"
}

export interface IUnitSchema extends Document {
  type: string | EIngredientUnit;
}
