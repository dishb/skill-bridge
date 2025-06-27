import type { ObjectId } from "mongodb";

export default interface Opportunity {
  _id?: string;
  status: "completed" | "in-progress" | "not-started";
  title: string;
  description: string;
  dueDate: Date;
  createdBy: string;
  isOnline: boolean;
  estimatedTime: number;
  longDescription: string;
  contactEmail: string;
  claimedBy?: ObjectId;
  claimedOn?: Date;
  address?: string;
  tags?: string[];
}
