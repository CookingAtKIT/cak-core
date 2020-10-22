import { Types } from "mongoose";

export class Image {
  static generateLink(image: Types.ObjectId): string {
    return process.env.HOSTNAME + image.toHexString();
  }
}
