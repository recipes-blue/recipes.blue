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
import { RecipeCard } from '@/screens/Recipes/RecipeCard'

export const Route = createLazyFileRoute('/_/(app)/')({
  component: RouteComponent,
})

function RouteComponent() {
  const query = useRecipesQuery('')

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
                <BreadcrumbPage>Browse Recipes</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          <QueryPlaceholder query={query} cards cardsCount={12}>
            {query.data?.recipes.map((recipe, idx) => (
              <RecipeCard
                title={recipe.title}
                description={recipe.description}
                rkey={recipe.rkey}
                author={recipe.author}
                time={{ amount: 30, unit: 'min' }}
                steps={recipe.steps}
                ingredients={recipe.ingredients}
                key={idx}
              />
            ))}
          </QueryPlaceholder>
        </div>
      </div>
    </>
  )
}
