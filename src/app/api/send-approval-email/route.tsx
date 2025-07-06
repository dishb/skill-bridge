import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { render } from "@react-email/components";
import ApprovalEmail from "@/components/ApprovalEmail";
import { getOpportunity } from "@/app/actions/opportunity";

export async function POST(req: Request) {
  const { _id } = await req.json();

  const website =
    process.env.NODE_ENV === "production"
      ? "https://skill-bridge-phi.vercel.app/"
      : "http://localhost:3000";
  const magicLink = `${website}/approve-hours/${_id}`;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const res = await getOpportunity(_id);
  const opportunity = res.opportunity;
  const emailHtml = await render(
    <ApprovalEmail magicLink={magicLink} opportunity={opportunity} />,
  );

  const mailOptions = {
    from: '"Skill Bridge" <volunteer@skillbridge.com>',
    to: process.env.RECIPIENT_EMAIL,
    subject: "Approve volunteer hours",
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message });
  }
}
