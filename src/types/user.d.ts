import type { ObjectId } from "mongodb";

export default interface User {
  _id?: ObjectId;
  email?: string;
  image?: string;
  name?: string;
}
