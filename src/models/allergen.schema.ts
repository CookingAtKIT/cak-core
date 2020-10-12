import { model, Schema, Types } from "mongoose";
import { IAllergenSchema } from "./allergen.types";

const allergenSchema = new Schema<IAllergenSchema>({
  _id: Types.ObjectId,
  displayname: String
});

export const Allergen = model("Allergen", allergenSchema);
