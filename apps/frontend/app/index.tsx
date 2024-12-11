import { SafeAreaView } from 'react-native';
import { useRecipesQuery } from '@lib/queries/recipe';
import { QueryPlaceholder } from '@lib/components/query-placeholder';
import { RecipeCard } from '@lib/screens/Recipes/RecipeCard';

const Page = () => {
  const recipes = useRecipesQuery();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <QueryPlaceholder query={recipes}>
        {({ data }) => data.recipes.map((recipe, i) => (
          <RecipeCard recipe={recipe} key={i} />
        ))}
      </QueryPlaceholder>
    </SafeAreaView>
  );
};

export default Page;
