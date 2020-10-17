import { model, Schema } from "mongoose";
import { IUnit } from "./unit.types";

const unitSchema = new Schema<IUnit>({
  name: { type: String, required: true }
});

export const Unit = model<IUnit>("Unit", unitSchema);
