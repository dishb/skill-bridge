"use client";

import { useState } from "react";
import { claim } from "@/app/actions/opportunity";
import { Button } from "./ui/button";
import { Check, CheckCheck } from "lucide-react";
import type ClaimButtonProps from "@/types/claimButtonProps";

export default function ClaimButton({ id, status }: ClaimButtonProps) {
  const [disabled, setDisabled] = useState(status !== "not-started");

  return (
    <Button
      className="hover:cursor-pointer"
      disabled={disabled}
      onClick={async () => {
        const res = await claim(id);
        if (res.ok) setDisabled(true);
      }}
    >
      {disabled ? "Claimed" : "Claim"}
      {disabled ? <CheckCheck /> : <Check />}
    </Button>
  );
}
