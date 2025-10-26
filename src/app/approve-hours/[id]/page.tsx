import ApproveForm from "@/components/ApproveForm";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <ApproveForm id={id} />
    </div>
  );
}
