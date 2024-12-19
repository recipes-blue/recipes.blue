"use client"

import {
  BadgeCheck,
  ChevronsUpDown,
  LogOut,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import { Link } from "@tanstack/react-router"
import { useAuth } from "@/state/auth"
import { useXrpc } from "@/hooks/use-xrpc"
import { useQuery } from "@tanstack/react-query"
import { At } from "@atcute/client/lexicons"
import { Skeleton } from "./ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export function NavUser() {
  const { isMobile } = useSidebar()
  const { isLoggedIn, agent } = useAuth();
  const rpc = useXrpc(agent);

  const userQuery = useQuery({
    queryKey: ['self'],
    queryFn: async () => rpc
      .get('com.atproto.repo.getRecord', {
        params: {
          repo: agent?.sub as At.DID,
          collection: 'app.bsky.actor.profile',
          rkey: 'self',
        },
      }),
    enabled: isLoggedIn,
  });

  if (!isLoggedIn || !agent || userQuery.isError || !userQuery.data) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Button asChild>
              <Link to="/login" className="w-full">Log in</Link>
            </Button>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  if (userQuery.isFetching) return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Skeleton className="h-8 w-8 rounded-lg" />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <Skeleton className="h-2 w-20 rounded-lg" />
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={`https://cdn.bsky.app/img/avatar_thumbnail/plain/${agent.sub}/${userQuery.data.data.value.avatar.ref.$link}@jpeg`} alt={userQuery.data.data.value.displayName ?? `@${userQuery.data.data.value.handle}`} />
                <AvatarFallback className="rounded-lg">{userQuery.data.data.value.handle}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{userQuery.data.data.value.displayName ?? `@${userQuery.data.data.value.handle}`}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={`https://cdn.bsky.app/img/avatar_thumbnail/plain/${agent.sub}/${userQuery.data.data.value.avatar.ref.$link}@jpeg`} alt={userQuery.data.data.value.displayName ?? `@${userQuery.data.data.value.handle}`} />
                  <AvatarFallback className="rounded-lg">{userQuery.data.data.value.handle}</AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
