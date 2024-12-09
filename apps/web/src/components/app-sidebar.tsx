import * as React from "react"
import {
  NotebookPen,
  Settings2,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Suspense } from "react"
import { Button } from "./ui/button"
import { Link } from "@tanstack/react-router"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Community",
      url: "#",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "Browse",
          url: "/",
          isActive: true,
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Yours",
      url: "#",
      icon: NotebookPen,
      items: [
        {
          title: "Recipes",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
      ],
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <Suspense fallback={
          <Button asChild>
            <Link href="/login" className="w-full">Log in</Link>
          </Button>
        } name="nav-user-data">
          <NavUser />
        </Suspense>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
