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
    return NextResponse.json({ ok: false, error: err.message });
  }
}
