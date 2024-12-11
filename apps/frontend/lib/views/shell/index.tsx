import { StyleSheet, View } from "react-native";
import { atoms as a } from '@lib/chif';
import { PropsWithChildren } from "react";

export const Shell = ({ children }: PropsWithChildren) => {
  return (
    <View testID="mobileShellView" style={[styles.bgLight, a.h_full]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  bgLight: {
    backgroundColor: 'hsl(240 4.8% 95.9%)',
  },
  bgDark: {
    backgroundColor: 'hsl(240 10% 3.9%)',
  },
});
