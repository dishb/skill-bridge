"use server";

import { auth } from "@/auth";
import client from "@/lib/db";
import { ObjectId } from "mongodb";

export async function getOpportunities() {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      throw new Error("Not authenticated.");
    }

    const db = client.db("companydb");
    const opportunitiesCollection = db.collection("opportunities");
    const result = await opportunitiesCollection.find().toArray();

    if (result === null) {
      throw new Error("An error occurred finding volunteer opportunities.");
    }

    return { ok: true, opportunities: result };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function claim(id: string | undefined) {
  if (!id) {
    throw new Error("The volunteer opportunity could not be found.");
  }

  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      throw new Error("Not authenticated.");
    }

    const db = client.db("companydb");
    const opportunitiesCollection = db.collection("opportunities");
    await opportunitiesCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          status: "in-progress",
          acceptedBy: new ObjectId(session.user.id),
        },
      }
    );

    return { ok: true };
  } catch (err: any) {
    console.log(err.message);
    return { ok: false, error: err.message };
  }
}
