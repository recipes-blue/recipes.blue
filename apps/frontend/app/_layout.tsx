import { Slot } from "expo-router";
import { QueryProvider } from "../lib/react-query";
import { Shell } from "../lib/views/shell";
import { XrpcProvider } from "@lib/xrpc";
import "../global.css";

export default function Layout() {
  return (
    <QueryProvider>
      <XrpcProvider>
        <Shell>
          <Slot />
        </Shell>
      </XrpcProvider>
    </QueryProvider>
  );
};
