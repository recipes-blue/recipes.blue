import { Link, createFileRoute, Outlet } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { SidebarTrigger } from '@/components/ui/sidebar'

export const Route = createFileRoute('/_')({
  component: RouteComponent,
  errorComponent: ({ error }) => {
    return (
      <>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Card className="m-auto max-w-sm">
            <CardHeader>
              <CardTitle>Error!</CardTitle>
            </CardHeader>
            <CardContent>
              {error.message}
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link to="/">Go home</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </>
    );
  },

  notFoundComponent: () => {
    return (
      <>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Card className="m-auto max-w-sm">
            <CardHeader>
              <CardTitle>Not found</CardTitle>
            </CardHeader>
            <CardContent>
              {"The page you tried to view doesn't exist."}
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link to="/">Go home</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </>
    );
  },

})

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  )
}
