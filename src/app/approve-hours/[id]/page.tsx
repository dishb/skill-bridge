import { notFound } from "next/navigation";
import client from "@/lib/db";
import { ObjectId } from "mongodb";
import { Button } from "@/components/ui/button";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const db = client.db("companydb");
  const opportunitiesCollection = db.collection("opportunities");

  let data;
  try {
    data = await opportunitiesCollection.findOne({ _id: new ObjectId(id) });
    if (!data) return notFound();
  } catch {
    return notFound();
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <form action={`/api/approve/${id}`} method="POST">
        <Button type="submit" className="hover:cursor-pointer">
          Approve volunteer hours
        </Button>
      </form>
    </div>
  );
}
