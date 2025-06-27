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
import { getTotalHours } from "@/app/actions/hours";
import { toast } from "sonner";

export default function HoursCounter() {
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    async function loadTotalHours() {
      const res = await getTotalHours();
      if (res.ok) {
        setTotalHours(res.totalHours ?? 0);
      } else {
        toast.error("500: Internal Server Error", {
          description:
            res.error ?? "An error occurred loading your total hours.",
        });
      }
    }

    loadTotalHours();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">Total hours</CardTitle>
        <CardDescription className="text-lg">
          View your total amount of approved volunteer hours.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-full flex flex-col justify-center items-center">
          <p
            className={`text-7xl font-bold ${totalHours === 0 ? "text-red-500" : "text-green-500"}`}
          >
            {totalHours}
          </p>
          <p className="uppercase text-muted-foreground">
            {totalHours === 1 ? "Hour" : "Hours"}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <p className="text-center text-lg leading-none">
          {totalHours !== 0
            ? "You're doing great, keep up the good work."
            : "Complete a volunteering opportunity and claim its hours."}
        </p>
      </CardFooter>
    </Card>
  );
}
