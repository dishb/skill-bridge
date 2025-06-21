import type { ObjectId } from "mongodb";

export default interface Goal {
  _id?: ObjectId;
  userId: ObjectId;
  hours: number;
  status: "completed" | "in-progress" | "not-started";
  createdOn: Date;
}
