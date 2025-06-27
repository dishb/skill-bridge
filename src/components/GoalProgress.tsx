"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { ChartContainer } from "./ui/chart";
import { ChartConfig } from "./ui/chart";
import { useEffect, useState } from "react";
import Goal from "@/types/goal";
import { CircleAlert } from "lucide-react";
import { initializeHours, getHoursTowardsGoal } from "@/app/actions/hours";

const chartConfig = {
  hours: {
    label: "Hours",
    color: "var(--foreground)",
  },
} satisfies ChartConfig;

export default function GoalProgress() {
  const [goalHours, setGoalHours] = useState(0);
  const [goalDate, setGoalDate] = useState("N/A");
  const [hoursTowardsGoal, setHoursTowardsGoal] = useState(0);

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const chartData = [{ hours: hoursTowardsGoal, fill: "var(--foreground)" }];

  async function loadGoalProgress() {
    const activeGoalRes = await fetch("/api/get-active", { method: "GET" });
    const goal: Goal = await activeGoalRes.json();
    const hoursTowardsGoalRes = await getHoursTowardsGoal();

    setHoursTowardsGoal(hoursTowardsGoalRes?.hoursTowardsGoal ?? 0);
    setGoalHours(goal?.hours ?? 0);
    setGoalDate(
      goal && goal?.createdOn
        ? dateFormatter.format(new Date(goal?.createdOn))
        : "N/A"
    );
  }

  useEffect(() => {
    loadGoalProgress();
    initializeHours();

    setInterval(() => {
      loadGoalProgress();
    }, 1000);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">Goal progress</CardTitle>
        {goalHours !== 0 ? (
          <CardDescription className="text-lg">
            Your goal for {goalHours} hours was set on {goalDate}.
          </CardDescription>
        ) : (
          <></>
        )}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {goalHours !== 0 ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-50"
          >
            <RadialBarChart
              data={chartData}
              startAngle={0}
              endAngle={(360 * hoursTowardsGoal) / goalHours}
              innerRadius={80}
              outerRadius={110}
            >
              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="none"
                className="first:fill-muted last:fill-background"
                polarRadius={[86, 74]}
              />
              <RadialBar dataKey="hours" background cornerRadius={10} />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-4xl font-bold"
                          >
                            {(hoursTowardsGoal / goalHours) * 100}%
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            complete
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
            </RadialBarChart>
          </ChartContainer>
        ) : (
          <div className="flex flex-col w-full h-full justify-center items-center gap-4">
            <CircleAlert className="w-30 h-auto text-red-500" />
            <p className="text-center text-lg">
              Set a goal to start tracking progress.
            </p>
          </div>
        )}
      </CardContent>
      {goalHours !== 0 ? (
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 text-lg leading-none font-medium">
            {hoursTowardsGoal} of {goalHours} hours completed.
          </div>
          <div className="text-center text-muted-foreground text-lg leading-none">
            {hoursTowardsGoal !== 0
              ? "You're making good progress, keep it up!"
              : "Complete volunteering tasks to earn hours."}
          </div>
        </CardFooter>
      ) : (
        <></>
      )}
    </Card>
  );
}
