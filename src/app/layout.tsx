import type { Metadata } from "next";
import ThemeProvider from "@/components/ThemeProvider";
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="asss" />
      </head>
      <body className="min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
