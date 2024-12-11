import { UseQueryResult } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Text } from "react-native";
import { ErrorAlert } from "./error";
import { XRPCError } from "@atcute/client";

type QueryPlaceholderProps<TD, TE> = {
  query: UseQueryResult<TD, TE>;
  children: (props: { data: TD }) => ReactNode | undefined;
};

export const QueryPlaceholder = <TD, TE>(
  {
    query,
    children,
  }: QueryPlaceholderProps<TD, TE>
) => {
  if (query.error) {
    let message = 'An error occurred. Try again later.';
    if (query.error instanceof XRPCError) {
      message = `${query.error.name}: ${query.error.description ?? 'Something went wrong.'}`;
    } else if (query.error instanceof Error) {
      message = `${query.error.name}: ${query.error.message}`;
    }

    return <ErrorAlert message={message} />;
  }

  if (query.isFetching) {
    return (<Text>Loading...</Text>);
  }

  if (query.data) {
    return children({ data: query.data });
  }

  return null;
};
