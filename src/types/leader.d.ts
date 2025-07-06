import type { ObjectId } from "mongodb";

export default interface Leader {
  position: number;
  userName: string;
  totalHours: number;
  userId: ObjectId;
}
