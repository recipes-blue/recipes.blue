import { View } from 'react-native';
import { useRecipesQuery } from '@lib/queries/recipe';
import { QueryPlaceholder } from '@lib/components/query-placeholder';
import { RecipeCard } from '@lib/screens/Recipes/RecipeCard';

const Page = () => {
  const recipes = useRecipesQuery();

  return (
    <View style={{ padding: 32 }}>
      <QueryPlaceholder query={recipes}>
        {({ data }) => data.recipes.map((recipe, i) => (
          <RecipeCard recipe={recipe} key={i} />
        ))}
      </QueryPlaceholder>
    </View>
  );
};

export default Page;
