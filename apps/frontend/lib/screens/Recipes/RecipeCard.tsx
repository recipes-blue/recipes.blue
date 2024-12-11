import { MoeHaydenCookwareGetRecipes } from "@atcute/client/lexicons";
import { StyleSheet, Text, View } from "react-native";

export const RecipeCard = ({ recipe }: { recipe: MoeHaydenCookwareGetRecipes.Output['recipes'][0]; }) => {
  return (
    <View style={style.card}>
      <Text style={style.title}>{recipe.title}</Text>
      <Text style={style.description}>{recipe.description}</Text>
      <Text style={style.light}>{recipe.steps} steps</Text>
      <Text style={style.light}>{recipe.ingredients} ingredients</Text>
      <Text style={style.light}>By @{recipe.author}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    shadowColor: 'black',
    shadowRadius: 3,
    display: 'flex',
    gap: 4,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  description: {
    fontSize: 14,
    lineHeight: 18,
  },

  light: {
    color: 'hsl(0, 0%, 50%)',
  },
});
