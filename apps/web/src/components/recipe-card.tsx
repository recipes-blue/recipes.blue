import { BlueRecipesFeedGetRecipes } from "@atcute/client/lexicons";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "@tanstack/react-router";
import { Clock, ListOrdered, Utensils } from "lucide-react";

type RecipeCardProps = {
  recipe: BlueRecipesFeedGetRecipes.Result;
};

function truncateDescription(description: string, maxLength: number = 120) {
  if (description.length <= maxLength) return description;
  return description.slice(0, maxLength).trim() + '...';
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <Link to="/recipes/$author/$rkey" params={{ author: recipe.author.handle, rkey: recipe.rkey }} className="w-full">
      <Card className="overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <img
              src={"https://www.foodandwine.com/thmb/fjNakOY7IcuvZac1hR3JcSo7vzI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/FAW-recipes-pasta-sausage-basil-and-mustard-hero-06-cfd1c0a2989e474ea7e574a38182bbee.jpg"}
              alt={recipe.title}
              className="h-full w-full object-cover"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-2">{recipe.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {truncateDescription(recipe.description || '')}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={recipe.author.avatarUrl} alt={recipe.author.displayName} />
                <AvatarFallback className="rounded-lg">{recipe.author.displayName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">{recipe.author.displayName}</span>
            </div>
            <div className="flex gap-6 justify-between items-center text-sm text-muted-foreground">
              <div className="flex items-center">
                <Utensils className="w-4 h-4 mr-1" />
                <span>{recipe.ingredients}</span>
              </div>

              <div className="flex items-center">
                <ListOrdered className="w-4 h-4 mr-1" />
                <span>{recipe.steps}</span>
              </div>

              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{recipe.time} min</span>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
