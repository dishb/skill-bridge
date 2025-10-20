import { Button } from "@/components/ui/button";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <iframe name="apiRes" className="hidden" />
      <form action={`/api/approve/${id}`} method="POST" target="apiRes">
        <Button type="submit" className="hover:cursor-pointer">
          Approve volunteer hours
        </Button>
      </form>
    </div>
  );
}
