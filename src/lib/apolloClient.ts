import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";

const MAGENTO_URL =
  process.env.NEXT_PUBLIC_MAGENTO_URL ||
  "https://main-bvxea6i-cpvklyexosup2.fr-4.platformsh.site/graphql";

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

// Auth link
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer uzgavcc6375cjqw2i8y1z3lha63kkflu`,
    },
  };
});

const httpLink = createHttpLink({
  uri: MAGENTO_URL,
});

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
      errorPolicy: "all",
    },
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
  },
});

export default client;
