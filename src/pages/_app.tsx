import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ApolloClientWrapper from "./apolloclient";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloClientWrapper>
      <Component {...pageProps} />
    </ApolloClientWrapper>
  );
}
