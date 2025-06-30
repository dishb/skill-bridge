"use client";

import { claimOpportunity } from "@/app/actions/opportunity";
import { Button } from "./ui/button";
import { Check, CheckCheck } from "lucide-react";
import type ClaimButtonProps from "@/types/claimButtonProps";
import { useRouter } from "next/navigation";

export default function ClaimButton({
  id,
  status,
  onStatusChange,
}: ClaimButtonProps) {
  const disabled = status !== "not-started";
  const router = useRouter();

  return (
    <Button
      className="hover:cursor-pointer"
      disabled={disabled}
      onClick={async () => {
        const res = await claimOpportunity(id);
        if (res.ok) onStatusChange("in-progress");
        router.push(`/volunteer/${id}`);
      }}
    >
      {disabled ? "Claimed" : "Claim"}
      {disabled ? <CheckCheck /> : <Check />}
    </Button>
  );
}
