import { Store } from "lucide-react";
import LoginButton from "@/components/LoginButton";
import { auth } from "@/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default async function Page() {
  const session = await auth();

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="max-w-100 flex flex-col gap-6 justify-center items-center">
        <Store className="w-16 h-auto" />
        <h1 className="font-bold text-4xl">SkillBridge</h1>
        <h2 className="text-center">
          Developed by Dishant Bhandula for the 2025 Congressional App
          Challenge.
        </h2>
        {!session || !session.user || !session.user.id ? (
          <LoginButton />
        ) : (
          <Button asChild className="hover:cursor-pointer">
            <Link href="/home"><Home /> Go your home page</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
