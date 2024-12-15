import { RecipeCard } from "@/components/recipes/recipe-card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { resolveDid, resolveHandle } from "@/lib/auth/handle";
import { getRecipes } from "@/queries/recipes/getRecipes";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    actor: string;
  }>;
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { actor } = await params;
  try {
    const did = await resolveHandle(decodeURIComponent(actor));
    const handle = await resolveDid(did);
    return {
      title: `Recipes by ${handle}`,
      description: 'Discover recipes from other members of the community.',
    }
  } catch (e) {
    throw notFound();
  }
};

export default async function Page({ params }: Props) {
  const { actor } = await params;
  let handle;
  let did;
  try {
    did = await resolveHandle(decodeURIComponent(actor));
    handle = await resolveDid(did);
  } catch (e) {
    throw notFound();
  }
  const recipes = await getRecipes(undefined, did);

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
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/recipes">
                  Recipes
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>@{handle}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex flex-col gap-4 p-4 pt-6 items-center">
          <h1 className="text-4xl font-black">{handle}'s Recipes</h1>
          <p className="text-lg">All recipes @{handle} has posted.</p>
        </div>
        <div className="flex-1 flex flex-col items-center p-4">
          <div className="flex flex-col gap-4 max-w-2xl w-full items-center">
            {recipes.map((recipe, idx) => (
              <RecipeCard
                title={recipe.title}
                description={recipe.description}
                rkey={recipe.rkey}
                author={handle}
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
