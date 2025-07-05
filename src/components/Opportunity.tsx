"use client";

import { useState } from "react";
import type OpportunityProps from "@/types/opportunityProps";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "./ui/badge";
import {
  Tag,
  Clock,
  MapPin,
  Calendar,
  BadgePlus,
  ArrowUpRight,
  X,
  MailQuestionMark,
  Send,
} from "lucide-react";
import { Button } from "./ui/button";
import ClaimButton from "./ClaimButton";
import { unclaimOpportunity } from "@/app/actions/opportunity";
import { toast } from "sonner";

export default function Opportunity({
  _id,
  status: initialStatus,
  dueDate,
  createdBy,
  description,
  title,
  isOnline,
  estimatedTime,
  tags,
  address,
  longDescription,
  contactEmail,
  homePage,
}: OpportunityProps) {
  const [status, setStatus] = useState(initialStatus);

  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const formattedDueDate = formatter.format(dueDate);

  async function onClick() {
    try {
      toast.info("Sending approval request.", {
        description: "Please wait while we send the email.",
      });

      const res = await fetch("/api/send-approval-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactEmail, _id }),
      });

      const resJson = await res.json();
      if (resJson.ok) {
        toast.success("Successfully sent approval request.", {
          description:
            "You will recieve your hours once the organization approves them!",
        });
      } else {
        throw new Error(
          resJson.error ||
            "An error occurred sending the volunteer hours approval request email.",
        );
      }
    } catch (err: any) {
      toast.error("500: Internal Server Error", {
        description: err.message,
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-full grid grid-cols-2 gap-4">
          <p className="flex gap-2">
            <Clock /> {estimatedTime} minutes
          </p>
          <p className="flex gap-2">
            <BadgePlus /> {createdBy}
          </p>
          <p className="flex gap-2">
            <Calendar /> {formattedDueDate}
          </p>
          <p className="flex gap-2">
            <MapPin /> {isOnline ? "Online" : address}
          </p>
          <div className="flex gap-2 col-span-2">
            <Tag />
            {tags?.map((item, key) => (
              <Badge key={key} variant="secondary">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <div
          className={`grid gap-4 ${homePage ? "grid-cols-3" : "grid-cols-2"}`}
        >
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="hover:cursor-pointer">
                Learn more <ArrowUpRight />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>
                  View the details for this volunteer opportunity to decide if
                  it&apos;s right for you!
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                <p>{longDescription}</p>
                <div className="h-full grid grid-cols-2 gap-4">
                  <p className="flex items-center gap-2">
                    <Clock /> {estimatedTime} minutes
                  </p>
                  <p className="flex items-center gap-2">
                    <BadgePlus /> {createdBy}
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar /> {formattedDueDate}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin /> {isOnline ? "Online" : address}
                  </p>
                  <div className="flex gap-2 col-span-2">
                    <Tag />
                    {tags?.map((item, key) => (
                      <Badge key={key} variant="secondary">
                        {item}
                      </Badge>
                    ))}
                  </div>
                  <p className="flex gap-2 col-span-2">
                    <MailQuestionMark /> {contactEmail}
                  </p>
                </div>
              </div>
              <DialogFooter className="flex w-full justify-end">
                <div className="grid grid-cols-2 max-w-fit gap-4">
                  <DialogClose asChild>
                    <Button variant="outline" className="hover:cursor-pointer">
                      Close <X />
                    </Button>
                  </DialogClose>
                  <ClaimButton
                    id={_id}
                    status={status}
                    onStatusChange={setStatus}
                  />
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {homePage ? (
            <>
              <Button
                className="hover:cursor-pointer"
                variant="outline"
                onClick={async () => {
                  await unclaimOpportunity(_id);
                }}
              >
                Unclaim <X />
              </Button>
              <Button onClick={onClick} className="hover:cursor-pointer">
                Request hours <Send />
              </Button>
            </>
          ) : (
            <ClaimButton id={_id} status={status} onStatusChange={setStatus} />
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
