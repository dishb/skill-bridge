import { notFound } from "next/navigation";
import client from "@/lib/db";
import { ObjectId } from "mongodb";
import { Button } from "@/components/ui/button";

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  const db = client.db("companydb");
  const opportunitiesCollection = db.collection("opportunities");

  let data;
  try {
    data = await opportunitiesCollection.findOne({ _id: new ObjectId(id) });
    if (!data) return notFound();
  } catch (err) {
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
