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
    };

    await hoursCollection.insertOne(hours);

    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function getTotalHours() {
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
      throw new Error("An error occurred finding your total number of hours.");
    }

    return { ok: true, totalHours: result.totalHours };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}
