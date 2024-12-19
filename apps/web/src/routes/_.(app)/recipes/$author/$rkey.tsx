import { createFileRoute, Link } from '@tanstack/react-router'
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { recipeQueryOptions } from '@/queries/recipe'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useXrpc } from '@/hooks/use-xrpc'

export const Route = createFileRoute('/_/(app)/recipes/$author/$rkey')({
  //loader: ({ params: { author, rkey } }) => {
  //  queryClient.ensureQueryData(recipeQueryOptions(rpc, author, rkey))
  //},
  component: RouteComponent,
})

function RouteComponent() {
  const rpc = useXrpc();
  const { author, rkey } = Route.useParams()
  const {
    data: { recipe },
    error,
  } = useSuspenseQuery(recipeQueryOptions(rpc, author, rkey))

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
                    {recipe.author.handle}
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
        <p className="text-muted-foreground">
          By @{recipe.author.handle}
        </p>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {recipe.title}
        </h1>
        <p className="leading-7 text-center">
          {recipe.description}
        </p>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 w-full max-w-2xl items-center mx-auto">
        <div className="grid gap-4 w-full">
          <Card>
            <CardHeader>
              <CardTitle>Ingredients</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc flex flex-col ml-4">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx}>
                    {ing.name} ({ing.amount} {ing.unit})
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal gap-y-4 flex flex-col ml-4">
                {recipe.steps.map((ing, idx) => (
                  <li key={idx}>{ing.text}</li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
