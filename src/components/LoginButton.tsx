"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { SiGoogle } from "@icons-pack/react-simple-icons";

export default function LoginButton() {
  return (
    <Button
      className="hover:cursor-pointer"
      onClick={async () => {
        await signIn("google", { redirectTo: "/home" });
      }}
    >
      <SiGoogle />
      Sign in with Google
    </Button>
  );
}
