import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getTotalHours } from "@/app/actions/hours";
import { goalsCompleted } from "@/app/actions/goal";
import { getUser } from "@/app/actions/user";
import { Clock, Goal } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";
import DynamicPageProps from "@/types/dynamicPageProps";
import CopyUserProfile from "@/components/CopyUserProfile";

export default async function Page({ params }: DynamicPageProps) {
  const { id } = await params;

  const userRes = await getUser(id);
  const user = userRes.user;

  const hoursRes = await getTotalHours(id);
  const totalHours = hoursRes.totalHours ?? 0;

  const goalsRes = await goalsCompleted(id);
  const numGoalsCompleted = goalsRes.goalsCompleted ?? 0;

  return (
    <Card>
      <CardHeader className="flex items-center gap-4">
        <Avatar className="w-16 h-16 border border-input shadow-xs">
          <AvatarImage src={user?.image ?? undefined} />
          <AvatarFallback className="text-2xl">
            {user?.name
              ? user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              : "?"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <CardTitle className="text-3xl">{user?.name}</CardTitle>
          <CardDescription className="text-lg">{user?.email}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          <p className="flex items-center gap-2 text-xl">
            <Clock /> Total hours: {totalHours.toFixed(1)}
          </p>
          <p className="flex items-center gap-2 text-xl">
            <Clock /> Goals completed: {numGoalsCompleted}
          </p>
          <div className="col-span-2 flex flex-col gap-4">
            <p className="flex items-center gap-2 text-xl">
              <Goal /> Current goal progress:
            </p>
            <ProgressBar profilePage />
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-muted-foreground flex gap-4 align-items">
        <CopyUserProfile userID={user?._id?.toString()} />
        <p>User ID: {user?._id ? user._id.toString() : "Not found."}</p>
      </CardFooter>
    </Card>
  );
}
