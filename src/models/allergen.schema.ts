import { model, Schema } from "mongoose";
import { IAllergen } from "./allergen.types";

const allergenSchema = new Schema<IAllergen>({
  name: { type: String, required: true }
});

export const Allergen = model<IAllergen>("Allergen", allergenSchema);
