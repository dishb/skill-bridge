import client from "./db";

const opportunities = [
  {
    status: "not-started",
    title: "Write a Birthday Poem for a Veteran",
    description:
      "Create a short birthday poem for Mr. Charles, a 92-year-old WWII veteran in hospice care.",
    longDescription:
      "Mr. Charles, a 92-year-old WWII veteran in hospice, loves receiving personal messages. We're collecting short poems to honor his birthday and thank him for his service. Your words can bring him a smile during this special time.",
    dueDate: new Date("2025-07-01T23:33:43.411Z"),
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
      "Help Ms. Linda in Seattle learn how to send emails and open attachments using Gmail.",
    longDescription:
      "Ms. Linda wants to stay in touch with family but struggles with email basics. Meet her at her community center and guide her through composing, sending, and opening attachments using Gmail. No tech degree needed—just patience and kindness.",
    dueDate: new Date("2025-07-03T23:33:43.411Z"),
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
      "Record a Spanish literature chapter aloud for a visually impaired student in Dallas.",
    longDescription:
      "A student in Dallas with visual impairment needs help catching up in Spanish class. By recording a chapter from their assigned literature book, you'll make education more accessible. Native or fluent Spanish speakers are preferred for this task.",
    dueDate: new Date("2025-07-02T23:33:43.411Z"),
    createdBy: "Access Ed Dallas",
    isOnline: true,
    estimatedTime: 25,
    contactEmail: "projects@accesseddallas.org",
    tags: ["language", "audio", "education", "disability", "remote"],
  },
  {
    status: "not-started",
    title: "15-Minute Encouragement Call to an Elder",
    description:
      "Make a brief phone call to Mr. Barry in Ohio to brighten his day and reduce loneliness.",
    longDescription:
      "Mr. Barry, living alone in Ohio, looks forward to hearing a friendly voice. Your short check-in call can lift his spirits and help combat isolation. No experience needed—just a warm attitude and willingness to chat for a few minutes.",
    dueDate: new Date("2025-07-04T23:33:43.411Z"),
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
      "Design a cheerful get-well card for Ava, age 6, undergoing chemotherapy in Denver.",
    longDescription:
      "Ava is a brave 6-year-old fighting cancer in Denver. Your colorful, creative get-well card will help brighten her hospital stay. Both digital designs and hand-drawn cards are welcome. Bring smiles and hope with your artwork.",
    dueDate: new Date("2025-07-01T23:33:43.411Z"),
    createdBy: "Healing Hearts Foundation",
    isOnline: true,
    estimatedTime: 30,
    contactEmail: "volunteers@healingheartsfoundation.org",
    tags: ["art", "kids", "creative", "hospital", "remote"],
  },
  {
    status: "not-started",
    title: "Translate a Community Flyer to Vietnamese",
    description:
      "Translate a flyer about free meals for Vietnamese-speaking families in Philadelphia.",
    longDescription:
      "Help Philadelphia's community center translate a flyer about their free meal program into Vietnamese. Your translation ensures more residents can access this essential resource. Native speakers or fluent Vietnamese volunteers encouraged.",
    dueDate: new Date("2025-07-03T23:33:43.411Z"),
    createdBy: "Philly Mutual Aid",
    isOnline: true,
    estimatedTime: 35,
    contactEmail: "outreach@phillymutualaid.org",
    tags: ["language", "translation", "community", "remote"],
  },
  {
    status: "not-started",
    title: "Set Up Zoom for a Senior in Florida",
    description:
      "Assist Mrs. Taylor in Sarasota with setting up Zoom to join her book club meetings.",
    longDescription:
      "Mrs. Taylor in Sarasota wants to reconnect with her weekly book club but needs help installing and using Zoom on her tablet. Meet her at her home or community center to walk her through setup and basic use. Patience and tech skills needed.",
    dueDate: new Date("2025-07-05T23:33:43.411Z"),
    createdBy: "Golden Years Center",
    isOnline: false,
    estimatedTime: 20,
    address: "456 Palm Dr, Sarasota, FL 34236",
    contactEmail: "techhelp@goldenyearscenter.org",
    tags: ["tech-help", "elderly", "social", "in-person"],
  },
  {
    status: "not-started",
    title: "Create a Short Climate Change Video for Kids",
    description:
      "Make a 2-minute educational video about climate change for 4th graders.",
    longDescription:
      "Local 4th graders are learning about climate change. Create a short, engaging video explaining the basics in simple terms. Feel free to use animation, props, or live action to help kids understand this important topic in under 2 minutes.",
    dueDate: new Date("2025-07-02T23:33:43.411Z"),
    createdBy: "Green Future Youth Project",
    isOnline: true,
    estimatedTime: 40,
    contactEmail: "youthprojects@greenfuture.org",
    tags: ["education", "climate", "creative", "youth", "remote"],
  },
  {
    status: "not-started",
    title: "Help a Refugee Practice Job Interviews",
    description:
      "Role-play a short interview with a newly settled refugee in Chicago.",
    longDescription:
      "A refugee new to Chicago is preparing for job interviews. Spend about 30 minutes role-playing questions and giving feedback to help them build confidence and improve communication skills. Great for anyone with HR or coaching experience.",
    dueDate: new Date("2025-07-04T23:33:43.411Z"),
    createdBy: "New Start Chicago",
    isOnline: false,
    estimatedTime: 30,
    address: "789 W Adams St, Chicago, IL 60607",
    contactEmail: "careerprep@newstartchicago.org",
    tags: ["coaching", "refugees", "in-person", "career-prep", "empathy"],
  },
  {
    status: "not-started",
    title: "Record a Classic Book Chapter for Audiobook Library",
    description:
      "Read a chapter from 'Pride and Prejudice' for a free online audiobook library.",
    longDescription:
      "Join the effort to build a free public audiobook collection by recording yourself reading a chapter from 'Pride and Prejudice.' Clear audio and expressive reading style preferred. Help bring classic literature to more listeners worldwide.",
    dueDate: new Date("2025-07-01T23:33:43.411Z"),
    createdBy: "Voices for All",
    isOnline: true,
    estimatedTime: 25,
    contactEmail: "recordings@voicesforall.org",
    tags: ["reading", "audio", "education", "literature", "remote"],
  },
  {
    status: "not-started",
    title: "Sort Food Donations at Boston Pantry",
    description:
      "Help sort, label, and organize food donations at a local pantry in Boston.",
    longDescription:
      "The Neighborhood Food Pantry in Boston receives daily food donations and needs help sorting, labeling, and shelving items for distribution to families in need. Some light lifting may be involved. Perfect for hands-on volunteers.",
    dueDate: new Date("2025-07-06T23:33:43.411Z"),
    createdBy: "Neighborhood Food Pantry",
    isOnline: false,
    estimatedTime: 45,
    address: "321 Main St, Boston, MA 02118",
    contactEmail: "volunteer@neighborhoodpantry.org",
    tags: ["community", "food", "in-person", "organization", "volunteering"],
  },
  {
    status: "not-started",
    title: "Design Adoption Campaign Graphics for Shelter",
    description:
      "Create social media graphics for an animal shelter’s pet adoption campaign.",
    longDescription:
      "The Happy Tails Animal Shelter is running a pet adoption campaign and needs social media graphics for Facebook and Instagram. Use your graphic design skills to help promote adoptable pets and find them loving homes.",
    dueDate: new Date("2025-07-07T23:33:43.411Z"),
    createdBy: "Happy Tails Animal Shelter",
    isOnline: true,
    estimatedTime: 60,
    contactEmail: "media@happytails.org",
    tags: ["design", "marketing", "animals", "creative", "remote"],
  },
  {
    status: "not-started",
    title: "Help Plant Trees at Local Park",
    description:
      "Join a tree-planting event at Jefferson Park to help green the neighborhood.",
    longDescription:
      "Join volunteers at Jefferson Park for a tree-planting event to improve air quality and provide shade. No prior experience needed—tools and guidance provided on-site. Great for families and groups wanting a hands-on outdoor project.",
    dueDate: new Date("2025-07-08T23:33:43.411Z"),
    createdBy: "City Green Teams",
    isOnline: false,
    estimatedTime: 120,
    address: "1200 Park Ave, Springfield, IL 62704",
    contactEmail: "events@citygreenteams.org",
    tags: ["environment", "outdoors", "in-person", "community"],
  },
  {
    status: "not-started",
    title: "Serve Meals at Downtown Shelter",
    description:
      "Help serve hot meals to individuals experiencing homelessness at the downtown shelter.",
    longDescription:
      "Join the meal service team at Downtown Homeless Shelter. Volunteers help serve dinner and engage positively with guests. Training provided before your shift. A great way to give back to the community and offer support to those in need.",
    dueDate: new Date("2025-07-09T23:33:43.411Z"),
    createdBy: "Downtown Homeless Shelter",
    isOnline: false,
    estimatedTime: 90,
    address: "500 Market St, San Diego, CA 92101",
    contactEmail: "volunteers@downtownshelter.org",
    tags: ["food", "community", "in-person", "homelessness"],
  },
  {
    status: "not-started",
    title: "Paint Classroom Walls at Local School",
    description:
      "Help refresh the walls of Washington Elementary with a new coat of paint.",
    longDescription:
      "Washington Elementary is giving its classrooms a much-needed facelift. Volunteers will help paint classroom walls and trim. Paint and supplies provided. Wear clothes you don’t mind getting messy. Great for team or group volunteering.",
    dueDate: new Date("2025-07-10T23:33:43.411Z"),
    createdBy: "Bright Classrooms Project",
    isOnline: false,
    estimatedTime: 180,
    address: "1600 Grant Ave, Los Angeles, CA 90015",
    contactEmail: "info@brightclassrooms.org",
    tags: ["education", "schools", "in-person", "community", "maintenance"],
  },
  {
    status: "not-started",
    title: "Assist at Local Library Book Sale",
    description:
      "Help set up, sort books, and assist customers during the annual library book sale.",
    longDescription:
      "The city library is hosting its annual book sale. Volunteers help set up tables, organize books, assist shoppers, and clean up afterward. Proceeds support library programs. If you love books and helping the community, this is for you.",
    dueDate: new Date("2025-07-11T23:33:43.411Z"),
    createdBy: "Friends of the Library",
    isOnline: false,
    estimatedTime: 120,
    address: "75 Library Ln, Portland, OR 97201",
    contactEmail: "events@friendsofthelibrary.org",
    tags: ["books", "education", "in-person", "community"],
  },
  {
    status: "not-started",
    title: "Clean Up Local Beachfront",
    description:
      "Join a community effort to clean litter from the Santa Monica beach.",
    longDescription:
      "Help protect marine life and beautify the shoreline by participating in a beach cleanup at Santa Monica. Gloves, bags, and tools will be provided. This is a great outdoor volunteer opportunity for individuals or families looking to make a difference.",
    dueDate: new Date("2025-07-12T23:33:43.411Z"),
    createdBy: "Coastal Care Volunteers",
    isOnline: false,
    estimatedTime: 90,
    address: "Ocean Ave & Colorado Blvd, Santa Monica, CA 90401",
    contactEmail: "cleanup@coastalcare.org",
    tags: ["environment", "beach", "in-person", "outdoors", "cleanup"],
  },
  {
    status: "not-started",
    title: "Transcribe Historical Letters",
    description:
      "Help digitize history by transcribing scanned letters from the 1800s.",
    longDescription:
      "Join a national archive project to transcribe scanned handwritten letters from the 1800s. Your work will help researchers and historians access these documents. A great task for detail-oriented volunteers who enjoy history and typing.",
    dueDate: new Date("2025-07-08T23:33:43.411Z"),
    createdBy: "National Archive Volunteers",
    isOnline: true,
    estimatedTime: 45,
    contactEmail: "projects@nationalarchives.org",
    tags: ["history", "typing", "remote", "education"],
  },
  {
    status: "not-started",
    title: "Moderate an Online Discussion Forum",
    description:
      "Help moderate a safe and welcoming online discussion forum for teens.",
    longDescription:
      "Support a safe online space for teens by serving as a forum moderator. Duties include reviewing posts for safety, flagging inappropriate content, and welcoming new members. Training provided. Great for anyone interested in youth engagement.",
    dueDate: new Date("2025-07-09T23:33:43.411Z"),
    createdBy: "SafeSpace Online",
    isOnline: true,
    estimatedTime: 60,
    contactEmail: "moderators@safespace.org",
    tags: ["moderation", "online-community", "youth", "remote"],
  },
  {
    status: "not-started",
    title: "Proofread Braille-to-Text Transcriptions",
    description:
      "Review and correct automated text transcriptions from Braille documents.",
    longDescription:
      "Help improve accessibility for blind students by proofreading AI-generated transcriptions of Braille textbooks. Ensure accurate spelling and formatting. Training on Braille not required—just strong reading and grammar skills.",
    dueDate: new Date("2025-07-10T23:33:43.411Z"),
    createdBy: "Access Text Project",
    isOnline: true,
    estimatedTime: 50,
    contactEmail: "proofreading@accesstext.org",
    tags: ["education", "disability", "remote", "proofreading"],
  },
  {
    status: "not-started",
    title: "Design a Logo for Youth Mentorship Program",
    description:
      "Create a logo for a new virtual mentorship program connecting teens with role models.",
    longDescription:
      "The Youth Steps Mentorship Program needs a clean, modern logo for use on their website and social media. If you have graphic design skills and want to help empower youth through mentorship, this is your chance to contribute creatively.",
    dueDate: new Date("2025-07-11T23:33:43.411Z"),
    createdBy: "Youth Steps Mentorship",
    isOnline: true,
    estimatedTime: 90,
    contactEmail: "design@youthsteps.org",
    tags: ["design", "mentorship", "youth", "remote"],
  },
  {
    status: "not-started",
    title: "Write Encouragement Letters to Hospital Patients",
    description:
      "Write uplifting letters for patients undergoing treatment in hospitals nationwide.",
    longDescription:
      "Brighten the day of hospital patients across the country by writing uplifting and encouraging letters. Your message of hope and support will be delivered by partner hospitals. This project is entirely remote and can be done anytime from home.",
    dueDate: new Date("2025-07-12T23:33:43.411Z"),
    createdBy: "Letters of Light",
    isOnline: true,
    estimatedTime: 30,
    contactEmail: "letters@lettersoflight.org",
    tags: ["writing", "mental-health", "remote", "kindness"],
  },
];

const db = client.db("companydb");
const opportunitiesCollection = db.collection("opportunities");
opportunitiesCollection.insertMany(opportunities);
