import { FileVideo2 , FolderKanban, Clapperboard, Users , Settings } from "lucide-react"
import Image from "next/image"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: (props) => <FolderKanban {...props} color="red" />,
  },
  {
    title: "Movies",
    url: "/dashboard/movies",
    icon: (props) => <Clapperboard {...props} color="red" />,
  },
  {
    title: "Add Movie",
    url: "/dashboard/add-movies",
    icon: (props) => <FileVideo2 {...props} color="red" />,
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: (props) => <Users {...props} color="red" />,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: (props) => <Settings {...props} color="red" />,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-background text-foreground">
        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-center py-2 my-4">
            <Image src="/movieHubLogo.png" alt="logo" width={50} height={50} className="rounded-md" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 ps-2 "> 
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center space-x-2">
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
