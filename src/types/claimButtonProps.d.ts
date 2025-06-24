import type { ObjectId } from "mongodb";

export default interface ClaimButtonProps {
  id: string | undefined;
  status: "completed" | "in-progress" | "not-started";
}
