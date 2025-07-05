"use server";

import { auth } from "@/auth";
import client from "@/lib/db";
import { ObjectId } from "mongodb";
import type Goal from "@/types/goal";

export async function hasActiveGoal() {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      throw new Error("Not authenticated.");
    }

    const db = client.db("customerdb");
    const goalCollection = db.collection("goals");
    const result = await goalCollection.findOne({
      userId: new ObjectId(session.user.id),
      status: { $ne: "completed" },
    });

    return { ok: true, hasActiveGoal: result !== null };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function deleteGoal() {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      throw new Error("Not authenticated.");
    }

    const db = client.db("customerdb");
    const goalCollection = db.collection("goals");
    const result = await goalCollection.deleteOne({
      userId: new ObjectId(session.user.id),
    });

    if (result.deletedCount === 0) {
      throw new Error("An error occurred deleting your goal.");
    }

    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function createGoal(hours: number) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      throw new Error("Not authenticated.");
    }

    const goal: Goal = {
      userId: new ObjectId(session.user.id),
      hours: hours,
      status: "not-started",
      createdOn: new Date(),
    };

    const db = client.db("customerdb");
    const goalCollection = db.collection("goals");
    await goalCollection.insertOne(goal);

    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function goalsCompleted(id?: string) {
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
    const goalCollection = db.collection("goals");
    const res = await goalCollection
      .find({
        userId: new ObjectId(idToSearchBy),
        status: "completed",
      })
      .toArray();

    return { ok: true, goalsCompleted: res.length };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}
