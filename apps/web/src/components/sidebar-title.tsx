import { CookingPot } from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ModeToggle } from "./mode-toggle"

export function SidebarTitle() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <CookingPot className="size-4" />
        </div>
        <div className="flex flex-col gap-0.5 leading-none">
          <span className="font-semibold">Recipes</span>
        </div>
        <ModeToggle />
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
