import Opportunity from "@/components/Opportunity";
import ProgressBar from "@/components/ProgressBar";
import { getOpportunities } from "@/app/actions/opportunity";
import { ObjectId } from "mongodb";

export default async function Page() {
  const result = await getOpportunities();
  const opportunities = result.opportunities ?? [];

  return (
    <div className="flex flex-col gap-4">
      <ProgressBar />
      <h2 className="font-bold text-3xl mt-8">
        Browse volunteer opportunities
      </h2>
      <div className="grid grid-cols-2 gap-4 auto-rows-fr">
        {opportunities.map((item, key) => (
          <Opportunity
            key={key}
            _id={item._id.toString()}
            status={item.status}
            title={item.title}
            description={item.description}
            createdOn={item.createdOn}
            createdBy={item.createdBy}
            isOnline={item.isOnline}
            estimatedTime={item.estimatedTime}
            tags={item.tags}
            address={item.address}
          />
        ))}
      </div>
    </div>
  );
}
