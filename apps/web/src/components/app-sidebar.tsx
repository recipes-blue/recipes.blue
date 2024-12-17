import * as React from "react"
import {
  Book,
  CookingPot,
  ForkKnife,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Suspense } from "react"
import { Button } from "./ui/button"
import { Link } from "@tanstack/react-router"

const data = {
  navMain: [
    {
      title: "Recipes",
      url: "#",
      icon: ForkKnife,
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
      ],
    },
    {
      title: "Cookbooks",
      url: "#",
      icon: Book,
      items: [
        {
          title: "Browse",
          url: "/",
        },
        {
          title: "Starred",
          url: "#",
        },
      ],
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <CookingPot className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Cookware</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
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
