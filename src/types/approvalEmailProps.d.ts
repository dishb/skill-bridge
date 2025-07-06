import type Opportunity from "@/types/opportunity";

export default interface ApprovalEmailProps {
  magicLink: string;
  opportunity?: Opportunity;
}
