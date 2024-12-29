import { createLazyFileRoute, Link } from '@tanstack/react-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { recipeQueryOptions } from '@/queries/recipe'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useXrpc } from '@/hooks/use-xrpc'
import { Badge } from '@/components/ui/badge'
import { Clock, Users } from 'lucide-react'
import { useAuth } from '@/state/auth'
import { Button } from '@/components/ui/button'

export const Route = createLazyFileRoute('/_/(app)/recipes/$author/$rkey/')({
  component: RouteComponent,
})

function RouteComponent() {
  const rpc = useXrpc();
  const { author, rkey } = Route.useParams()
  const {
    data: { recipe },
    error,
  } = useSuspenseQuery(recipeQueryOptions(rpc, author, rkey))
  const { isLoggedIn, agent } = useAuth();

  if (error) return <p>Error</p>

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink asChild>
                  <Link to="/">Community</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink asChild>
                  <Link to="/">Browse Recipes</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink asChild>
                  <Link to="/recipes/$author" params={{ author: recipe.author.handle }}>
                    {recipe.author.displayName}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{recipe.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-col gap-4 px-4 py-8 items-center max-w-2xl w-full mx-auto">
        <Card className="w-full">

          <CardHeader>
            <CardTitle className="text-3xl font-bold">{recipe.title}</CardTitle>
            <CardDescription>{recipe.description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {
              recipe.imageUrl &&
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="h-64 w-full object-cover rounded-md"
              />
            }
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="flex items-center gap-2">
                <Clock className="size-4" />
                <span>{recipe.time} mins</span>
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-2">
                <Users className="size-4" />
                <span>Serves {recipe.serves ?? '1'}</span>
              </Badge>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
              <ul className="list-disc list-inside space-y-1">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx}>
                    <b>{ing.amount}</b> {ing.name}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Steps</h3>
              <ol className="list-decimal list-outside space-y-1 ml-4">
                {recipe.steps.map((ing, idx) => (
                  <li key={idx}>{ing.text}</li>
                ))}
              </ol>
            </div>
          </CardContent>
            <CardFooter className="flex justify-between">
              {(isLoggedIn && agent?.sub == recipe.author.did) && (
                <div className="flex items-center gap-x-4">
                  <Button variant="outline">Edit</Button>
                  <Button variant="destructive">Delete</Button>
                </div>
              )}

              <div className="flex items-center gap-x-4">
                {/* TODO: share options */}
              </div>
            </CardFooter>
        </Card>
      </div>
    </>
  )
}
