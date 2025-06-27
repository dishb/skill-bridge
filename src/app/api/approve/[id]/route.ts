import { NextResponse, NextRequest } from "next/server";
import client from "@/lib/db";
import { ObjectId } from "mongodb";

export async function POST(
  _: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

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

    await hoursCollection.findOneAndUpdate(
      { userId: new ObjectId(claimedBy) },
      { $inc: { totalHours: estimatedTime } }
    );

    const goalsCollection = customerDB.collection("goals");
    const activeGoal = await goalsCollection.findOne({
      userId: new ObjectId(claimedBy),
      status: { $ne: "completed" },
    });

    if (activeGoal) {
      await hoursCollection.findOneAndUpdate(
        { userId: new ObjectId(claimedBy) },
        { $inc: { hoursTowardsGoal: estimatedTime } }
      );
      await goalsCollection.findOneAndUpdate(
        { userId: new ObjectId(claimedBy) },
        { $set: { status: "in-progress" } }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.log("ERROR", err.message);
    return NextResponse.json({ ok: false, error: err.message });
  }
}
