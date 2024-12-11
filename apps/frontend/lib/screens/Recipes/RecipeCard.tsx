import { MoeHaydenCookwareGetRecipes } from "@atcute/client/lexicons";
import { atoms } from "@lib/chif";
import { Theme, useTheme } from "@lib/theme";
import { Link } from "expo-router";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

export const RecipeCard = ({ recipe }: { recipe: MoeHaydenCookwareGetRecipes.Output['recipes'][0]; }) => {
  const theme = useTheme();
  const style = genStyle(theme);

  return (
    <Link href={`/profiles/${recipe.author}/${recipe.rkey}`} style={style.parent}>
      <ImageBackground
        resizeMode="cover"
        style={style.image}
        source={{
          uri: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505'
        }}
      >
        <View style={[style.card, atoms.w_full]}>
          <Text style={[style.text, style.light]}>By @{recipe.author}</Text>
          <Text style={[style.title]}>{recipe.title}</Text>
          <Text style={[style.text, style.light]}>{recipe.steps} steps</Text>
          <Text style={[style.text, style.light]}>{recipe.ingredients} ingredients</Text>
        </View>
      </ImageBackground>
    </Link>
  );
};

const genStyle = (theme: Theme) => StyleSheet.create({
  parent: {
    padding: 8,
    borderRadius: 12,
  },

  image: {
    width: '100%',
  },

  card: {
    height: 120,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderRadius: atoms.rounded_md.borderRadius,
    display: 'flex',
    gap: 4,
    color: theme.palette.default.text,
  },

  text: {
    color: theme.palette.default.text,
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
