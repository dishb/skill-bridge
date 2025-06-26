"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Plus, Minus, GoalIcon, Trash, CircleCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { deleteGoal, createGoal } from "@/app/actions/goal";
import { toast } from "sonner";
import type GoalFormProps from "@/types/goalFormProps";
import type Goal from "@/types/goal";

export default function GoalForm({ hasActiveGoal }: GoalFormProps) {
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasGoal, setHasGoal] = useState(hasActiveGoal);
  const [goalHours, setGoalHours] = useState(0);
  const [goalDate, setGoalDate] = useState("N/A");

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  async function loadGoalProgress() {
    const res = await fetch("/api/get-active", { method: "GET" });
    const goal: Goal = await res.json();

    setGoalHours(goal?.hours ?? 0);
    console.log("createdOn", goal?.createdOn);
    setGoalDate(
      goal && goal?.createdOn
        ? dateFormatter.format(new Date(goal?.createdOn))
        : "N/A"
    );
  }

  useEffect(() => {
    loadGoalProgress();

    setInterval(() => {
      loadGoalProgress();
    }, 1000);
  }, []);

  async function onClick() {
    if (!hasGoal && counter === 0) {
      return;
    }
    setLoading(true);

    let res = null;
    if (hasGoal) {
      res = await deleteGoal();
      if (res.ok) {
        toast.success("Your goal was deleted.", {
          description: "Create a new goal to start tracking progress!",
        });
      } else {
        toast.error("500: Internal Server Error", {
          description: res.error || "An error occurred deleting your goal.",
        });
      }
    } else {
      res = await createGoal(counter);
      if (res.ok) {
        toast.success("Your goal was created.", {
          description: "Start volunteering to accomplish your goal!",
        });
      } else {
        toast.error("500: Internal Server Error", {
          description: res.error || "An error occurred creating your goal.",
        });
      }
    }

    setCounter(0);
    setHasGoal(!hasGoal);
    setLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">Set a new goal</CardTitle>
        <CardDescription className="text-lg">
          Set a new goal and begin tracking your progress.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col w-full h-full justify-center items-center gap-4">
        {!hasGoal ? (
          <>
            <div className="flex justify-center items-center w-full max-w-[60%]">
              <Button
                variant="outline"
                className="hover:cursor-pointer rounded-full w-10 h-10"
                onClick={() => setCounter(counter >= 1 ? counter - 1 : counter)}
                disabled={loading}
              >
                <Minus />
              </Button>

              <div className="flex flex-col mx-auto justify-center items-center">
                <p className="text-7xl font-bold">{counter}</p>
                <p className="uppercase text-muted-foreground">Hours</p>
              </div>

              <Button
                className="hover:cursor-pointer rounded-full w-10 h-10"
                variant="outline"
                onClick={() => setCounter(counter + 1)}
                disabled={loading}
              >
                <Plus />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col w-full h-full max-w-[80%] items-center justify-center gap-4">
            <CircleCheck className="w-30 h-auto text-green-500" />
            <p className="text-center text-lg">
              You already set a goal on {goalDate} to complete {goalHours}{" "}
              hours.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center items-center">
        <div className="flex gap-4 w-full max-w-[60%] justify-center items-center">
          {!hasGoal ? (
            <Button
              className="flex-1 hover:cursor-pointer"
              onClick={onClick}
              disabled={loading}
            >
              <GoalIcon /> Set goal
            </Button>
          ) : (
            <Button
              className="flex-1 hover:cursor-pointer"
              onClick={onClick}
              disabled={loading}
            >
              <Trash /> Delete goal
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
