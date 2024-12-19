import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BlueRecipesFeedGetRecipes } from "@atcute/client/lexicons";
import { Link } from "@tanstack/react-router";
import { Clock, CookingPot, ListIcon } from "lucide-react";

type RecipeCardProps = {
  recipe: BlueRecipesFeedGetRecipes.Result;
};

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <Link to="/recipes/$author/$rkey" params={{ author: recipe.author.handle, rkey: recipe.rkey }} className="w-full">
      <Card className="w-full">
        <CardHeader>
          <CardDescription className="flex items-center space-x-2">
            <Avatar className="h-6 w-6 rounded-lg">
              <AvatarImage src={recipe.author.avatarUrl} alt={recipe.author.displayName} />
              <AvatarFallback className="rounded-lg">{recipe.author.displayName}</AvatarFallback>
            </Avatar>

            <span>{recipe.author.displayName}</span>
          </CardDescription>
          <CardTitle>{recipe.title}</CardTitle>
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
            <Clock className="size-4" /> <span>{recipe.time} mins</span>
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
};
