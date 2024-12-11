import { View } from "react-native";
import { atoms as a } from '@lib/chif';
import { PropsWithChildren } from "react";

export const Shell = ({ children }: PropsWithChildren) => {
  return (
    <View style={[a.util_screen_outer]}>
      {children}
    </View>
  );
};
