import type { Metadata } from "next";
import "@/app/globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar from "@/components/AppSidebar";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Skill Bridge",
  description: "A micro-volunteering matchmaker for isolated individuals.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <html lang="en">
      <body className="min-h-screen">
        <SidebarProvider defaultOpen={defaultOpen}>
          <Sidebar />
          <main>
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
