import { Slot } from "expo-router";
import { QueryProvider } from "../lib/react-query";
import { Shell } from "../lib/views/shell";

export default function Layout() {
  return (
    <QueryProvider>
      <Shell>
        <Slot />
      </Shell>
    </QueryProvider>
  );
};
