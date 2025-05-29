"use client"

import * as React from "react"
import {
  ChartBar,
  Settings2,
  Sun,
  Users
} from "lucide-react"
import { NavMain } from "@/components/dashboard/nav-main"
import { NavProjects } from "@/components/dashboard/nav-projects"
import { NavUser } from "@/components/dashboard/nav-user"
import { TeamSwitcher } from "@/components/dashboard/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  teams: [
    {
      name: "Qli-Mate",
      logo: Sun,
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: ChartBar,
    },
    {
      title: "Configurações",
      url: "",
      icon: Settings2,
      items: [
        {
          title: "Gerais",
          url: "/dashboard/settings/general",
        },
        {
          title: "Conta",
          url: "/dashboard/settings/user",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Usuários",
      url: "/dashboard/admin",
      icon: Users,
    },
  ],
}

export function AppSidebar({ isAdm, user, ...props }: { isAdm: boolean, user: {name?: string, email?: string} } & React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader >
        <TeamSwitcher teams={data.teams}/>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {isAdm && <NavProjects projects={data.projects} />}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
