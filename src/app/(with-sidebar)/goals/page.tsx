import GoalProgress from "@/components/GoalProgress";
import GoalForm from "@/components/GoalForm";
import GoalHistory from "@/components/GoalHistory";

export default function Page() {
  return (
    <div className="grid grid-cols-2 w-full gap-4">
      <GoalProgress />
      <GoalForm />
      <GoalHistory />
    </div>
  );
}
