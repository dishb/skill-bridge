import { NextResponse } from "next/server";
import { auth } from "@/auth";
import client from "@/lib/db";
import { ObjectId } from "mongodb";
import type Goal from "@/types/goal";
import { getHoursTowardsGoal } from "@/app/actions/hours";

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      throw new Error("Not authenticated.");
    }

    const db = client.db("customerdb");
    const goalCollection = db.collection("goals");
    const activeGoal = (await goalCollection.findOne({
      userId: new ObjectId(session.user.id),
      status: { $ne: "completed" },
    })) as Goal | null;

    const res = await getHoursTowardsGoal();
    if (!res.ok) {
      throw new Error(res.error);
    }

    if (activeGoal && activeGoal.hours === res.hoursTowardsGoal) {
      await goalCollection.findOneAndUpdate(
        { _id: activeGoal._id },
        { $set: { status: "completed" } }
      );

      return NextResponse.json(null, { status: 200 });
    }

    return NextResponse.json(activeGoal, { status: 200 });
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
