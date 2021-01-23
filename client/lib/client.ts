import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
} from "@apollo/client";

// Utils
import { pagination } from "../utils/fetch-policies";

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          followingPosts: {
            keyArgs: [],
            merge: pagination,
          },
          userPosts: {
            keyArgs: ["username"],
            merge: pagination,
          },
        },
      },
    },
  }),
  uri: process.env.REACT_APP_API_URL || "http://localhost:4000/graphql",
  credentials: "include",
});
