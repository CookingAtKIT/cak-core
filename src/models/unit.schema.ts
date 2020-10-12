import { model, Schema, Types } from "mongoose";
import { IUnitSchema } from "./unit.types";

const unitSchema = new Schema<IUnitSchema>({
  _id: Types.ObjectId,
  type: String
});

export const Unit = model("Unit", unitSchema);
