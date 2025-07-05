import { auth } from "@/auth";
import { ObjectId } from "mongodb";
import client from "@/lib/db";
import type User from "@/types/user";

export async function getUser(id?: string) {
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
    const hoursCollection = db.collection("users");
    const result = (await hoursCollection.findOne({
      _id: new ObjectId(idToSearchBy),
    })) as User | null;

    if (result === null) {
      throw new Error("An error occurred finding your user information.");
    }

    return { ok: true, user: result };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}
