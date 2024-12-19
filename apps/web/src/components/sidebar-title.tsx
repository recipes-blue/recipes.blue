import { CookingPot } from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function SidebarTitle() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center gap-2 p-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <CookingPot className="size-4" />
          </div>
          <span className="font-semibold text-sm flex-1 text-left leading-tight">Recipes</span>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
