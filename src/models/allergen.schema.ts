import { model, Schema, Types } from "mongoose";
import { IAllergenSchema } from "./allergen.types";

const allergenSchema = new Schema<IAllergenSchema>({
  displayname: String
});

export const Allergen = model<IAllergenSchema>("Allergen", allergenSchema);
