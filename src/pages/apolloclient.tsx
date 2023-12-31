import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { useMemo } from "react";

const ApolloClientWrapper: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  console.log("Hii iam apollo client");
  const client = useMemo(
    () =>
      new ApolloClient({
        uri: "http://localhost:3000/graphql",
        cache: new InMemoryCache(),
      }),
    []
  );
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export default ApolloClientWrapper;
