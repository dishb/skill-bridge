import type { ObjectId } from "mongodb";

export default interface Opportunity {
  _id?: string;
  status: "completed" | "in-progress" | "not-started";
  title: string;
  description: string;
  createdOn: Date;
  createdBy: string;
  isOnline: boolean;
  estimatedTime: number;
  longDescription: string;
  contactEmail: string;
  acceptedBy?: ObjectId;
  address?: string;
  tags?: string[];
}
