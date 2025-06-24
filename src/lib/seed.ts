import client from "./db";

const opportunities = [
  {
    status: "not-started",
    title: "Write a Birthday Poem for a Veteran",
    description:
      "Help create a short birthday poem for Mr. Charles, a 92-year-old WWII veteran in hospice care.",
    createdOn: new Date("2025-06-15T09:00:00Z"),
    createdBy: "Hope Veterans Network",
    isOnline: true,
    estimatedTime: 20,
    tags: ["writing", "creative", "veterans", "elderly", "remote"],
  },
  {
    status: "not-started",
    title: "Teach Basic Email to a Senior",
    description:
      "Ms. Linda needs help learning how to send emails and open attachments using Gmail.",
    createdOn: new Date("2025-06-17T14:00:00Z"),
    createdBy: "Community Care Seattle",
    isOnline: false,
    estimatedTime: 30,
    address: "1234 Pine St, Seattle, WA 98101",
    tags: ["tech-help", "elderly", "teaching", "in-person"],
  },
  {
    status: "not-started",
    title: "Record a Spanish Audiobook Chapter",
    description:
      "Help a visually impaired student in Dallas by recording a Spanish literature chapter aloud.",
    createdOn: new Date("2025-06-16T11:30:00Z"),
    createdBy: "Access Ed Dallas",
    isOnline: true,
    estimatedTime: 25,
    tags: ["language", "audio", "education", "disability", "remote"],
  },
  {
    status: "not-started",
    title: "15-Minute Encouragement Call to an Isolated Elder",
    description:
      "Make a quick phone call to Mr. Barry in Ohio to chat and lift his spirits.",
    createdOn: new Date("2025-06-18T16:45:00Z"),
    createdBy: "KindVoice",
    isOnline: true,
    estimatedTime: 15,
    tags: ["conversation", "empathy", "elderly", "remote", "mental-health"],
  },
  {
    status: "not-started",
    title: "Draw a Get-Well Card for a Hospitalized Child",
    description:
      "Design a digital or paper get-well card for Ava, age 6, undergoing chemo in Denver.",
    createdOn: new Date("2025-06-14T08:00:00Z"),
    createdBy: "Healing Hearts Foundation",
    isOnline: true,
    estimatedTime: 30,
    tags: ["art", "kids", "creative", "hospital", "remote"],
  },
  {
    status: "not-started",
    title: "Help Translate a Local Resource Flyer to Vietnamese",
    description:
      "Translate a flyer about free community meals into Vietnamese for distribution in Philadelphia.",
    createdOn: new Date("2025-06-17T10:00:00Z"),
    createdBy: "Philly Mutual Aid",
    isOnline: true,
    estimatedTime: 35,
    tags: ["language", "translation", "community", "remote"],
  },
  {
    status: "not-started",
    title: "Set Up Zoom for a Senior Living in Florida",
    description:
      "Assist Mrs. Taylor with setting up Zoom so she can join her book club.",
    createdOn: new Date("2025-06-19T13:00:00Z"),
    createdBy: "Golden Years Center",
    isOnline: false,
    estimatedTime: 20,
    address: "456 Palm Dr, Sarasota, FL 34236",
    tags: ["tech-help", "elderly", "social", "in-person"],
  },
  {
    status: "not-started",
    title: "Create a Short Video on Climate Change for 4th Graders",
    description:
      "Record or animate a simple 2-minute video explaining climate change to young kids.",
    createdOn: new Date("2025-06-16T12:00:00Z"),
    createdBy: "Green Future Youth Project",
    isOnline: true,
    estimatedTime: 40,
    tags: ["education", "climate", "creative", "youth", "remote"],
  },
  {
    status: "not-started",
    title: "Help a Refugee Learn Job Interview Basics",
    description:
      "Provide a short role-play interview session for a newly settled refugee in Chicago.",
    createdOn: new Date("2025-06-18T17:30:00Z"),
    createdBy: "New Start Chicago",
    isOnline: false,
    estimatedTime: 30,
    address: "789 W Adams St, Chicago, IL 60607",
    tags: ["coaching", "refugees", "in-person", "career-prep", "empathy"],
  },
  {
    status: "not-started",
    title: "Read a Chapter from a Classic Book for an Audiobook Library",
    description:
      "Record yourself reading a chapter from 'Pride and Prejudice' for a free public audiobook.",
    createdOn: new Date("2025-06-15T15:00:00Z"),
    createdBy: "Voices for All",
    isOnline: true,
    estimatedTime: 25,
    tags: ["reading", "audio", "education", "literature", "remote"],
  },
];

const db = client.db("companydb");
const opportunitiesCollection = db.collection("opportunities");
opportunitiesCollection.insertMany(opportunities);
