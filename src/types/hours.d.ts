import type { ObjectId } from "mongodb";

export default interface Hours {
  userId: ObjectId;
  totalHours: number;
  hoursTowardsGoal: number;
}
