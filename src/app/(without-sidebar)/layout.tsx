import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Skill Bridge",
  description: "A micro-volunteering matchmaker for isolated individuals.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <main>{children}</main>
      </body>
    </html>
  );
}
