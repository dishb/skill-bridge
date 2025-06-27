"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import { getTotalCompletedOpportunities } from "@/app/actions/opportunity";
import { toast } from "sonner";

export default function OpportunityCounter() {
  const [totalOpportunities, setTotalOpportunities] = useState(0);

  useEffect(() => {
    async function loadTotalCompletedOpportunities() {
      const res = await getTotalCompletedOpportunities();
      if (res.ok) {
        setTotalOpportunities(res.totalOpportunities ?? 0);
      } else {
        toast.error("500: Internal Server Error", {
          description:
            res.error ??
            "An error occurred loading your total of completed opportunities..",
        });
      }
    }

    loadTotalCompletedOpportunities();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">Total opportunities</CardTitle>
        <CardDescription className="text-lg">
          View the total amount of volunteering opportunities you have
          completed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-full flex flex-col justify-center items-center">
          <p
            className={`text-7xl font-bold ${totalOpportunities === 0 ? "text-red-500" : "text-green-500"}`}
          >
            {totalOpportunities}
          </p>
          <p className="uppercase text-muted-foreground">
            {totalOpportunities === 1 ? "Opportunity" : "Opportunities"}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <p className="text-center text-lg leading-none">
          {totalOpportunities !== 0
            ? "Keep volunteering, you're doing awesome!"
            : "Start volunteering today to make an impact!"}
        </p>
      </CardFooter>
    </Card>
  );
}
