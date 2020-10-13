import { model, Schema, Types } from "mongoose";
import { IUnitSchema } from "./unit.types";

const unitSchema = new Schema<IUnitSchema>({
  type: String
});

export const Unit = model<IUnitSchema>("Unit", unitSchema);
