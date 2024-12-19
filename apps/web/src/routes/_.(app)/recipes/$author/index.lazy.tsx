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
import QueryPlaceholder from '@/components/query-placeholder'
import { useRecipesQuery } from '@/queries/recipe'
import { RecipeCard } from '@/components/recipe-card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const Route = createLazyFileRoute('/_/(app)/recipes/$author/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { author } = Route.useParams()
  const query = useRecipesQuery('', author)

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
                  <Link href="/">Community</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Browse Recipes</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbPage>{author}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-col gap-4 p-4 pt-6 items-center">
        <Avatar className="h-24 w-24 rounded-lg">
          <AvatarImage src={query.data?.author?.avatarUrl} alt={query.data?.author?.displayName} />
          <AvatarFallback className="rounded-lg">{query.data?.author?.displayName}</AvatarFallback>
        </Avatar>
        <h1 className="text-4xl font-black">{query.data?.author?.displayName}'s recipes!</h1>
        <p className="text-lg">See what they've been cooking.</p>
      </div>
      <div className="flex-1 flex flex-col items-center p-4">
        <div className="flex flex-col gap-4 max-w-2xl w-full items-center">
          <QueryPlaceholder query={query} cards cardsCount={12}>
            {query.data?.recipes.map((recipe, idx) => (
              <RecipeCard
                recipe={recipe}
                key={idx}
              />
            ))}
          </QueryPlaceholder>
        </div>
      </div>
    </>
  )
}
