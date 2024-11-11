import { ArrowBigUp, FolderDot, House, UserCircle2, WholeWord } from "lucide-react";

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
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/nav-user";
import Link from "next/link";


type Item = {
  title: string;
  url: string;
  icon: any;
};

const items: Item[] = [
  {
    title: "Dash Board",
    url: "/dashboard",
    icon: House,
  },
  {
    title: "Users",
    url: "/users",
    icon: UserCircle2,
  },
  {
    title: "Levels",
    url: "/levels",
    icon: ArrowBigUp,
  },
  {
    title: "Topics",
    url: "/topics",
    icon: FolderDot,
  },
  {
    title: "Words",
    url: "/words",
    icon: WholeWord,
  },
];

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild size={"md"}>
                    <Link href={item.url}>  
                      <item.icon color={"#ed1b2f"}/>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
