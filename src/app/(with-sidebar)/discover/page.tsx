"use client";

import Opportunity from "@/components/Opportunity";
import ProgressBar from "@/components/ProgressBar";
import { getOpportunities } from "@/app/actions/opportunity";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

export default function Page() {
  const [search, setSearch] = useState("");
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getOpportunities().then((result) => {
      setOpportunities(result.opportunities ?? []);
      setLoaded(true);
    });
  }, []);

  const filtered = opportunities.filter((item) =>
    search.trim() === ""
      ? true
      : item.tags?.some((tag: string) =>
          tag.toLowerCase().includes(search.toLowerCase())
        )
  );

  return (
    <div className="flex flex-col gap-4">
      <ProgressBar />
      <div className="flex justify-between mt-8">
        <h2 className="font-bold text-3xl">Browse volunteer opportunities</h2>

        <div className="flex items-center gap-2 w-[30%]">
          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Search size={18} />
            </span>
            <Input
              type="search"
              placeholder="Search"
              className="pl-10 w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {loaded &&
          filtered.map((item, key) => (
            <Opportunity
              contactEmail={item.contactEmail}
              longDescription={item.longDescription}
              key={key}
              _id={item._id}
              status={item.status}
              title={item.title}
              description={item.description}
              dueDate={item.dueDate}
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
