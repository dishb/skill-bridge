import type Opportunity from "@/types/opportunity";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Tag,
  Clock,
  MapPin,
  Calendar,
  BadgePlus,
  ArrowRight,
} from "lucide-react";
import { Button } from "./ui/button";

export default function Opportunity({
  status,
  createdOn,
  createdBy,
  description,
  title,
  isOnline,
  estimatedTime,
  tags,
  address,
}: Opportunity) {
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
      <CardFooter>
        <Button className="hover:cursor-pointer">
          Learn more <ArrowRight />
        </Button>
      </CardFooter>
    </Card>
  );
}
