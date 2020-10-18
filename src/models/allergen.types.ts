import { Document } from "mongoose";

export interface IAllergenSchema {
  name: string;
}

export interface IAllergen extends IAllergenSchema, Document {}
