"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "./ui/card";
import { Progress } from "./ui/progress";
import { useState, useEffect } from "react";
import type Goal from "@/types/goal";
import { getHoursTowardsGoal } from "@/app/actions/hours";
import ProgressBarProps from "@/types/progressBarProps";

export default function ProgressBar({ profilePage }: ProgressBarProps) {
  const [goalHours, setGoalHours] = useState(0);
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    async function loadGoalProgress() {
      const activeGoalRes = await fetch("/api/get-active", { method: "GET" });
      const goal = (await activeGoalRes.json()) as Goal;
      const totalHoursRes = await getHoursTowardsGoal();

      setTotalHours(totalHoursRes?.hoursTowardsGoal ?? 0);
      setGoalHours(goal?.hours ?? 0);
    }

    loadGoalProgress();
  }, []);

  return (
    <>
      {profilePage !== undefined && profilePage === true ? (
        <Progress value={(totalHours / goalHours) * 100} className="h-5" />
      ) : (
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-3xl">Goal progress</CardTitle>
            <CardDescription className="text-xl">
              Find volunteer opportunities and complete volunteer opportunities
              to gain hours towards your goal.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={(totalHours / goalHours) * 100} className="h-5" />
          </CardContent>
        </Card>
      )}
    </>
  );
}
