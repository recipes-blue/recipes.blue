"use client"

import {
    SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuth } from "@/state/auth"
import { Link } from "@tanstack/react-router";
import { LifeBuoy, Pencil, Send } from "lucide-react";

export function NavUserOpts() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <SidebarGroup className="mt-auto">
        <SidebarGroupContent>
          <SidebarMenu>
            <AlwaysItems />
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  return (
    <SidebarGroup className="mt-auto">
      <SidebarGroupContent>
        <SidebarMenu>
          <AlwaysItems />
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="sm">
              <Link to="/recipes/new">
                <Pencil />
                <span>New recipe</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

const AlwaysItems = () => (
  <>
    <SidebarMenuItem>
      <SidebarMenuButton asChild size="sm">
        <a href="https://github.com/recipes-blue/recipes.blue/issues/new">
          <LifeBuoy />
          <span>Support</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
    <SidebarMenuItem>
      <SidebarMenuButton asChild size="sm">
        <a href="https://github.com/recipes-blue/recipes.blue/discussions">
          <Send />
          <span>Feedback</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </>
);
