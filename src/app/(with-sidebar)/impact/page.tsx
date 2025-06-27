import PastVolunteering from "@/components/PastVolunteering";
import HoursCounter from "@/components/HoursCounter";
import OpportunityCounter from "@/components/OpportunityCounter";

export default function Page() {
  return (
    <div className="grid grid-cols-2 w-full gap-4">
      <HoursCounter />
      <OpportunityCounter />
      <PastVolunteering />
    </div>
  );
}
