"use server";

import { auth } from "@/auth";
import client from "@/lib/db";
import { ObjectId } from "mongodb";
import type Opportunity from "@/types/opportunity";

export async function getOpportunity(id: string) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      throw new Error("Not authenticated.");
    }

    const db = client.db("companydb");
    const opportunitiesCollection = db.collection("opportunities");
    const result = await opportunitiesCollection.findOne({
      _id: new ObjectId(id),
    });

    if (result === null) {
      throw new Error(
        "An error occurred finding the requested volunteer opportunity."
      );
    }

    const opportunity: Opportunity = {
      _id: result._id.toString(),
      status: result.status,
      title: result.title,
      description: result.description,
      dueDate: result.dueDate,
      createdBy: result.createdBy,
      isOnline: result.isOnline,
      estimatedTime: result.estimatedTime,
      longDescription: result.longDescription,
      contactEmail: result.contactEmail,
      claimedBy: result.claimedBy,
      claimedOn: result.claimedOn,
      address: result.address,
      tags: result.tags,
    };

    return { ok: true, opportunity: opportunity };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function getUnclaimedOpportunities() {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      throw new Error("Not authenticated.");
    }

    const db = client.db("companydb");
    const opportunitiesCollection = db.collection("opportunities");
    const result = await opportunitiesCollection
      .find({ claimedBy: undefined })
      .toArray();

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

export async function getPastOpportunities() {
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
        status: "completed",
      })
      .toArray();

    if (result === null) {
      throw new Error(
        "An error occurred finding your past volunteer opportunities."
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

export async function getTotalCompletedOpportunities() {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      throw new Error("Not authenticated.");
    }

    const db = client.db("companydb");
    const opportunitiesCollection = db.collection("opportunities");
    const res = await opportunitiesCollection
      .find({
        claimedBy: new ObjectId(session.user.id),
        status: "completed",
      })
      .toArray();

    if (res === null) {
      throw new Error(
        "An error occurred finding your completed volunteer opportunities."
      );
    }

    const totalOpportunities = res.length;

    return { ok: true, totalOpportunities: totalOpportunities };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}
