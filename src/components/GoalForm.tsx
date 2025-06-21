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
import { Plus, Minus, Goal, Trash, Check } from "lucide-react";
import { useState } from "react";
import { deleteGoal, createGoal } from "@/app/actions/goal";
import { toast } from "sonner";
import GoalFormProps from "@/types/goalFormProps";

export default function GoalForm({ hasActiveGoal }: GoalFormProps) {
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasGoal, setHasGoal] = useState(hasActiveGoal);

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
                className="hover:cursor-pointer"
                onClick={() => setCounter(counter >= 1 ? counter - 1 : counter)}
                disabled={loading}
              >
                <Minus />
              </Button>

              <p className="text-7xl font-bold mx-auto">{counter}</p>

              <Button
                className="hover:cursor-pointer"
                variant="outline"
                onClick={() => setCounter(counter + 1)}
                disabled={loading}
              >
                <Plus />
              </Button>
            </div>

            <p className="text-4xl text-muted-foreground font-bold">Hours</p>
          </>
        ) : (
          <div className="flex flex-col w-full h-full max-w-[80%] items-center justify-center gap-4">
            <Check className="w-30 h-auto" />
            <p className="text-center text-lg">
              You already set a goal to complete XX hours on XX/XX/XXX.
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
              <Goal /> Set goal
            </Button>
          ) : (
            <Button
              className="flex-1 hover:cursor-pointer"
              onClick={onClick}
              disabled={loading}
              variant="destructive"
            >
              <Trash /> Delete goal
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
