"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import ThemeToggle from "@/components/ThemeToggle";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const pageTitle = pathname
    .split("/")
    .filter((segment) => segment)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1));

  return (
    <nav className="flex w-full mb-4 justify-between items-center">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="hover:cursor-pointer" />
        <h1 className="text-2xl font-semibold">{pageTitle}</h1>
      </div>

      <ThemeToggle />
    </nav>
  );
}
