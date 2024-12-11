import { colors } from "@lib/chif/tokens";
import { StyleSheet, Text, View } from "react-native";

type ErrorAlertProps = {
  message: string;
};

export const ErrorAlert = ({ message }: ErrorAlertProps) => {
  return (
    <View style={ErrorStyles.alert}>
      <View style={ErrorStyles.wrapper}>
        <Text style={[ErrorStyles.title, ErrorStyles.text]}>Something went wrong.</Text>
        <Text style={ErrorStyles.text}>{message}</Text>
      </View>
    </View>
  );
};

const ErrorStyles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    fontSize: 14,
  },
  alert: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.light.destructive,
  },
  icon: {
    width: 24,
    height: 24,
    color: colors.light.destructive,
  },
  textWrap: {
    paddingTop: 3,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  text: {
    color: colors.light.destructive,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  }
});
