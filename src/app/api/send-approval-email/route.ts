import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { recipientEmail, documentId } = await req.json();
  const website =
    process.env.NODE_ENV === "production"
      ? "https://skill-bridge.vercel.app"
      : "http://localhost:3000";
  const magicLink = `${website}/approve-hours/${documentId}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
  const mailOptions = {
    from: `"Skill Bridge" <${process.env.GMAIL_USER}>`,
    to: process.env.RECIPIENT_EMAIL,
    subject: "Approve volunteer hours",
    html: `<a href="${magicLink}">Approve volunteer hours</a>`,
  };

  try {
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.log("ERROR", err.message);
    return NextResponse.json({ ok: false, error: err.message });
  }
}
