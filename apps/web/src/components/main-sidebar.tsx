"use client"

import * as React from "react"
import {
  CookingPot,
  ForkKnifeIcon,
  Library,
  LifeBuoy,
  Send,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Recipes",
      url: "/recipes",
      icon: ForkKnifeIcon,
      isActive: true,
      items: [
        {
          title: "Browse",
          url: "/recipes",
        },
        {
          title: "Starred",
          url: "/u/abc123/starred",
        },
        {
          title: "Search",
          url: "/recipes/search",
        },
      ],
    },
    {
      title: "Cookbooks",
      url: "/cookbooks",
      icon: Library,
      items: [
        {
          title: "Browse",
          url: "/cookbooks",
        },
        {
          title: "Starred",
          url: "/u/abc123/starred",
        },
        {
          title: "Search",
          url: "/cookbooks/search",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Recipes",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Cookbooks",
      url: "#",
      icon: Send,
    },
  ],
}

export function MainSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <CookingPot className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Cookware</span>
                  <span className="truncate text-xs">The social cooking app!</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
