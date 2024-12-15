import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getRecipe } from "@/queries/recipes/getRecipes";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  params: Promise<{
    actor: string;
    rkey: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { actor, rkey } = await params;
  const recipe = await getRecipe(actor, rkey);
  if (!recipe) throw notFound();

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
                  Recipes
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href={`/recipes/${actor}`}>
                  {actor}
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
      <div className="flex flex-col gap-4 px-4 py-8 items-center">
        <p className="text-muted-foreground">
          By @{recipe.authorDid}
        </p>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {recipe.title}
        </h1>
        <p className="leading-7">
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
              <ul>
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
              <ol className="list-decimal list-inside">
                {recipe.steps.map((ing, idx) => (
                  <li key={idx}>{ing.text}</li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { actor, rkey } = await params;
  const recipe = await getRecipe(actor, rkey);
  if (!recipe) throw notFound();

  return {
    title: recipe.title,
    description: recipe.description,
  };
}
