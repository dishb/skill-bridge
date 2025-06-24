"use server";

import { auth } from "@/auth";
import client from "@/lib/db";

export async function getOpportunities() {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      throw new Error("Not authenticated.");
    }

    const db = client.db("companydb");
    const opportunitiesCollectioon = db.collection("opportunities");
    const result = await opportunitiesCollectioon.find().toArray();

    if (result === null) {
      throw new Error("An error occurred finding volunteer opportunities.");
    }

    return { ok: true, opportunities: result };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}
