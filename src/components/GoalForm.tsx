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
import { Plus, Minus, Goal, Trash } from "lucide-react";
import { useState } from "react";

export default function GoalForm() {
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasGoal, setHasGoal] = useState(false);

  function onClick() {
    setLoading(true);

    setHasGoal(true);
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
            <p className="text-center text-3xl">
              You already set a goal to complete XX hours by XX/XX/XXX.
            </p>
            <p className="text-center text-muted-foreground">
              Are you sure you want to start over?
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
