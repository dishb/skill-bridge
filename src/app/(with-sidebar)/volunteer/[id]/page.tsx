import { getOpportunity } from "@/app/actions/opportunity";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import DynamicPageProps from "@/types/dynamicPageProps";
import { toast } from "sonner";

export default async function Page({ params }: DynamicPageProps) {
  const { id } = await params;
  const res = await getOpportunity(id);
  if (!res.ok) {
    toast.error("500: Internal Server Error", {
      description:
        res.error || "An error occurred loading the volunteer opportunity.",
    });
  }
  const opportunity = res.opportunity;

  return (
    <div className="flex flex-col items-center">
      <Card className="w-[80%]">
        <CardHeader>
          <CardTitle className="text-3xl">
            Successfully claimed opportunity!
          </CardTitle>
          <CardDescription className="text-lg"></CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal ml-6">
            <li>
              If you <strong>forgot</strong> the details, go to your home page
              to view all of your claimed volunteer opportunities.
            </li>
            <li>
              Your next step is to <strong>email</strong>{" "}
              {opportunity?.contactEmail} and begin volunteering!
            </li>
            <li>
              Once you&apos;re done, go to the home page to{" "}
              <strong>request</strong> your volunteer hours.
            </li>
            <li>
              An email will be sent to {opportunity?.createdBy} who will{" "}
              <strong>approve</strong> your hours, which will finally be added
              towards your account.
            </li>
          </ol>
        </CardContent>
        <CardFooter className="text-muted-foreground">
          ID: {opportunity?._id}
        </CardFooter>
      </Card>
    </div>
  );
}
