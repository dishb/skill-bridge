import {
  Home,
  HeartHandshake,
  UserRound,
  Bolt,
  LogOut,
  Goal,
  Store,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "./ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import type SidebarItem from "@/types/sidebarItem";
import Link from "next/link";
import { signOut } from "@/auth";

const platformItems: SidebarItem[] = [
  {
    title: "Feed",
    url: "/feed",
    icon: Home,
  },
  {
    title: "Impact",
    url: "/impact",
    icon: HeartHandshake,
  },
  {
    title: "Goals",
    url: "/goals",
    icon: Goal,
  },
];

const accountItems: SidebarItem[] = [
  {
    title: "Profile",
    url: "/profile",
    icon: UserRound,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Bolt,
  },
];

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2">
          <Store className="w-5 h-auto" />
          <h2 className="font-bold text-lg">SkillBridge</h2>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {platformItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                  }}
                  className="text-destructive hover:cursor-pointer hover:bg-destructive/10 hover:text-destructive active:text-destructive active:bg-destructive/10"
                >
                  <LogOut />
                  Log out
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-2 p-4">
          <Avatar className="w-10 h-10 border border-input shadow-xs">
            <AvatarImage src="/avatar.png" alt="User profile picture" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-sm font-bold">John Doe</p>
            <p className="text-sm">john.doe@example.com</p>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
