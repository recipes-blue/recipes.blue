import { View } from "react-native";
import { atoms as a } from '@lib/chif';
import { PropsWithChildren } from "react";

export const Shell = ({ children }: PropsWithChildren) => {
  return (
    <View testID="mobileShellView" style={[a.h_full]}>
      {children}
    </View>
  );
};
