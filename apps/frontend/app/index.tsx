import { Text, View } from 'react-native';
import { useRecipesQuery } from '../lib/queries/recipe';

const Page = () => {
  const recipes = useRecipesQuery();

  if (!recipes.data) return <Text>Loading...</Text>;

  return (
    <View>
      <Text>{JSON.stringify(recipes.data)}</Text>
    </View>
  );
};

export default Page;
