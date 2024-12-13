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
import { queryClient } from '@/lib/react-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import { rpc } from '@/hooks/use-xrpc'

export const Route = createFileRoute('/_/(app)/recipes/$author/$rkey')({
  loader: ({ params: { author, rkey } }) => {
    queryClient.ensureQueryData(recipeQueryOptions(rpc, author, rkey))
  },
  component: RouteComponent,
})

function RouteComponent() {
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
                  <Link href={`/profiles/${recipe.author.handle}`}>
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
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="max-w-6xl">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {recipe.title}
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            {recipe.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          <Card className="lg:col-start-3">
            <CardHeader>
              <CardTitle>Ingredients</CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx}>
                    {ing.name} ({ing.amount} {ing.unit})
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="lg:col-start-1 lg:row-start-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <ol>
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
