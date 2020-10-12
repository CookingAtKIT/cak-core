import { Document } from "mongoose";

export interface IAllergenSchema extends Document {
  displayname: string;
}
