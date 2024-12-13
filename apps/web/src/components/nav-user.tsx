import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { CurrentUserButton } from "./auth/currentUserButton"

export function NavUser() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <CurrentUserButton />
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
