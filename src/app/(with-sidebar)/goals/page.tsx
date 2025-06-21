import GoalProgress from "@/components/GoalProgress";
import GoalForm from "@/components/GoalForm";
import GoalHistory from "@/components/GoalHistory";
import { hasActiveGoal } from "@/app/actions/goal";
import { toast } from "sonner";

export default async function Page() {
  const res = await hasActiveGoal();
  let activeGoal = false;
  if (!res.ok) {
    toast.error("500: Internal Server Error", {
      description: "An error occurred loading your current goal.",
    });
  } else {
    activeGoal = res.hasActiveGoal ?? false;
  }

  return (
    <div className="grid grid-cols-2 w-full gap-4">
      <GoalProgress />
      <GoalForm hasActiveGoal={activeGoal} />
      <GoalHistory />
    </div>
  );
}
