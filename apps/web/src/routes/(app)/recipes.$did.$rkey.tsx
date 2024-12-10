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
import QueryPlaceholder from '@/components/query-placeholder'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useRecipeQuery } from '@/queries/recipe'

export const Route = createFileRoute('/(app)/recipes/$did/$rkey')({
  component: RouteComponent,
})

function RouteComponent() {
  const { did, rkey } = Route.useParams()
  const query = useRecipeQuery(did, rkey);

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink asChild><Link to="/">Community</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink asChild><Link to="/">Browse Recipes</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink asChild><Link href={`/profiles/${did}`}>{query.data ? query.data.recipe.author.handle : did}</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{query.data ? query.data.recipe.title : rkey}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <QueryPlaceholder query={query}>
          <div className="max-w-6xl">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{query.data?.recipe.title}</h1>
            <p className="leading-7 [&:not(:first-child)]:mt-6">{query.data?.recipe.description}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-4">
            <Card className="lg:col-start-3">
              <CardHeader>
                <CardTitle>Ingredients</CardTitle>
              </CardHeader>
              <CardContent>
                <ul>
                  {query.data?.recipe.ingredients.map((ing, idx) => (
                    <li key={idx}>{ing.name} ({ing.amount} {ing.unit})</li>
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
                  {query.data?.recipe.steps.map((ing, idx) => (
                    <li key={idx}>{ing.text}</li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </QueryPlaceholder>
      </div>
    </>
  )
}
