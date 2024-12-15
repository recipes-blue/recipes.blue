import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CookingPot, ListIcon } from "lucide-react";
import Link from "next/link";

type RecipeCardProps = {
  rkey: string;
  author: string;

  title: string;
  description: string | null;
  steps: number;
  ingredients: number;
  time: {
    amount: number;
    unit: string;
  };
};

export const RecipeCard = ({ rkey, author, ...recipe }: RecipeCardProps) => {
  return (
    <Link href={`/recipes/${author}/${rkey}`} className="w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{recipe.title}</CardTitle>
          <CardDescription>
            By @{author}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{recipe.description}</p>
        </CardContent>
        <CardFooter className="flex gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <ListIcon className="size-4" /> <span>{recipe.steps}</span>
          </span>

          <span className="flex items-center gap-2">
            <CookingPot className="size-4" /> <span>{recipe.ingredients}</span>
          </span>

          <span className="flex items-center gap-2">
            <Clock className="size-4" /> <span>{`${recipe.time.amount} ${recipe.time.unit}`}</span>
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
};
