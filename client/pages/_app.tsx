import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import "../styles/global.css";

// Apollo client
import { client } from "../lib/client";

// Context
import { AuthProvider } from "../store/AuthContext";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
