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

    const opportunities = result.map((opportunity) => ({
      ...opportunity,
      _id: opportunity._id.toString(),
    }));

    return { ok: true, opportunities: opportunities };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function unclaimOpportunity(id: string | undefined) {
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
          status: "not-started",
        },
        $unset: {
          claimedBy: undefined,
          claimedOn: undefined,
        },
      }
    );

    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function claimOpportunity(id: string | undefined) {
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
          claimedBy: new ObjectId(session.user.id),
          claimedOn: new Date(),
        },
      }
    );

    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function getClaimedOpportunities() {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      throw new Error("Not authenticated.");
    }

    const db = client.db("companydb");
    const opportunitiesCollection = db.collection("opportunities");
    const result = await opportunitiesCollection
      .find({
        claimedBy: new ObjectId(session.user.id),
        status: { $ne: "completed" },
      })
      .toArray();

    if (result === null) {
      throw new Error(
        "An error occurred finding your volunteer opportunities."
      );
    }

    const opportunities = result.map((opportunity) => ({
      ...opportunity,
      _id: opportunity._id.toString(),
      claimedBy: opportunity.claimedBy.toString(),
    }));

    return { ok: true, opportunities: opportunities };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}
