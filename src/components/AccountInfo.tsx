import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { auth } from "@/auth";

export default async function AccountInfo() {
  const session = await auth();

  return (
    <div className="flex items-center gap-2 p-4">
      <Avatar className="w-10 h-10 border border-input shadow-xs">
        <AvatarImage
          src={session?.user?.image ?? undefined}
          alt="User profile picture"
        />
        <AvatarFallback>
          {session?.user?.name
            ? session.user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
            : "?"}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <p className="text-sm font-bold">
          {session?.user?.name ?? "No user name found."}
        </p>
        <p className="text-sm">{session?.user?.email ?? "No email found."}</p>
      </div>
    </div>
  );
}
