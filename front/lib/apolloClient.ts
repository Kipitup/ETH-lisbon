import { useMemo } from 'react'
import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client'
import type { NormalizedCacheObject } from '@apollo/client'

let apolloClient: ApolloClient<NormalizedCacheObject>;

const theGraphLink = new HttpLink({
  uri: "https://api.studio.thegraph.com/query/39927/nft-lending-aggregator/v.0.0.3"
})

const hasuraLink = new HttpLink({
  uri: ""
})

export function createApollo() {
  // If we're in the browser, reuse existing apollo client
  if (typeof window !== 'undefined' && apolloClient) {
    console.log("resuing apollo")
    return apolloClient
  }

  const link = split(
    (operation) => operation.getContext().clientName === "thegraph", // Routes the query to the proper client. If true, first one. If false, second one.
    theGraphLink,
    hasuraLink
  )

  apolloClient = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    ssrMode: typeof window === 'undefined',
    connectToDevTools: (process.env.NODE_ENV !== 'production') ? true : false
  });

  return apolloClient
}

export function initApollo() {
  const client = useMemo(() => createApollo(), [])

  return client
}