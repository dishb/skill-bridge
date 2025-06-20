"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Plus, Minus, Goal } from "lucide-react";
import { useState } from "react";

export default function GoalForm() {
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);

  function onClick() {
    setLoading(true);

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
        <div className="flex justify-center items-center w-full max-w-[40%]">
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
      </CardContent>
      <CardFooter className="flex justify-center items-center">
        <Button
          className="hover:cursor-pointer w-[40%]"
          variant="outline"
          onClick={onClick}
          disabled={loading}
        >
          <Goal /> Set goal
        </Button>
      </CardFooter>
    </Card>
  );
}
