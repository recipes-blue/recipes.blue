import { AppSidebar } from '@/components/app-sidebar'
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Suspense fallback={<p>Loading...</p>}>
        <Outlet />
        </Suspense>
      </SidebarInset>
    </SidebarProvider>
  )
}
