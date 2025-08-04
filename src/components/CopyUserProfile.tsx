"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy } from "lucide-react";
import CopyUserProfileProps from "@/types/copyUserProfileProps";

function copyUserProfile(userID: string | undefined) {
  if (userID == undefined) {
    toast.error("Error copying user profile.", {
      description: "The user ID was not found.",
    });

    return;
  }

  let url = "";
  if (process.env.NODE_ENV === "development") {
    url = "http://localhost:3000";
  } else if (process.env.NODE_ENV === "production") {
    url = "https://https://skill-bridge-phi.vercel.app";
  }

  navigator.clipboard
    .writeText(`${url}/profile/${userID}`)
    .then(() => {
      toast.success("Copied user profile.", {
        description: `User ID: ${userID}`,
      });
    })
    .catch(() => {
      toast.error("Error copying user profile.", {
        description: "The user ID was not found.",
      });
    });
}

export default function CopyUserProfile({ userID }: CopyUserProfileProps) {
  return (
    <Button
      onClick={() => {
        copyUserProfile(userID);
      }}
      variant="secondary"
      className="hover:cursor-pointer"
    >
      <Copy /> Copy profile link
    </Button>
  );
}
