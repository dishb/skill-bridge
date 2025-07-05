import {
  Home,
  HeartHandshake,
  UserRound,
  Bolt,
  LogOut,
  Goal,
  Store,
  Crown,
  Compass,
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
import AccountInfo from "./AccountInfo";
import type SidebarItem from "@/types/sidebarItem";
import Link from "next/link";
import { signOut, auth } from "@/auth";

export default async function AppSidebar() {
  const session = await auth();
  
  const platformItems: SidebarItem[] = [
    {
      title: "Home",
      url: "/home",
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
  
  const socialItems: SidebarItem[] = [
    {
      title: "Discover",
      url: "/discover",
      icon: Compass,
    },
    {
      title: "Leaderboard",
      url: "/leaderboard",
      icon: Crown,
    },
  ];
  
  const accountItems: SidebarItem[] = [
    {
      title: "Profile",
      url: `/profile/${session?.user?.id}`,
      icon: UserRound,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Bolt,
    },
  ];
  
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
          <SidebarGroupLabel>Social</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {socialItems.map((item) => (
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
        <AccountInfo />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
