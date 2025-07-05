"use server";

import { auth } from "@/auth";
import client from "@/lib/db";
import { ObjectId } from "mongodb";
import type Hours from "@/types/hours";

export async function initializeHours() {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      throw new Error("Not authenticated.");
    }

    const db = client.db("customerdb");
    const hoursCollection = db.collection("hours");

    const existing = await hoursCollection.findOne({
      userId: new ObjectId(session.user.id),
    });

    if (existing !== null) {
      return { ok: true };
    }

    const hours: Hours = {
      userId: new ObjectId(session.user.id),
      totalHours: 0,
      hoursTowardsGoal: 0,
    };

    await hoursCollection.insertOne(hours);

    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function getTotalHours(id?: string) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      throw new Error("Not authenticated.");
    }

    let idToSearchBy = session.user.id;
    if (id) {
      idToSearchBy = id;
    }

    const db = client.db("customerdb");
    const hoursCollection = db.collection("hours");
    const result = (await hoursCollection.findOne({
      userId: new ObjectId(idToSearchBy),
    })) as Hours | null;

    if (result === null) {
      throw new Error("An error occurred finding your total number of hours.");
    }

    return { ok: true, totalHours: result.totalHours };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function getHoursTowardsGoal() {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      throw new Error("Not authenticated.");
    }

    const db = client.db("customerdb");
    const hoursCollection = db.collection("hours");
    const result = (await hoursCollection.findOne({
      userId: new ObjectId(session.user.id),
    })) as Hours | null;

    if (result === null) {
      throw new Error(
        "An error occurred finding your number of hours towards a goal.",
      );
    }

    return { ok: true, hoursTowardsGoal: result.hoursTowardsGoal };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function getLeaders() {
  try {
    const db = client.db("customerdb");
    const hoursCollection = db.collection("hours");
    const leaders = await hoursCollection
      .aggregate([
        { $sort: { totalHours: -1 } },
        { $limit: 20 },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $addFields: {
            userName: { $arrayElemAt: ["$user.name", 0] },
            userIdStr: { $toString: "$userId" },
          },
        },
        {
          $project: {
            _id: 0,
            userIdStr: 1,
            userName: { $ifNull: ["$userName", "Unable to get user name"] },
            totalHours: 1,
          },
        },
      ])
      .toArray();

    const safeLeaders = leaders.map((leader) => ({
      userId: leader.userIdStr,
      userName: leader.userName,
      totalHours: leader.totalHours,
    }));

    return { ok: true, leaders: safeLeaders };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}
