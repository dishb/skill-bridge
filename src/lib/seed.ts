import client from "./db";

const opportunities = [
  {
    status: "not-started",
    title: "Write a Birthday Poem for a Veteran",
    description:
      "Help create a short birthday poem for Mr. Charles, a 92-year-old WWII veteran in hospice care.",
    longDescription:
      "Mr. Charles has dedicated much of his life to serving the country. As he celebrates his 92nd birthday in hospice care, we want to honor him with a heartfelt birthday poem. Your words can bring joy and recognition to someone who served selflessly.",
    createdOn: new Date("2025-06-15T09:00:00Z"),
    createdBy: "Hope Veterans Network",
    isOnline: true,
    estimatedTime: 20,
    contactEmail: "volunteer@hopeveterans.org",
    tags: ["writing", "creative", "veterans", "elderly", "remote"],
  },
  {
    status: "not-started",
    title: "Teach Basic Email to a Senior",
    description:
      "Ms. Linda needs help learning how to send emails and open attachments using Gmail.",
    longDescription:
      "Ms. Linda, a friendly senior in Seattle, wants to stay connected with her grandchildren but struggles with email basics. You’ll meet her at her community center and show her how to write, send, and manage emails, as well as open attachments safely.",
    createdOn: new Date("2025-06-17T14:00:00Z"),
    createdBy: "Community Care Seattle",
    isOnline: false,
    estimatedTime: 30,
    address: "1234 Pine St, Seattle, WA 98101",
    contactEmail: "info@communitycareseattle.org",
    tags: ["tech-help", "elderly", "teaching", "in-person"],
  },
  {
    status: "not-started",
    title: "Record a Spanish Audiobook Chapter",
    description:
      "Help a visually impaired student in Dallas by recording a Spanish literature chapter aloud.",
    longDescription:
      "A local student with visual impairment is falling behind in Spanish class. By recording one chapter from their assigned literature book, you’ll help make education more accessible and inclusive. Native or fluent Spanish speakers preferred.",
    createdOn: new Date("2025-06-16T11:30:00Z"),
    createdBy: "Access Ed Dallas",
    isOnline: true,
    estimatedTime: 25,
    contactEmail: "projects@accesseddallas.org",
    tags: ["language", "audio", "education", "disability", "remote"],
  },
  {
    status: "not-started",
    title: "15-Minute Encouragement Call to an Isolated Elder",
    description:
      "Make a quick phone call to Mr. Barry in Ohio to chat and lift his spirits.",
    longDescription:
      "Mr. Barry, living alone in Ohio, looks forward to hearing a friendly voice. Your brief check-in call can brighten his day and reduce feelings of isolation and loneliness. No special skills needed—just kindness and a listening ear.",
    createdOn: new Date("2025-06-18T16:45:00Z"),
    createdBy: "KindVoice",
    isOnline: true,
    estimatedTime: 15,
    contactEmail: "support@kindvoice.org",
    tags: ["conversation", "empathy", "elderly", "remote", "mental-health"],
  },
  {
    status: "not-started",
    title: "Draw a Get-Well Card for a Hospitalized Child",
    description:
      "Design a digital or paper get-well card for Ava, age 6, undergoing chemo in Denver.",
    longDescription:
      "Ava is a brave 6-year-old undergoing chemotherapy treatment. Your colorful, creative card will be delivered to her hospital room to lift her spirits during this challenging time. Digital designs or hand-drawn cards are both welcome.",
    createdOn: new Date("2025-06-14T08:00:00Z"),
    createdBy: "Healing Hearts Foundation",
    isOnline: true,
    estimatedTime: 30,
    contactEmail: "volunteers@healingheartsfoundation.org",
    tags: ["art", "kids", "creative", "hospital", "remote"],
  },
  {
    status: "not-started",
    title: "Help Translate a Local Resource Flyer to Vietnamese",
    description:
      "Translate a flyer about free community meals into Vietnamese for distribution in Philadelphia.",
    longDescription:
      "Philadelphia’s community center needs help translating a flyer about their free meal program for Vietnamese-speaking residents. Your translation will ensure more families know about and can access this vital resource.",
    createdOn: new Date("2025-06-17T10:00:00Z"),
    createdBy: "Philly Mutual Aid",
    isOnline: true,
    estimatedTime: 35,
    contactEmail: "outreach@phillymutualaid.org",
    tags: ["language", "translation", "community", "remote"],
  },
  {
    status: "not-started",
    title: "Set Up Zoom for a Senior Living in Florida",
    description:
      "Assist Mrs. Taylor with setting up Zoom so she can join her book club.",
    longDescription:
      "Mrs. Taylor, a book-loving senior in Sarasota, needs help setting up Zoom on her tablet. By guiding her through installation and a brief tutorial, you’ll help her reconnect with her weekly book club meetings.",
    createdOn: new Date("2025-06-19T13:00:00Z"),
    createdBy: "Golden Years Center",
    isOnline: false,
    estimatedTime: 20,
    address: "456 Palm Dr, Sarasota, FL 34236",
    contactEmail: "techhelp@goldenyearscenter.org",
    tags: ["tech-help", "elderly", "social", "in-person"],
  },
  {
    status: "not-started",
    title: "Create a Short Video on Climate Change for 4th Graders",
    description:
      "Record or animate a simple 2-minute video explaining climate change to young kids.",
    longDescription:
      "4th graders at a local school are learning about climate change. Create a fun and easy-to-understand video that explains the basics in under 2 minutes. Use animation, props, or simple narration to engage young learners.",
    createdOn: new Date("2025-06-16T12:00:00Z"),
    createdBy: "Green Future Youth Project",
    isOnline: true,
    estimatedTime: 40,
    contactEmail: "youthprojects@greenfuture.org",
    tags: ["education", "climate", "creative", "youth", "remote"],
  },
  {
    status: "not-started",
    title: "Help a Refugee Learn Job Interview Basics",
    description:
      "Provide a short role-play interview session for a newly settled refugee in Chicago.",
    longDescription:
      "A newly arrived refugee is preparing for their first job interviews in the U.S. Spend half an hour practicing common interview questions and offering feedback to build their confidence and communication skills.",
    createdOn: new Date("2025-06-18T17:30:00Z"),
    createdBy: "New Start Chicago",
    isOnline: false,
    estimatedTime: 30,
    address: "789 W Adams St, Chicago, IL 60607",
    contactEmail: "careerprep@newstartchicago.org",
    tags: ["coaching", "refugees", "in-person", "career-prep", "empathy"],
  },
  {
    status: "not-started",
    title: "Read a Chapter from a Classic Book for an Audiobook Library",
    description:
      "Record yourself reading a chapter from 'Pride and Prejudice' for a free public audiobook.",
    longDescription:
      "Help build a free public audiobook library by recording yourself reading a chapter from 'Pride and Prejudice.' Clear audio and expressive reading encouraged. Your contribution will help others enjoy this classic novel.",
    createdOn: new Date("2025-06-15T15:00:00Z"),
    createdBy: "Voices for All",
    isOnline: true,
    estimatedTime: 25,
    contactEmail: "recordings@voicesforall.org",
    tags: ["reading", "audio", "education", "literature", "remote"],
  },
  {
    status: "not-started",
    title: "Organize Donations at a Local Food Pantry",
    description:
      "Help sort and organize donated food items for distribution at the neighborhood food pantry in Boston.",
    longDescription:
      "The Neighborhood Food Pantry in Boston receives daily food donations. Volunteers are needed to help sort, label, and organize these items for efficient distribution to families in need. Moderate lifting may be required.",
    createdOn: new Date("2025-06-20T10:00:00Z"),
    createdBy: "Neighborhood Food Pantry",
    isOnline: false,
    estimatedTime: 45,
    address: "321 Main St, Boston, MA 02118",
    contactEmail: "volunteer@neighborhoodpantry.org",
    tags: ["community", "food", "in-person", "organization", "volunteering"],
  },
  {
    status: "not-started",
    title: "Design Social Media Graphics for Animal Shelter",
    description:
      "Create a set of engaging social media graphics to help promote pet adoptions for a local animal shelter.",
    longDescription:
      "The Happy Tails Animal Shelter is launching a new pet adoption campaign and needs eye-catching graphics for Facebook and Instagram. If you have graphic design skills and a love for animals, this remote opportunity is perfect for you.",
    createdOn: new Date("2025-06-21T12:30:00Z"),
    createdBy: "Happy Tails Animal Shelter",
    isOnline: true,
    estimatedTime: 60,
    contactEmail: "media@happytails.org",
    tags: ["design", "marketing", "animals", "creative", "remote"],
  },
];

const db = client.db("companydb");
const opportunitiesCollection = db.collection("opportunities");
opportunitiesCollection.insertMany(opportunities);
