import { Store } from "lucide-react";
import LoginButton from "@/components/LoginButton";

export default function Page() {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="max-w-100 flex flex-col gap-6 justify-center items-center">
        <Store className="w-16 h-auto" />
        <h1 className="font-bold text-4xl">SkillBridge</h1>
        <h2 className="text-center">
          Developed by Dishant Bhandula for the 2025 Congressional App
          Challenge.
        </h2>
        <LoginButton />
      </div>
    </div>
  );
}
