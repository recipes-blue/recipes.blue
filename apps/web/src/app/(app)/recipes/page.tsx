import { RecipeCard } from "@/components/recipes/recipe-card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getRecipes } from "@/queries/recipes/getRecipes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Recipes',
  description: 'Discover recipes from other members of the community.',
};

export default async function Page() {
  const recipes = await getRecipes(undefined);

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Recipes</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex flex-col gap-4 p-4 pt-6 items-center">
          <h1 className="text-4xl font-black">Community Recipes!</h1>
          <p className="text-lg">See what the community's been cooking.</p>
        </div>
        <div className="flex-1 flex flex-col items-center p-4">
          <div className="flex flex-col gap-4 max-w-2xl w-full items-center">
            {recipes.map((recipe, idx) => (
              <RecipeCard
                title={recipe.title}
                description={recipe.description}
                rkey={recipe.rkey}
                author={recipe.authorDid}
                time={{ amount: 30, unit: 'min' }}
                steps={recipe.steps.length}
                ingredients={recipe.ingredients.length}
                key={idx}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
