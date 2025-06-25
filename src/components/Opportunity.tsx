"use client";

import { useState } from "react";
import type Opportunity from "@/types/opportunity";
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
  ArrowRight,
  X,
  MailQuestionMark,
} from "lucide-react";
import { Button } from "./ui/button";
import ClaimButton from "./ClaimButton";
import Link from "next/link";

export default function Opportunity({
  _id,
  status: initialStatus,
  createdOn,
  createdBy,
  description,
  title,
  isOnline,
  estimatedTime,
  tags,
  address,
  longDescription,
  contactEmail,
}: Opportunity) {
  const [status, setStatus] = useState(initialStatus);

  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const formattedCreatedOn = formatter.format(createdOn);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="h-full grid grid-cols-2 gap-4">
          <p className="flex items-center gap-2">
            <Clock /> {estimatedTime} minutes
          </p>
          <p className="flex items-center gap-2">
            <BadgePlus /> {createdBy}
          </p>
          <p className="flex items-center gap-2">
            <Calendar /> {formattedCreatedOn}
          </p>
          <p className="flex items-center gap-2">
            <MapPin /> {isOnline ? "Online" : `In-person, ${address}`}
          </p>
          <div className="flex gap-2 col-span-2">
            <p className="flex items-center gap-2">
              <Tag />
            </p>
            {tags?.map((item, key) => (
              <Badge key={key} variant="secondary">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-4 grid grid-cols-2 max-w-fit">
        <ClaimButton id={_id} status={status} onStatusChange={setStatus} />
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" className="hover:cursor-pointer">
              Learn more <ArrowRight />
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
              <p className="flex gap-2">
                <MailQuestionMark /> {contactEmail}
              </p>
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
      </CardFooter>
    </Card>
  );
}
