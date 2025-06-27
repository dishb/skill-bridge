import { NextResponse } from "next/server";
import client from "@/lib/db";
import { ObjectId } from "mongodb";

export async function POST(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const companyDB = client.db("companydb");
    const opportunitiesCollection = companyDB.collection("opportunities");
    const res = await opportunitiesCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { status: "completed" } },
      { returnDocument: "after" }
    );
    if (!res || !res.claimedBy || !res.estimatedTime) {
      throw new Error("An error occurred approving your volunteer hours.");
    }

    const claimedBy: string = res.claimedBy;
    const estimatedTime: number = res.estimatedTime / 60;

    const customerDB = client.db("customerdb");
    const hoursCollection = customerDB.collection("hours");
    const goalsCollection = customerDB.collection("goals");

    const activeGoal = await goalsCollection.findOne({
      userId: new ObjectId(claimedBy),
      status: { $ne: "completed" },
    });
    const userHours = await hoursCollection.findOne({
      userId: new ObjectId(claimedBy),
    });

    if (!userHours) {
      throw new Error("An error occurred finding your volunteer hours.");
    }

    await hoursCollection.updateOne(
      { userId: new ObjectId(claimedBy) },
      { $inc: { totalHours: estimatedTime } }
    );

    if (activeGoal) {
      const updatedHours = (userHours.hoursTowardsGoal ?? 0) + estimatedTime;

      const update: any = { status: "in-progress" };
      const hoursTowardsGoalUpdate = { hoursTowardsGoal: updatedHours };

      if (updatedHours >= activeGoal.hours) {
        update.status = "completed";
        update.completedOn = new Date();
        hoursTowardsGoalUpdate.hoursTowardsGoal = 0;
      }

      await hoursCollection.updateOne(
        { userId: new ObjectId(claimedBy) },
        { $set: hoursTowardsGoalUpdate }
      );

      await goalsCollection.updateOne(
        { _id: activeGoal._id },
        { $set: update }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message });
  }
}
